const { reply } = require("../lib/helper");
module.exports = {
  name: "Antispam",
  commands: {
    antispam: async ({ sock, from, args, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      await reply(sock, from, args[0]==="on" ? "✅ Antispam ON! Spam karne walo ko warn milega." : "❌ Antispam OFF!");
    },
  },
};
