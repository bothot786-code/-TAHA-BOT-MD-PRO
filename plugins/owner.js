const { reply } = require("../lib/helper");
const cfg = require("../config.json");
module.exports = {
  name: "Owner Commands",
  commands: {
    broadcast: async ({ sock, from, args, isOwner }) => {
      if (!isOwner) return reply(sock, from, "❌ Sirf owner!");
      if (!args.length) return reply(sock, from, "❌ Message likho!");
      const text = `📢 *${cfg.botName} Broadcast*\n\n${args.join(" ")}\n\n_${cfg.botOwner}_`;
      try {
        const jid = process.env.CHANNEL_JID || cfg.channelJid;
        if (jid) { await sock.sendMessage(jid, { text }); await reply(sock, from, "✅ Channel pe bheja gaya!"); }
        else await reply(sock, from, "❌ CHANNEL_JID set nahi hai .env mein.");
      } catch(e) { await reply(sock, from, "❌ Broadcast failed: "+e.message); }
    },
    eval: async ({ sock, from, args, isOwner }) => {
      if (!isOwner) return reply(sock, from, "❌ Sirf owner!");
      if (!args.length) return reply(sock, from, "❌ Code likho!");
      try {
        const result = eval(args.join(" "));
        await reply(sock, from, `✅ Result:\n${JSON.stringify(result, null, 2)}`);
      } catch(e) { await reply(sock, from, "❌ Error: "+e.message); }
    },
    shell: async ({ sock, from, args, isOwner }) => {
      if (!isOwner) return reply(sock, from, "❌ Sirf owner!");
      if (!args.length) return reply(sock, from, "❌ Command likho!");
      const { execSync } = require("child_process");
      try {
        const out = execSync(args.join(" "), { encoding:"utf8", timeout:10000 });
        await reply(sock, from, `💻 Shell Output:\n\n${out||"No output"}`);
      } catch(e) { await reply(sock, from, "❌ Error: "+e.message); }
    },
  },
};
