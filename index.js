require("dotenv").config();
const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const pino = require("pino");
const express = require("express");
const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const cron = require("node-cron");
const QRCode = require("qrcode");
const cfg = require("./config.json");

const PORT = process.env.PORT || cfg.PORT || 3000;
const SESSION_DIR = "./session";
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let globalSock = null;
let currentQR = null;
let isConnected = false;

// ── Web Routes ──────────────────────────────────────
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.get("/pair", async (req, res) => {
  const phone = (req.query.phone || "").replace(/\D/g, "");
  if (!phone) return res.json({ error: "Phone number required" });
  if (!globalSock) return res.json({ error: "Bot abhi ready nahi — 30 second wait karo" });
  try {
    const code = await globalSock.requestPairingCode(phone);
    res.json({ code, phone });
  } catch (err) { res.json({ error: err.message }); }
});

app.get("/qr", async (req, res) => {
  if (!currentQR) return res.json({ error: "QR available nahi. Bot connected ho sakta hai ya abhi start ho raha hai." });
  try {
    const dataUrl = await QRCode.toDataURL(currentQR, { width: 300, margin: 2, color: { dark: "#000", light: "#fff" } });
    res.json({ qr: dataUrl });
  } catch (e) { res.json({ error: e.message }); }
});

app.get("/status", (req, res) => {
  res.json({ status: isConnected ? "connected" : "disconnected", bot: cfg.botName, owner: cfg.botOwner, version: cfg.version, uptime: Math.floor(process.uptime()) + "s" });
});

app.listen(PORT, () => {
  console.log(chalk.green(`\n🌐 Pairing Panel: http://localhost:${PORT}\n`));
});

// ── Banner ──────────────────────────────────────────
function printBanner() {
  console.clear();
  try { console.log(chalk.green(figlet.textSync("TAHA KHAN", { font: "Big" }))); } catch {}
  console.log(chalk.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(chalk.cyan(`  🤖  ${cfg.botName}`));
  console.log(chalk.cyan(`  👑  Owner : ${cfg.botOwner}`));
  console.log(chalk.cyan(`  📱  Number: ${cfg.ownerNumber}`));
  console.log(chalk.cyan(`  🔖  Version: ${cfg.version}`));
  console.log(chalk.yellow("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n"));
}

// ── Plugin Loader ────────────────────────────────────
const commands = {};
function loadPlugins() {
  const dir = path.join(__dirname, "plugins");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));
  console.log(chalk.cyan("📦 Loading plugins..."));
  for (const file of files) {
    try {
      delete require.cache[require.resolve(path.join(dir, file))];
      const plugin = require(path.join(dir, file));
      if (plugin.commands) Object.assign(commands, plugin.commands);
      if (plugin.name) console.log(chalk.green(`  ✅ ${plugin.name}`));
    } catch (e) { console.log(chalk.red(`  ❌ ${file}: ${e.message}`)); }
  }
  console.log(chalk.blue(`\n🎯 ${Object.keys(commands).length} commands ready!\n`));
}

// ── Message Handler ──────────────────────────────────
async function handleMsg(sock, msg) {
  try {
    if (!msg.message || msg.key.fromMe) return;
    const from = msg.key.remoteJid;
    const isGroup = from.endsWith("@g.us");
    const sender = isGroup ? (msg.key.participant || from) : from;
    const pushName = msg.pushName || sender.split("@")[0];
    const body = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || "";
    if (!body) return;

    const senderNum = sender.replace("@s.whatsapp.net", "").replace("@g.us", "");
    const isOwner = cfg.admin?.some(a => a.replace(/\D/g,"") === senderNum.replace(/\D/g,""));
    console.log(chalk.gray(`[${pushName}] ${body}`));

    if (!body.startsWith(cfg.PREFIX)) return;
    const args = body.slice(cfg.PREFIX.length).trim().split(/\s+/);
    const cmd = args.shift().toLowerCase();
    const ctx = { sock, from, args, msg, sender, pushName, isOwner, isGroup, PREFIX: cfg.PREFIX, cfg };

    if (commands[cmd]) {
      await commands[cmd](ctx);
    } else {
      await sock.sendMessage(from, { text: `❌ *"${cfg.PREFIX}${cmd}"* command nahi mila.\n\n${cfg.PREFIX}help — commands dekhne ke liye` });
    }
  } catch (e) { console.error("Handler:", e.message); }
}

// ── Bot Start ────────────────────────────────────────
async function startBot() {
  printBanner();
  loadPlugins();
  if (!fs.existsSync(SESSION_DIR)) fs.mkdirSync(SESSION_DIR, { recursive: true });

  const { state, saveCreds } = await useMultiFileAuthState(SESSION_DIR);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version, logger: pino({ level: "silent" }),
    auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })) },
    printQRInTerminal: false,
    browser: [cfg.botName, "Chrome", cfg.version],
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 25000,
  });

  globalSock = sock;
  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async ({ connection, lastDisconnect, qr }) => {
    if (qr) { currentQR = qr; console.log(chalk.yellow(`📱 Pairing panel: http://localhost:${PORT}`)); }
    if (connection === "close") {
      isConnected = false; currentQR = null;
      const code = new Boom(lastDisconnect?.error)?.output?.statusCode;
      if (code !== DisconnectReason.loggedOut) { setTimeout(startBot, 5000); }
      else { console.log(chalk.red("🚪 Logged out!")); process.exit(1); }
    }
    if (connection === "open") {
      isConnected = true; currentQR = null;
      console.log(chalk.green(`✅ ${cfg.botName} Connected!\n`));
      try {
        const jid = (process.env.CHANNEL_JID || cfg.channelJid);
        if (jid) await sock.sendMessage(jid, { text: `🟢 *${cfg.botName} Online!*\n✅ Connected!\n⏰ ${new Date().toLocaleString("ur-PK")}\n_${cfg.botOwner}_ 🚀` });
      } catch {}
      scheduleTasks(sock);
    }
  });

  // Group updates
  sock.ev.on("group-participants.update", async (ev) => {
    try {
      const meta = await sock.groupMetadata(ev.id);
      for (const jid of ev.participants) {
        if (ev.action === "add") {
          const welcomePlugin = require("./grpUpCmd/welcome.js");
          if (welcomePlugin.onJoin) await welcomePlugin.onJoin(sock, ev.id, jid, meta);
        }
        if (ev.action === "remove") {
          const gdbyePlugin = require("./grpUpCmd/gdbye.js");
          if (gdbyePlugin.onLeave) await gdbyePlugin.onLeave(sock, ev.id, jid, meta);
        }
      }
    } catch {}
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    for (const msg of messages) await handleMsg(sock, msg);
  });
}

function scheduleTasks(sock) {
  cron.schedule("0 9 * * *", async () => {
    try {
      const jid = process.env.CHANNEL_JID || cfg.channelJid;
      if (jid) await sock.sendMessage(jid, { text: `☀️ *Subah Bakhair!*\n${cfg.botName} active hai!\n_${cfg.PREFIX}help — commands_` });
    } catch {}
  }, { timezone: cfg.timeZone });
  cron.schedule("0 21 * * *", async () => {
    try {
      const jid = process.env.CHANNEL_JID || cfg.channelJid;
      if (jid) await sock.sendMessage(jid, { text: `🌙 *Shab Bakhair!*\n${cfg.botName} raat bhar online hai 🤖` });
    } catch {}
  }, { timezone: cfg.timeZone });
}

startBot().catch(e => { console.error(e); process.exit(1); });
