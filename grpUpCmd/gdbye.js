const cfg = require("../config.json");

async function onLeave(sock, groupJid, userJid, meta) {
  try {
    const num = userJid.split("@")[0];
    await sock.sendMessage(groupJid, {
      text: `👋 *${meta.subject}*\n\n@${num} ne group chhod diya.\nAllah hafiz! 🙏`,
      mentions: [userJid],
    });
  } catch {}
}

module.exports = { onLeave };
