export default async function handler(req, res) {
  try {

    const prompt = req.body.prompt;

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" +
      process.env.GEMINI_KEY;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ]
      })
    });

    const data = await response.json();

    // 🔥 DEBUG (φαίνεται στα Vercel logs)
    console.log("GEMINI RESPONSE:", data);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
