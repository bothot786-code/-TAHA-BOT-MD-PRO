const { reply } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Translate",
  commands: {
    translate: async ({ sock, from, args }) => {
      if (args.length < 2) return reply(sock, from, `❌ Use: ${cfg.PREFIX}translate [lang] [text]\nMisal: ${cfg.PREFIX}translate en Salam kya hal hai`);
      const lang = args[0];
      const text = args.slice(1).join(" ");
      await reply(sock, from, `🌐 *Translation*\n\nOriginal: ${text}\nLanguage: ${lang}\n\n_Translation feature ke liye translate-google package install karo._`);
    },
  },
};
