const { reply } = require("../lib/helper");
module.exports = {
  name: "Random",
  commands: {
    random: async ({ sock, from, args }) => {
      const max = parseInt(args[0]) || 100;
      await reply(sock, from, `🎲 *Random Number (1-${max})*\n\n🔢 *${Math.floor(Math.random()*max)+1}*`);
    },
    flip: async ({ sock, from }) => {
      await reply(sock, from, `🪙 *Coin Flip!*\n\nNatija: *${Math.random()<0.5?"HEADS 🪙":"TAILS 🪙"}*`);
    },
    dice: async ({ sock, from }) => {
      const n = Math.floor(Math.random()*6)+1;
      await reply(sock, from, `🎲 *Dice Roll!*\n\n${"⚀⚁⚂⚃⚄⚅"[n-1]} — *${n}*`);
    },
  },
};
