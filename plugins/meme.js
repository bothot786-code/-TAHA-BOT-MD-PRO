const { reply } = require("../lib/helper");
const memes = ["https://i.imgflip.com/4/1bij.jpg","https://i.imgflip.com/4/1bik.jpg","https://i.imgflip.com/4/1bil.jpg"];
module.exports = {
  name: "Meme",
  commands: {
    meme: async ({ sock, from }) => {
      try {
        const url = memes[Math.floor(Math.random()*memes.length)];
        await sock.sendMessage(from, { image:{ url }, caption:"😂 *Random Meme!*\n\n_TAHA KHAN BOT MD_ 🤖" });
      } catch { await reply(sock, from, "😂 Meme load nahi hua!"); }
    },
  },
};
