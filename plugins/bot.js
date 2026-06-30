const { reply, replyImg } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Bot",
  commands: {
    bot: async ({ sock, from }) => {
      await replyImg(sock, from,
        `🤖 *${cfg.botName}*\n━━━━━━━━━━━━━━\n👑 Owner: ${cfg.botOwner}\n📌 Prefix: ${cfg.PREFIX}\n📌 Version: ${cfg.version}\n🔗 ${cfg.github}\n━━━━━━━━━━━━━━\n_Made by ${cfg.botOwner}_ 🚀`,
        cfg.helpPic);
    },
    imagine: async ({ sock, from, args }) => {
      if (!args.length) return reply(sock, from, `❌ Description likho!\nMisal: ${cfg.PREFIX}imagine beautiful sunset`);
      await reply(sock, from, `🎨 Image generate ho rahi hai...\n\n_"${args.join(" ")}"_\n\n_OpenAI DALL-E key chahiye. OPENAI_API_KEY .env mein lagao._`);
    },
  },
};
