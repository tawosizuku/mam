const { messagingApi } = require("@line/bot-sdk");

let client;
function getClient() {
  if (!client) {
    client = new messagingApi.MessagingApiClient({
      channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    });
  }
  return client;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { need } = req.body;
  const text = need
    ? "🍚 今日の晩ごはん、いります！"
    : "🙅 今日の晩ごはん、いりません！";

  try {
    await getClient().pushMessage({
      to: process.env.LINE_USER_ID,
      messages: [{ type: "text", text }],
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("LINE送信エラー:", err.message);
    res.status(500).json({ ok: false, error: "送信に失敗しました" });
  }
};
