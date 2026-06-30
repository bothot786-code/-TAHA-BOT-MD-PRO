const { reply } = require("../lib/helper");
const axios = require("axios");
const cfg = require("../config.json");

async function askOpenAI(prompt) {
  const key = process.env.OPENAI_API_KEY || cfg.openAiKey;
  if (!key) return "❌ OpenAI key nahi hai. .env mein OPENAI_API_KEY lagao.";
  try {
    const res = await axios.post("https://api.openai.com/v1/chat/completions",
      { model:"gpt-3.5-turbo", messages:[{role:"system",content:`Tum ${cfg.botName} ho. Urdu/Hindi mein jawab do.`},{role:"user",content:prompt}], max_tokens:400 },
      { headers:{ Authorization:`Bearer ${key}` } });
    return res.data.choices[0].message.content.trim();
  } catch(e) { return "❌ AI error: "+e.message; }
}

module.exports = {
  name: "AI",
  commands: {
    ai: async ({ sock, from, args }) => {
      if (!args.length) return reply(sock, from, `❌ Sawaal likho!\nMisal: ${cfg.PREFIX}ai Pakistan ki capital?`);
      await reply(sock, from, "🤖 _Soch raha hoon..._");
      await reply(sock, from, `🤖 *AI Jawab:*\n\n${await askOpenAI(args.join(" "))}`);
    },
    ask: async (ctx) => module.exports.commands.ai(ctx),
    gpt: async (ctx) => module.exports.commands.ai(ctx),
    chat: async (ctx) => module.exports.commands.ai(ctx),
  },
};
