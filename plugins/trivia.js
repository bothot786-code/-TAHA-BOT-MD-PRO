const { reply } = require("../lib/helper");
const questions = [
  { q:"Pakistan ki capital kya hai?", a:"Islamabad" },
  { q:"Duniya ka sabse bada mulk kaun sa hai?", a:"Russia" },
  { q:"1+1 kitna hota hai?", a:"2" },
  { q:"Surya ka rang kya hai?", a:"Peela/Safed" },
  { q:"Quran mein kitni surahs hain?", a:"114" },
  { q:"Pakistan kab bana?", a:"14 August 1947" },
  { q:"Insaan ke kitne dant hote hain (pure)?", a:"32" },
];
const activeTrivia = {};
module.exports = {
  name: "Trivia",
  commands: {
    trivia: async ({ sock, from }) => {
      const q = questions[Math.floor(Math.random()*questions.length)];
      activeTrivia[from] = q.a.toLowerCase();
      await reply(sock, from, `🧠 *Trivia Question!*\n\n❓ ${q.q}\n\n_Jawab dene ke liye sirf jawab likho — 30 seconds mein!_`);
      setTimeout(() => {
        if (activeTrivia[from]) {
          delete activeTrivia[from];
          reply(sock, from, `⏰ *Time Out!*\nSahi jawab tha: *${q.a}*`);
        }
      }, 30000);
    },
  },
};
