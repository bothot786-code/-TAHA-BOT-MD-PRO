const { reply } = require("../lib/helper");
module.exports = {
  name: "Restart",
  commands: {
    restart: async ({ sock, from, isOwner }) => {
      if (!isOwner) return reply(sock, from, "❌ Sirf owner yeh kar sakta hai!");
      await reply(sock, from, "🔄 Bot restart ho raha hai...");
      setTimeout(() => process.exit(0), 2000);
    },
  },
};
