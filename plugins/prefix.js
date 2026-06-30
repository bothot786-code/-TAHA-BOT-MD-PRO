const { reply } = require("../lib/helper");
const cfg = require("../config.json");
const fs = require("fs");
module.exports = {
  name: "Prefix",
  commands: {
    prefix: async ({ sock, from, args, isOwner }) => {
      if (!isOwner) return reply(sock, from, "❌ Sirf owner!");
      if (!args[0]) return reply(sock, from, `Current prefix: *${cfg.PREFIX}*`);
      cfg.PREFIX = args[0];
      fs.writeFileSync("./config.json", JSON.stringify(cfg, null, 2));
      await reply(sock, from, `✅ Prefix change ho gaya: *${cfg.PREFIX}*`);
    },
  },
};
