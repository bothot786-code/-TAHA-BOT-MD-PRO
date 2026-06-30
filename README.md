# 🤖 TAHA KHAN BOT MD

> Powerful WhatsApp Bot — Baileys v6 | OpenAI + Gemini AI | 40+ Commands | HTML Pairing | Render Ready

**Owner:** TAHA KHAN | **Number:** 923474771404 | **Version:** 1.0.0

---

## 📁 File Structure

```
TAHA-KHAN-BOT-MD/
├── index.js              ← Main bot + Express pairing server
├── config.json           ← Bot settings (name, number, pic, prefix)
├── package.json
├── .env.example
├── render.yaml
│
├── lib/
│   └── helper.js         ← Shared utility functions
│
├── plugins/              ← 40+ command plugins
│   ├── help.js           ← .help .menu
│   ├── info.js           ← .info .owner
│   ├── ping.js           ← .ping
│   ├── uptime.js         ← .uptime
│   ├── uid.js            ← .uid .user
│   ├── ai.js             ← .ai .ask .gpt .chat
│   ├── gemini.js         ← .gemini
│   ├── translate.js      ← .translate
│   ├── tts.js            ← .tts .speech
│   ├── joke.js           ← .joke
│   ├── fact.js           ← .fact
│   ├── dare.js           ← .dare .truth
│   ├── eightball.js      ← .8ball
│   ├── compliment.js     ← .compliment .insult
│   ├── trivia.js         ← .trivia
│   ├── random.js         ← .random .flip .dice
│   ├── meme.js           ← .meme
│   ├── admin.js          ← .kick .promote .demote .mute .unmute .lock .unlock
│   ├── tagAll.js         ← .tagall
│   ├── grp.js            ← .grp .grouprules .topmembers .out
│   ├── warn.js           ← .warn (auto-kick at 3)
│   ├── antilink.js       ← .antilink on/off
│   ├── antispam.js       ← .antispam on/off
│   ├── approve.js        ← .approve
│   ├── autoreact.js      ← .autoreact on/off
│   ├── weather.js        ← .weather [city]
│   ├── getLink.js        ← .getlink
│   ├── contact.js        ← .contact
│   ├── viewOnce.js       ← .viewonce
│   ├── delete.js         ← .delete
│   ├── bot.js            ← .bot .imagine
│   ├── owner.js          ← .broadcast .eval .shell
│   ├── restart.js        ← .restart
│   └── prefix.js         ← .prefix
│
├── grpUpCmd/             ← Auto group events
│   ├── welcome.js        ← Auto welcome (pic ke saath)
│   ├── gdbye.js          ← Auto goodbye
│   ├── promote.js        ← Promote notification
│   └── demote.js         ← Demote notification
│
├── public/
│   └── index.html        ← 🌐 Beautiful Pairing Panel (Pairing Code + QR)
│
└── session/              ← Auto-created login data
```

---

## ⚙️ Setup (Local)

```bash
# 1. Install
npm install

# 2. .env file banao
cp .env.example .env
# OPENAI_API_KEY aur CHANNEL_JID likho

# 3. Run karo
npm start

# 4. Browser mein jao
# http://localhost:3000
```

---

## 💬 Commands (Prefix: `.`)

| Command | Kaam |
|---------|------|
| `.help` | Full help menu (pic ke saath) |
| `.info` | Bot info (pic ke saath) |
| `.ping` | Speed check |
| `.uptime` | Online time |
| `.owner` | Owner info |
| `.ai [sawaal]` | ChatGPT jawab |
| `.gemini [sawaal]` | Google Gemini jawab |
| `.joke` | Urdu joke |
| `.fact` | Interesting fact |
| `.dare` | Random dare |
| `.truth` | Truth question |
| `.8ball [sawaal]` | Magic 8 ball |
| `.trivia` | Quiz question |
| `.weather [city]` | Mausam |
| `.tagall` | Sab ko tag |
| `.kick @user` | Member nikalo |
| `.promote @user` | Admin bano |
| `.mute` | Group mute |
| `.warn @user` | Warning (3 = auto kick) |
| `.antilink on/off` | Links block |
| `.viewonce` | View once dekho |
| `.broadcast [msg]` | Channel pe bhejo (owner) |
| `.restart` | Bot restart (owner) |

---

## 🌐 Render Deployment

```bash
# GitHub pe push karo
git init && git add . && git commit -m "TAHA KHAN BOT MD v1.0"
git remote add origin https://github.com/YOUR/REPO.git
git push -u origin main
```

1. [render.com](https://render.com) → New Web Service
2. GitHub repo select karo
3. Env vars: `OPENAI_API_KEY`, `GEMINI_API_KEY`, `CHANNEL_JID`
4. Deploy → Render URL pe pairing karo ✅

---

**Made with ❤️ by TAHA KHAN | TAHA KHAN BOT MD v1.0.0** 🚀
