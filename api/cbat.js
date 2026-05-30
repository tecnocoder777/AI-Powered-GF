import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const client = new OpenAI({
      apiKey: "devx-eucamti8ac8qzih5hxnq7k4x4wmr0l6x", // Wrapped in quotes
      baseURL: "https://aimodelapi.onrender.com/v1"
    });

    const response = await client.chat.completions.create({
      model: "deepseek-v3",
      messages: [
        { role: "user", content: req.query.prompt || "Hello" }
      ]
    });

    res.status(200).json({
      response: response.choices[0].message.content
    });
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from AI model" });
  }
}
