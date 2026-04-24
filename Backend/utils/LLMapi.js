require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function LLMapi(query, context, history = []) {
  try {
    // const historyText =
    //   history?.length > 0
    //     ? history
    //         .filter((m) => m && m.text)
    //         .map((m) => `${m.role}: ${m.text}`)
    //         .join("\n")
    //     : "No previous conversation";
    const historyText =
      history
        ?.slice(-2) // only last 2 messages
        .map((m) => `${m.role}:${m.text}`)
        .join("\n") || "";
    const prompt = `
You are a stock assistant.

Conversation:
${historyText || "No previous conversation"}

Data:
${context}

User: ${query}

Answer:
- Short
- Actionable
- Mention best performing stock
- Mention worst performing stock
- Suggest action if needed
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 90,
      },
    });

    return result.text;
  } catch (err) {
    console.error("❌ LLM ERROR:", err.message || err);

    // Gracefully handle rate limits so the frontend receives a friendly message
    if (err.status === 429) {
      return "I'm receiving too many requests! Please wait about a minute and try asking again.";
    }

    return "AI is currently unavailable. Please try again.";
  }
}

module.exports = LLMapi;
