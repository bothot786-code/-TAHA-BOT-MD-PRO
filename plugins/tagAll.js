const { reply, isAdmin } = require("../lib/helper");
module.exports = {
  name: "TagAll",
  commands: {
    tagall: async ({ sock, from, args, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin yeh kar sakta hai!");
      const meta = await sock.groupMetadata(from);
      const text = `📢 *${args.join(" ") || "Attention!"}*\n\n` + meta.participants.map(p=>`@${p.id.split("@")[0]}`).join("\n");
      await sock.sendMessage(from, { text, mentions: meta.participants.map(p=>p.id) });
    },
  },
};
