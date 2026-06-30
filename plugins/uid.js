const { reply } = require("../lib/helper");
module.exports = {
  name: "UID",
  commands: {
    uid: async ({ sock, from, sender, pushName, isGroup }) => {
      await reply(sock, from,
        `🪪 *Your Info*\n\nNaam: ${pushName}\nJID: ${sender}\nNumber: ${sender.split("@")[0]}\nGroup: ${isGroup?"Yes":"No"}`);
    },
    user: async ({ sock, from, sender, pushName }) => {
      await reply(sock, from, `👤 *User Info*\n\nNaam: ${pushName}\nNumber: ${sender.split("@")[0]}\nJID: ${sender}`);
    },
  },
};
