import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Cook Backend Running");
});

app.post("/api/ai-cook", async (req, res) => {
  const userMessage = req.body?.message;

  if (!userMessage || !userMessage.trim()) {
    return res.status(400).json({ reply: "Please enter a message." });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is missing.");
    return res.status(500).json({ reply: "AI service is not configured." });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          messages: [
            {
              role: "system",
              content:
                "You are AI Cook, the food assistant for FoodHub. Answer questions about food, recipes, ingredients, cooking techniques, cuisines, and nutrition. Politely refuse unrelated questions. Give clear, helpful answers.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.7,
          max_completion_tokens: 1024,
        }),
        signal: controller.signal,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Groq API Error:", response.status, data);
      return res.status(response.status).json({
        reply: "AI Cook couldn't generate a response. Please try again.",
      });
    }

    const aiReply = data.choices?.[0]?.message?.content;

    if (!aiReply) {
      console.error("Unexpected Groq response:", data);
      return res.status(500).json({
        reply: "AI Cook received an empty response. Please try again.",
      });
    }

    return res.json({ reply: aiReply });
  } catch (error) {
    console.error("AI ERROR:", error);

    if (error.name === "AbortError") {
      return res.status(504).json({
        reply: "AI Cook took too long to respond. Please try again.",
      });
    }

    return res.status(500).json({
      reply: "AI service is temporarily unavailable. Please try again.",
    });
  } finally {
    clearTimeout(timeout);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});