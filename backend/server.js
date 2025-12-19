import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Cook Backend Running");
});

app.post("/api/ai-cook", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "No message received" });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15 sec timeout

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are AI Cook for FoodHub. Only answer food-related questions. If not food, politely refuse.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.json({ reply: "🍳 AI Cook is busy right now. Please try again in a moment." });
    }

    res.json({
      reply: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI ERROR:", error.message);

    res.json({
      reply: "AI service is waking up. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
