const { reply } = require("../lib/helper");
const axios = require("axios");
const cfg = require("../config.json");
module.exports = {
  name: "Weather",
  commands: {
    weather: async ({ sock, from, args }) => {
      if (!args.length) return reply(sock, from, `❌ City ka naam likho!\nMisal: ${cfg.PREFIX}weather Karachi`);
      try {
        const city = args.join(" ");
        const res = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=3`);
        await reply(sock, from, `🌤️ *Weather — ${city}*\n\n${res.data}\n\n_TAHA KHAN BOT MD_`);
      } catch(e) { await reply(sock, from, "❌ Weather nahi mila. City ka naam sahi likho."); }
    },
  },
};
