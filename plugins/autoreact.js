const { reply } = require("../lib/helper");
const reacts = ["❤️","😂","👍","🔥","✨","💯","🎉","😎"];
const autoReactGroups = new Set();
module.exports = {
  name: "Autoreact",
  commands: {
    autoreact: async ({ sock, from, args, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (args[0]==="on") { autoReactGroups.add(from); await reply(sock, from, "✅ Auto React ON!"); }
      else { autoReactGroups.delete(from); await reply(sock, from, "❌ Auto React OFF!"); }
    },
  },
};
