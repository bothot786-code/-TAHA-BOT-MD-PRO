const { reply, isAdmin } = require("../lib/helper");
module.exports = {
  name: "Approve",
  commands: {
    approve: async ({ sock, from, msg, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned?.length) return reply(sock, from, "❌ Kisi ko mention karo!");
      await sock.sendMessage(from, { text:`✅ @${mentioned[0].split("@")[0]} approved!`, mentions:mentioned });
    },
  },
};
