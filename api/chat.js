export default async function handler(req, res) {
  try {
    const message = req.query.message || "Hello!";

    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.sk-2641036a3fe44893b2df3015c5413b21}`
      },
      body: JSON.stringify({
        model: "deepseek-v4-pro",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: message
          }
        ],
        thinking: {
          type: "enabled"
        },
        reasoning_effort: "high",
        stream: false
      })
    });

    const data = await response.json();

    res.status(200).json({
      success: true,
      reply: data.choices?.[0]?.message?.content || "No response",
      raw: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
