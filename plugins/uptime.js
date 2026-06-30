const { reply, getUptime } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Uptime",
  commands: {
    uptime: async ({ sock, from }) => {
      await reply(sock, from, `⏱️ *${cfg.botName} Uptime*\n\n🟢 ${getUptime()} se online hai!`);
    },
  },
};
