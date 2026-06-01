export default async function handler(req, res) {
  try {
    const { prompt } = req.query;
    const apiKey = req.query.api_key;
    const model = req.query.model || "llama-3.1-8b-instant";

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.choices?.[0]?.message?.content || "No response";

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(answer);

  } catch (e) {
    res.status(500).send("Error: " + e.message);
  }
}
