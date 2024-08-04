export async function generate(prompt) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        stream: false,
      }),
    });

    const { choices } = await res.json();
    return choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return null;
  }
}
