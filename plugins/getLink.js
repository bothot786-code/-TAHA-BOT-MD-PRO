const { reply, isAdmin } = require("../lib/helper");
module.exports = {
  name: "GetLink",
  commands: {
    getlink: async ({ sock, from, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      try {
        const code = await sock.groupInviteCode(from);
        await reply(sock, from, `🔗 *Group Invite Link*\n\nhttps://chat.whatsapp.com/${code}`);
      } catch(e) { await reply(sock, from, "❌ Link nahi mila: "+e.message); }
    },
  },
};
