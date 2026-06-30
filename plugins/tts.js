const { reply } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "TTS",
  commands: {
    tts: async ({ sock, from, args }) => {
      if (!args.length) return reply(sock, from, `❌ Text likho!\nMisal: ${cfg.PREFIX}tts Salam dost`);
      await reply(sock, from, `🔊 *Text-to-Speech*\n\nText: ${args.join(" ")}\n\n_TTS feature ke liye gtts package configure karo._`);
    },
    speech: async (ctx) => module.exports.commands.tts(ctx),
  },
};
