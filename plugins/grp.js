const { reply, isAdmin } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Group",
  commands: {
    grp: async ({ sock, from, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      const meta = await sock.groupMetadata(from);
      const admins = meta.participants.filter(p=>p.admin).length;
      await reply(sock, from,
        `📋 *Group Info*\n━━━━━━━━━━━━━━\nNaam: ${meta.subject}\nMembers: ${meta.participants.length}\nAdmins: ${admins}\nCreate: ${new Date(meta.creation*1000).toLocaleDateString("ur-PK")}\nDesc: ${meta.desc||"Nahi hai"}`);
    },
    grouprules: async ({ sock, from, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      await reply(sock, from,
        `📜 *Group Rules*\n━━━━━━━━━━━━━━\n1. Sab ka ehtram karo\n2. Spam mat karo\n3. Inappropriate content nahi\n4. Admin ki baat mano\n5. ${cfg.botName} ki respect karo\n━━━━━━━━━━━━━━\n_${cfg.botName}_`);
    },
    topmembers: async ({ sock, from, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      const meta = await sock.groupMetadata(from);
      const admins = meta.participants.filter(p=>p.admin).map(p=>`👑 @${p.id.split("@")[0]}`).join("\n");
      await sock.sendMessage(from, { text:`🏆 *Top Members (Admins)*\n\n${admins||"Koi admin nahi"}`, mentions:meta.participants.filter(p=>p.admin).map(p=>p.id) });
    },
    out: async ({ sock, from, isGroup, isOwner }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!isOwner) return reply(sock, from, "❌ Sirf owner yeh kar sakta hai!");
      await reply(sock, from, "👋 Bot group se nikal raha hai...");
      await sock.groupLeave(from);
    },
  },
};
