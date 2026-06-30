const { replyImg } = require("../lib/helper");
const cfg = require("../config.json");

module.exports = {
  name: "Help",
  commands: {
    help: async ({ sock, from }) => {
      const p = cfg.PREFIX;
      const text =
        `╔══════════════════════════╗\n` +
        `║  🤖 *${cfg.botName}*  ║\n` +
        `╚══════════════════════════╝\n\n` +
        `👑 Owner: *${cfg.botOwner}*\n` +
        `📌 Prefix: *${p}*  |  Ver: *${cfg.version}*\n\n` +
        `📋 *INFO COMMANDS*\n` +
        `${p}help ${p}menu ${p}info ${p}ping\n${p}uptime ${p}owner ${p}uid ${p}user\n\n` +
        `🤖 *AI COMMANDS*\n` +
        `${p}ai ${p}ask ${p}gpt ${p}gemini\n${p}imagine ${p}translate ${p}tts\n\n` +
        `😄 *FUN COMMANDS*\n` +
        `${p}joke ${p}fact ${p}dare ${p}truth\n${p}8ball ${p}compliment ${p}insult\n${p}trivia ${p}random ${p}meme\n\n` +
        `👥 *GROUP COMMANDS*\n` +
        `${p}tagall ${p}kick ${p}promote ${p}demote\n${p}mute ${p}unmute ${p}lock ${p}unlock\n` +
        `${p}warn ${p}grp ${p}grouprules ${p}topmembers\n${p}antilink ${p}approve ${p}out\n\n` +
        `🔧 *UTILITY*\n` +
        `${p}weather ${p}getlink ${p}contact\n${p}viewonce ${p}delete ${p}autoreact\n\n` +
        `👑 *OWNER ONLY*\n` +
        `${p}broadcast ${p}restart ${p}prefix\n${p}eval ${p}shell\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_Made by ${cfg.botOwner}_ 🚀\n` +
        `_${cfg.github}_`;
      await replyImg(sock, from, text, cfg.helpPic);
    },
    menu: async ({ sock, from }) => {
      const p = cfg.PREFIX;
      const text =
        `🤖 *${cfg.botName} — Full Menu*\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `Prefix: *${p}* | Version: *${cfg.version}*\n\n` +
        `Total Commands: *40+*\n\n` +
        `${p}help — Detailed menu\n\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `_${cfg.botName} by ${cfg.botOwner}_ 🚀`;
      await replyImg(sock, from, text, cfg.helpPic);
    },
  },
};
