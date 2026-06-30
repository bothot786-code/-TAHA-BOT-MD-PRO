const { reply } = require("../lib/helper");
module.exports = {
  name: "ViewOnce",
  commands: {
    viewonce: async ({ sock, from, msg }) => {
      try {
        const voMsg = msg.message?.viewOnceMessage?.message || msg.message?.viewOnceMessageV2?.message;
        if (!voMsg) return reply(sock, from, "❌ Yeh command view-once message ke reply mein use karo!");
        if (voMsg.imageMessage) {
          await sock.sendMessage(from, { image: voMsg.imageMessage, caption: "👁️ View Once Image\n_TAHA KHAN BOT MD_" });
        } else if (voMsg.videoMessage) {
          await sock.sendMessage(from, { video: voMsg.videoMessage, caption: "👁️ View Once Video\n_TAHA KHAN BOT MD_" });
        } else { await reply(sock, from, "❌ Media nahi mila."); }
      } catch(e) { await reply(sock, from, "❌ View once nahi kiya ja saka."); }
    },
  },
};
