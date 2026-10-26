
const products = [
  { id: 1, name: "Wireless Headphones", price: 1999, category: "Electronics" },
  { id: 2, name: "Smart Watch", price: 2499, category: "Electronics" },
  { id: 3, name: "Running Shoes", price: 1799, category: "Fashion" },
  { id: 4, name: "Backpack", price: 999, category: "Fashion" },
  { id: 5, name: "Coffee Mug", price: 299, category: "Home" },
  { id: 6, name: "Table Lamp", price: 899, category: "Home" },
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: "Groq API key is not configured",
    });
  }

  const { message } = req.body || {};

  if (typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Please enter a message",
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      error: "Message is too long",
    });
  }
console.log("Groq key exists:", !!process.env.GROQ_API_KEY);
console.log(
  "Groq key starts with gsk_:",
  process.env.GROQ_API_KEY?.startsWith("gsk_")
);
console.log(
  "Groq key contains whitespace:",
  /\s/.test(process.env.GROQ_API_KEY || "")
);
  try {
    
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content: `
You are ShopSphere's helpful AI Shopping Assistant.

Only recommend products from this catalog:
${JSON.stringify(products)}

Rules:
- Understand the user's needs and budget.
- Never invent products or prices.
- If no product matches, explain politely.
- Give short, friendly answers.
- Reply in the language used by the user.
- Do not claim an order was placed or a cart was changed.
`,
            },
            {
              role: "user",
              content: message.trim(),
            },
          ],
          temperature: 0.4,
          max_completion_tokens: 400,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
  console.error("Groq status:", response.status);
  console.error("Groq error type:", data.error?.type);
  console.error("Groq error code:", data.error?.code);

  return res.status(502).json({
    error: "AI service is temporarily unavailable",
  });
}

    return res.status(200).json({
      reply:
        data.choices?.[0]?.message?.content ||
        "Sorry, I couldn't generate a response.",
    });
  } catch (error) {
    console.error("AI request failed:", error.message);

    return res.status(500).json({
      error: "Something went wrong while contacting the AI service",
    });
  }
}
