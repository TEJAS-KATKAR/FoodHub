import { useEffect, useRef, useState } from "react";
console.log("GROQ KEY:", import.meta.env.VITE_GROQ_API_KEY);


/* ================== GROQ CONFIG ================== */
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

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
  const inputRef = useRef(null);
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

  /* ---------- space focuses input ---------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

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
    "ingredients",
  ];

  const isFoodRelated = (text) =>
    foodKeywords.some((k) => text.toLowerCase().includes(k));

  /* ================== SEND MESSAGE ================== */
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;

    // show user message
    setMessages((prev) => [
      ...prev,
      { text: userText, sender: "user", time: getTime() },
    ]);

    playPopSound();
    setInput("");

    // 🚫 NON-FOOD MESSAGE → STOP HERE
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

    // typing indicator
    setMessages((prev) => [
      ...prev,
      { text: "AI Cook is typing...", sender: "ai", time: "" },
    ]);

    try {
      const aiReply = await askAICook(userText);

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove typing
        return [
          ...updated,
          { text: aiReply, sender: "ai", time: getTime() },
        ];
      });
    } catch (error) {
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

  /* ================== UI ================== */
  return (
    <div className="min-h-screen bg-orange-200/30 rounded-2xl flex justify-center items-center px-2 bg-[url('/chatbg.png')] bg-repeat w-full h-screen bg-size-[500px_400px] bg-center">
      <div className="w-full md:w-230 max-w-5xl h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
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

        {/* Input */}
        <div className="p-4 border-t flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type something here..."
            className="flex-1 px-4 py-2 rounded-full border text-sm focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="w-11 h-11 rounded-full bg-orange-500/90 text-white flex items-center justify-center"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
