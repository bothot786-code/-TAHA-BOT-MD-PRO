const { reply } = require("../lib/helper");
const facts = [
  "🧠 Insaan ka dimagh 10 watts bijli se chalta hai!",
  "🐝 Ek madhumakhi poori zindagi mein sirf 1/12 chammach shehad banati hai.",
  "🌊 Zameen ka 71% hissa paani hai lekin peene laiq sirf 3% hai.",
  "🦈 Sharks dinosaurs se bhi pehle is duniya mein thi!",
  "😴 Neend mein insaan average 3-5 sapne dekhta hai.",
  "🐘 Haathi ek matra janwar hai jo ulang nahi kar sakta.",
  "🌍 Duniya mein har roz 200,000 se zyada log paida hote hain.",
  "🍯 Shehad kabhi kharab nahi hota — 3000 saal purana bhi kha sakte ho!",
];
module.exports = {
  name: "Fact",
  commands: {
    fact: async ({ sock, from }) => {
      await reply(sock, from, `🔍 *Interesting Fact*\n\n${facts[Math.floor(Math.random()*facts.length)]}`);
    },
  },
};
