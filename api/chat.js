// File: app/api/chat/route.js

// Increase timeout to 60 seconds (max allowed on Vercel Hobby)
export const maxDuration = 60; 
// Use Edge runtime for better handling of long external API requests
export const runtime = 'edge'; 

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("prompt");

  if (!prompt) {
    return new Response("Error: Please provide a prompt (e.g., /api/chat?prompt=hi)", {
      status: 400,
      headers: { "Content-Type": "text/plain" }
    });
  }

  const apiKey = process.env.sk-2641036a3fe44893b2df3015c5413b21;

  if (!apiKey) {
    return new Response("Error: DEEPSEEK_API_KEY is not configured.", { 
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }

  try {
    const deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-v4-pro",
        messages: [
          { "role": "system", "content": "You are a helpful assistant." },
          { "role": "user", "content": prompt }
        ],
        // If it STILL times out after 60 seconds, remove this thinking block
        thinking: { type: "enabled" }, 
        reasoning_effort: "high",
        stream: false
      })
    });

    if (!deepseekResponse.ok) {
      const errorText = await deepseekResponse.text();
      return new Response(`DeepSeek API Error: ${errorText}`, { 
        status: deepseekResponse.status,
        headers: { "Content-Type": "text/plain" } 
      });
    }

    const data = await deepseekResponse.json();
    const textOutput = data.choices?.[0]?.message?.content || "No response generated.";

    return new Response(textOutput, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
      }
    });

  } catch (error) {
    return new Response(`Internal Server Error: ${error.message}`, { 
      status: 500,
      headers: { "Content-Type": "text/plain" }
    });
  }
}
