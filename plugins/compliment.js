const { reply } = require("../lib/helper");
const compliments = ["Tum bahut achi insaan ho! 🌟","Tumhari smile bahut pyaari hai 😊","Tum bahut mehnat karte ho, masha Allah! 💪","Tum bahut intelligent ho! 🧠","Tumhara dil bahut saaf hai, subhan Allah! ❤️","Tum duniya ke behtareen logo mein se ek ho! 🌍"];
const insults = ["Ek kaam dhang se nahi hota tum se 😂","Hamare group ka joker! 😆","Tum se toh GPS bhi bhaag jaaye 😂","Robot bhi tumse zyada smart hai! 🤖","Tumhari soch itni slow hai ke 2G bhi sarmaye! 😂"];
module.exports = {
  name: "Compliment",
  commands: {
    compliment: async ({ sock, from, pushName }) => {
      await reply(sock, from, `🌟 *${pushName} ke liye compliment:*\n\n${compliments[Math.floor(Math.random()*compliments.length)]}`);
    },
    insult: async ({ sock, from, pushName }) => {
      await reply(sock, from, `😂 *Mazaaq mein ${pushName} ke liye:*\n\n${insults[Math.floor(Math.random()*insults.length)]}\n\n_Bura mat mano — mazaaq hai!_ 😄`);
    },
  },
};
