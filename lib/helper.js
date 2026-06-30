const cfg = require("../config.json");

async function reply(sock, jid, text) {
  await sock.sendMessage(jid, { text });
}

async function replyImg(sock, jid, text, url) {
  try {
    await sock.sendMessage(jid, { image: { url: url || cfg.helpPic }, caption: text });
  } catch { await reply(sock, jid, text); }
}

async function isAdmin(sock, groupJid, jid) {
  try {
    const meta = await sock.groupMetadata(groupJid);
    return meta.participants.some(p => p.jid === jid && (p.admin === "admin" || p.admin === "superadmin"));
  } catch { return false; }
}

function isOwner(senderJid) {
  const num = senderJid.replace("@s.whatsapp.net","").replace(/\D/g,"");
  return cfg.admin?.some(a => a.replace(/\D/g,"") === num);
}

function getTime() {
  return new Date().toLocaleString("ur-PK", { timeZone: cfg.timeZone });
}

function getUptime() {
  const s = Math.floor(process.uptime());
  return `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m ${s%60}s`;
}

module.exports = { reply, replyImg, isAdmin, isOwner, getTime, getUptime };
