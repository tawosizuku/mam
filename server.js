require("dotenv").config();
const express = require("express");
const { messagingApi } = require("@line/bot-sdk");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
});

app.post("/api/send", async (req, res) => {
  const { need } = req.body;
  const text = need
    ? "🍚 今日の晩ごはん、いります！"
    : "🙅 今日の晩ごはん、いりません！";

  try {
    await client.pushMessage({
      to: process.env.LINE_USER_ID,
      messages: [{ type: "text", text }],
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("LINE送信エラー:", err.message);
    res.status(500).json({ ok: false, error: "送信に失敗しました" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
