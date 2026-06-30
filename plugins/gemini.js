const { reply } = require("../lib/helper");
const axios = require("axios");
const cfg = require("../config.json");

module.exports = {
  name: "Gemini AI",
  commands: {
    gemini: async ({ sock, from, args }) => {
      if (!args.length) return reply(sock, from, `❌ Sawaal likho!\nMisal: ${cfg.PREFIX}gemini Kya hal hai?`);
      const key = process.env.GEMINI_API_KEY || cfg.geminiKey;
      if (!key) return reply(sock, from, "❌ Gemini key nahi hai. .env mein GEMINI_API_KEY lagao.");
      await reply(sock, from, "✨ _Gemini soch raha hai..._");
      try {
        const res = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
          { contents:[{ parts:[{ text: `Urdu/Hindi mein jawab do: ${args.join(" ")}` }] }] }
        );
        const answer = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "Jawab nahi mila";
        await reply(sock, from, `✨ *Gemini Jawab:*\n\n${answer}`);
      } catch(e) { await reply(sock, from, "❌ Gemini error: "+e.message); }
    },
  },
};
