const { reply } = require("../lib/helper");
const jokes = [
  "Doctor: Subah uthkar paani piyo.\nMareez: Peeta hoon!\nDoctor: Toh seedha uthna band karo 😂",
  "Biwi: Suno ji, aaj khana nahi bana.\nShauhar: Theek hai, bahar chalte hain!\nBiwi: Aur maa ko bhi bula lete hain 😂",
  "Exam mein likha: 'Mujhe nahi pata'\nTeacher ne likha: 'Mujhe bhi nahi pata' 😅",
  "Beta: Papa mobile nahi chhod raha!\nPapa: Tu bhi nahi chodta tha! 😂",
  "WiFi ka password: Dena Nahi Chahta\nGuest: Kya hai?\nHost: Wahi jo maine kaha 😅",
  "Naata: 160cm\nDost: Tum itne chote kyun ho?\nMain: Asmaan se gira tha, jaldi pakda gaya 😂",
];
module.exports = {
  name: "Joke",
  commands: {
    joke: async ({ sock, from }) => {
      await reply(sock, from, `😄 *Aaj Ka Joke*\n\n${jokes[Math.floor(Math.random()*jokes.length)]}`);
    },
  },
};
