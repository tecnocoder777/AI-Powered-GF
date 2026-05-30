const response = await fetch("https://api.deepseek.com/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer sk-2641036a3fe44893b2df3015c5413b21"
  },
  body: JSON.stringify({
    model: "deepseek-chat",
    messages: [
      {
        role: "user",
        content: message
      }
    ]
  })
});
