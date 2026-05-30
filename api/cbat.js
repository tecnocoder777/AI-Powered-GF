File: "api/chat.js"

import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const prompt = req.query.prompt || "Hello";

    const client = new OpenAI({
      apiKey: process.env.devx-eucamti8ac8qzih5hxnq7k4x4wmr0l6x,
      baseURL: "https://aimodelapi.onrender.com/v1",
    });

    const response = await client.chat.completions.create({
      model: "deepseek-v3",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.status(200).json({
      success: true,
      response: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
