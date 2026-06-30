const { reply } = require("../lib/helper");
const dares = ["Apna bio abhi 'TAHA KHAN BOT MD user hoon' likho 😄","Kisi ko 'Main tumse pyaar karta hoon' ka message bhejo (joke mein) 😂","Next 5 messages mein sirf emojis se baat karo 🎭","Apni profile pic 1 ghante ke liye kisi funny pic se change karo 😅","Kisi ko bina wajah 'Thanks' ka message bhejo 😊"];
const truths = ["Aaj tak ki sabse sharmindagi wali baat batao?","Kisi ko secret crush hai to batao (naam nahi chahiye)?","Aaj kuch ghalat kiya kya? Sach batao!","Zindagi mein sabse bada jhooth kab bola?","Kab roya tha last time, kyun?"];
module.exports = {
  name: "Dare",
  commands: {
    dare: async ({ sock, from }) => {
      await reply(sock, from, `🎯 *Dare!*\n\n${dares[Math.floor(Math.random()*dares.length)]}`);
    },
    truth: async ({ sock, from }) => {
      await reply(sock, from, `💬 *Truth!*\n\n${truths[Math.floor(Math.random()*truths.length)]}`);
    },
  },
};
