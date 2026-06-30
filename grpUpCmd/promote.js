async function onPromote(sock, groupJid, userJid) {
  try {
    await sock.sendMessage(groupJid, {
      text: `⬆️ @${userJid.split("@")[0]} ko Admin bana diya gaya! 👑`,
      mentions: [userJid],
    });
  } catch {}
}
module.exports = { onPromote };
