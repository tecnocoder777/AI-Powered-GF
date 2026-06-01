export default async function handler(req, res) {
  try {
    const { prompt } = req.query;

    const apiKey = req.query.api_key;
    const model = req.query.model || "llama-3.1-8b-instant";

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: "Missing api_key"
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
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

    return res.status(200).json({
      success: true,
      model,
      prompt,
      response: data.choices?.[0]?.message?.content || ""
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
