const { reply, isAdmin } = require("../lib/helper");
const cfg = require("../config.json");

module.exports = {
  name: "Admin",
  commands: {
    kick: async ({ sock, from, msg, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned?.length) return reply(sock, from, `❌ Kisi ko mention karo!\nMisal: ${cfg.PREFIX}kick @user`);
      await sock.groupParticipantsUpdate(from, mentioned, "remove");
      await reply(sock, from, `✅ ${mentioned.length} member(s) ko group se nikala gaya!`);
    },
    promote: async ({ sock, from, msg, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned?.length) return reply(sock, from, `❌ Kisi ko mention karo!`);
      await sock.groupParticipantsUpdate(from, mentioned, "promote");
      await reply(sock, from, "✅ Admin ban gaya!");
    },
    demote: async ({ sock, from, msg, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
      if (!mentioned?.length) return reply(sock, from, `❌ Kisi ko mention karo!`);
      await sock.groupParticipantsUpdate(from, mentioned, "demote");
      await reply(sock, from, "✅ Admin se hata diya gaya!");
    },
    mute: async ({ sock, from, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      await sock.groupSettingUpdate(from, "announcement");
      await reply(sock, from, "🔇 Group mute ho gaya! Sirf admins message kar sakte hain.");
    },
    unmute: async ({ sock, from, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      await sock.groupSettingUpdate(from, "not_announcement");
      await reply(sock, from, "🔊 Group unmute ho gaya! Sab message kar sakte hain.");
    },
    lock: async ({ sock, from, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      await sock.groupSettingUpdate(from, "locked");
      await reply(sock, from, "🔒 Group locked! Sirf admins settings change kar sakte hain.");
    },
    unlock: async ({ sock, from, sender, isGroup }) => {
      if (!isGroup) return reply(sock, from, "❌ Sirf group mein!");
      if (!await isAdmin(sock, from, sender)) return reply(sock, from, "❌ Sirf admin!");
      await sock.groupSettingUpdate(from, "unlocked");
      await reply(sock, from, "🔓 Group unlocked!");
    },
  },
};
