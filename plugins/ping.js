const { reply } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Ping",
  commands: {
    ping: async ({ sock, from }) => {
      const t = Date.now();
      await reply(sock, from, `🏓 *Pong!*\n⚡ Speed: ${Date.now()-t}ms\n✅ ${cfg.botName} Active!`);
    },
  },
};
