const cfg = require("../config.json");

async function onJoin(sock, groupJid, userJid, meta) {
  try {
    const num = userJid.split("@")[0];
    const text =
      `🎉 *Welcome to ${meta.subject}!*\n\n` +
      `👋 @${num} aapka swagat hai!\n\n` +
      `📋 *Group Rules:*\n` +
      `• Sab ka ehtram karo\n` +
      `• Spam mat karo\n` +
      `• Admin ki baat mano\n\n` +
      `🤖 Bot: ${cfg.botName}\n` +
      `_${cfg.PREFIX}help — commands dekhne ke liye_`;
    await sock.sendMessage(groupJid, {
      image: { url: cfg.welPic },
      caption: text,
      mentions: [userJid],
    });
  } catch(e) {
    try {
      await sock.sendMessage(groupJid, {
        text: `🎉 Welcome! @${userJid.split("@")[0]}`,
        mentions: [userJid],
      });
    } catch {}
  }
}

module.exports = { onJoin };
