const { reply } = require("../lib/helper");
const answers = ["✅ Bilkul!","✅ Haan, zaroor!","🤔 Shayad...","❌ Nahi lagta","❌ Bilkul nahi!","🎱 Yaqeen se keh nahi sakta","✨ Beshak!","⚡ Bad mein poochho","🌟 Haan!","❓ Mushkil sawaal hai"];
const cfg = require("../config.json");
module.exports = {
  name: "8Ball",
  commands: {
    "8ball": async ({ sock, from, args }) => {
      if (!args.length) return reply(sock, from, `❌ Sawaal likho!\nMisal: ${cfg.PREFIX}8ball Kya mujhe job milegi?`);
      await reply(sock, from, `🎱 *Magic 8 Ball*\n\n❓ ${args.join(" ")}\n\n${answers[Math.floor(Math.random()*answers.length)]}`);
    },
  },
};
