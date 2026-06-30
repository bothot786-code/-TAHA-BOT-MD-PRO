async function onDemote(sock, groupJid, userJid) {
  try {
    await sock.sendMessage(groupJid, {
      text: `⬇️ @${userJid.split("@")[0]} ki Admin rights le li gayi!`,
      mentions: [userJid],
    });
  } catch {}
}
module.exports = { onDemote };
