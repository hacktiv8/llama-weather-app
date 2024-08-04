export async function generate(prompt) {
  const url = "http://localhost:11434/api/generate";
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ model: "llama3.1", prompt, stream: false }),
    });

    const { response } = await res.json();
    return response.trim();
  } catch (error) {
    console.error(error);
    return null;
  }
}
