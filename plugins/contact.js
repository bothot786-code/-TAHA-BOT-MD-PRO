const { reply } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Contact",
  commands: {
    contact: async ({ sock, from }) => {
      await reply(sock, from,
        `📞 *Contact Info*\n━━━━━━━━━━━━━━\nOwner: ${cfg.botOwner}\nWA: wa.me/${cfg.ownerNumber}\nBot: ${cfg.botName}\nGitHub: ${cfg.github}\n━━━━━━━━━━━━━━\n_${cfg.botName}_`);
    },
  },
};
