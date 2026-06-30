const { reply, isAdmin } = require("../lib/helper");
const cfg = require("../config.json");
const warns = {};
module.exports = {
  name: "Warn",
  commands: {
    warn: async ({ sock, from, msg, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned?.length) return reply(sock, from, `❌ Kisi ko mention karo!`);
      const target = mentioned[0];
      warns[target] = (warns[target]||0) + 1;
      await sock.sendMessage(from, { text:`⚠️ *Warning!*\n\n@${target.split("@")[0]} ko warn kiya gaya!\nTotal warns: ${warns[target]}/3\n\n${warns[target]>=3?"❌ 3 warns! Kick kar diya jaaye ga!":""}`, mentions:[target] });
      if (warns[target]>=3) {
        await sock.groupParticipantsUpdate(from,[target],"remove");
        delete warns[target];
      }
    },
  },
};
