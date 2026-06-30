const { reply, isAdmin } = require("../lib/helper");
module.exports = {
  name: "Delete",
  commands: {
    delete: async ({ sock, from, msg, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      if (!quoted) return reply(sock, from, "❌ Jis message ko delete karna hai usse quote karo!");
      try {
        const quotedKey = { remoteJid:from, id:msg.message.extendedTextMessage.contextInfo.stanzaId, participant:msg.message.extendedTextMessage.contextInfo.participant };
        await sock.sendMessage(from, { delete: quotedKey });
        await reply(sock, from, "✅ Message delete ho gaya!");
      } catch(e) { await reply(sock, from, "❌ Delete nahi hua."); }
    },
  },
};
