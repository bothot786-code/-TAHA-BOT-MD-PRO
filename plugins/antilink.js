const { isAdmin } = require("../lib/helper");
const antilinkGroups = new Set();
module.exports = {
  name: "Antilink",
  commands: {
    antilink: async ({ sock, from, args, sender, isGroup }) => {
      if (!isGroup) return;
      if (!await isAdmin(sock, from, sender)) return sock.sendMessage(from,{text:"❌ Sirf admin!"});
      if (args[0]==="on") { antilinkGroups.add(from); await sock.sendMessage(from,{text:"✅ Antilink ON! Links bhejne walo ko remove kiya jaayega."}); }
      else if (args[0]==="off") { antilinkGroups.delete(from); await sock.sendMessage(from,{text:"❌ Antilink OFF!"}); }
      else await sock.sendMessage(from,{text:"Use: .antilink on/off"});
    },
  },
};
