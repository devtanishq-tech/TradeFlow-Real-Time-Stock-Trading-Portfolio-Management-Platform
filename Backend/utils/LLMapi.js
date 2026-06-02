require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.Groq_API,
});

async function LLMapi(query, context, history = []) {
  try {
    // Keep only last 2 messages
    const historyText =
      history
        ?.slice(-2)
        .map((m) => `${m.role}: ${m.text}`)
        .join("\n") || "";

    const prompt = `
You are a stock assistant.

Conversation:
${historyText || "No previous conversation"}

Data:
${context}

User: ${query}

Answer Rules:
- Keep response short
- Be actionable
- Mention best performing stock
- Mention worst performing stock
- Suggest action if needed
`;

    const result = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content:
            "You are a helpful stock market assistant that gives concise insights.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.5,
      max_tokens: 90,
    });

    return result.choices[0].message.content;
  } catch (err) {
    console.error("❌ LLM ERROR:", err);

    // Rate limit handling
    if (err.status === 429) {
      return "I'm receiving too many requests. Please wait a minute and try again.";
    }

    return "AI is currently unavailable. Please try again.";
  }
}

module.exports = LLMapi;
