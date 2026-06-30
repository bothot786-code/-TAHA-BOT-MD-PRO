const { reply, replyImg, getUptime } = require("../lib/helper");
const cfg = require("../config.json");
const os = require("os");

module.exports = {
  name: "Info",
  commands: {
    info: async ({ sock, from }) => {
      const text =
        `ℹ️ *${cfg.botName} — Bot Info*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `👑 Owner: ${cfg.botOwner}\n` +
        `📱 Number: ${cfg.ownerNumber}\n` +
        `🤖 Bot: ${cfg.botName}\n` +
        `📌 Prefix: ${cfg.PREFIX}\n` +
        `📚 Library: @whiskeysockets/baileys\n` +
        `🧠 AI: OpenAI + Gemini\n` +
        `⚙️ Node: ${process.version}\n` +
        `🖥️ OS: ${os.platform()} ${os.arch()}\n` +
        `💾 RAM: ${Math.round(process.memoryUsage().heapUsed/1024/1024)}MB\n` +
        `⏱️ Uptime: ${getUptime()}\n` +
        `📌 Version: ${cfg.version}\n` +
        `🔗 GitHub: ${cfg.github}\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Made by ${cfg.botOwner}_ 🚀`;
      await replyImg(sock, from, text, cfg.helpPic);
    },
    owner: async ({ sock, from }) => {
      await replyImg(sock, from,
        `👑 *Bot Owner*\n━━━━━━━━━━━━━━━━━━━━\nNaam: ${cfg.botOwner}\n📱 wa.me/${cfg.ownerNumber}\n🤖 ${cfg.botName}\n🔗 ${cfg.github}\n━━━━━━━━━━━━━━━━━━━━\n_${cfg.botName}_ 🚀`,
        cfg.helpPic);
    },
  },
};
