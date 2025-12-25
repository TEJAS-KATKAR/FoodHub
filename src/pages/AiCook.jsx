import { useEffect, useRef, useState } from "react";
import BackupAI from "../components/BackupAI";

/* ================== GROQ CONFIG ================== */

async function askAICook(userMessage) {
  const res = await fetch(
    "https://foodhub-ai-backend.onrender.com/api/ai-cook",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    }
  );

  const data = await res.json();
  return data.reply;
}

/* ================== COMPONENT ================== */
export default function AiCookChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesRef = useRef(null);
  const shouldAutoScroll = useRef(true);

  /* ---------- scroll handling ---------- */
  const handleScroll = () => {
    const el = messagesRef.current;
    if (!el) return;

    const isAtBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight < 50;

    shouldAutoScroll.current = isAtBottom;
  };

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;

    if (shouldAutoScroll.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  /* ---------- helpers ---------- */
  const playPopSound = () => {
    const audio = new Audio("/pop.mp3");
    audio.play();
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  /* ---------- food filter ---------- */
  const foodKeywords = [
    "food",
    "recipe",
    "burger",
    "pizza",
    "rice",
    "chicken",
    "veg",
    "non veg",
    "calories",
    "diet",
    "cuisine",
    "ingredients","fish","biryani","paneer","noodles","veg","wuick","oil","bread"
  ];

  const isFoodRelated = (text) =>
    foodKeywords.some((k) => text.toLowerCase().includes(k));

  /* ================== SEND MESSAGE ================== */
  const sendMessage = async (textFromSuggestion = null) => {
    const userText = textFromSuggestion ?? input;
    if (!userText.trim()) return;

    setMessages((prev) => [
      ...prev,
      { text: userText, sender: "user", time: getTime() },
    ]);

    playPopSound();
    setInput("");

    if (!isFoodRelated(userText)) {
      setMessages((prev) => [
        ...prev,
        {
          text: "🍳 I only help with food-related questions.",
          sender: "ai",
          time: getTime(),
        },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      { text: "AI Cook is typing...", sender: "ai", time: "" },
    ]);

    try {
      const aiReply = await askAICook(userText);

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        return [
          ...updated,
          { text: aiReply, sender: "ai", time: getTime() },
        ];
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ AI Cook is tired. Please try again.",
          sender: "ai",
          time: getTime(),
        },
      ]);
    }
  };

  /* ================== SUGGESTION HANDLER ================== */
  const sendSuggestion = (text) => {
    sendMessage(text);
  };

  /* ================== UI ================== */
  return (
    <div className="flex flex-col">
    <div className=" bg-orange-200/30 rounded-2xl flex justify-center px-2 bg-[url('/chatbg.png')] bg-repeat w-full lg:h-170  bg-size-[500px_400px] bg-center p-5">
      <div className="w-full md:w-230 max-w-5xl lg:h-[80vh] md:h-[80vh] h-[60vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
            🍳
          </div>
          <div>
            <p className="font-semibold">AI Cook</p>
            <p className="text-xs text-gray-500">FoodHub Assistant</p>
          </div>
        </div>

        {/* Date */}
        <div className="text-center text-xs text-gray-500 my-2">
          {new Date().toDateString()}
        </div>

        {/* Messages */}
        <div
          ref={messagesRef}
          onScroll={handleScroll}
          className="flex-1 px-4 space-y-3 overflow-y-auto hide-scrollbar"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender === "ai" && (
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm shrink-0">
                  🍳
                </div>
              )}

              <div
                className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                  msg.sender === "user"
                    ? "bg-orange-500/90 text-white rounded-br-md"
                    : "bg-gray-200 text-gray-800 rounded-bl-md"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {msg.time}
                </p>
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm shrink-0">
                  👤
                </div>
              )}
            </div>
          ))}
        </div>

        
            {/* SUGGESTIONS */}
          <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
            <div className="flex gap-3 w-max">
              {[
                "How to make biryani?",
                "How to cook fish curry?",
                "Easy chicken recipes",
                "Paneer dishes for dinner",
                "Quick noodle recipes",
                "Healthy breakfast ideas",
                "Best street food snacks",
                "Low-oil veg recipes",
              ].map((text) => (
                <button
                  key={text}
                  onClick={() => sendSuggestion(text)}
                  className="shrink-0 px-4 py-2 bg-white border rounded-full text-sm text-gray-700 shadow-md hover:bg-yellow-100 transition"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type something here..."
              className="flex-1 px-4 py-2 rounded-full border text-sm focus:outline-none"
            />
            <button
              onClick={() => sendMessage()}
              className="w-11 h-11 rounded-full bg-orange-500/90 text-white flex items-center justify-center"
            >
              ➤
            </button>
          </div>

        </div>
      </div>

      <BackupAI />
    </div>
  );
}