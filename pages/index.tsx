import { useState } from "react";
<<<<<<< HEAD

export default function Home() {
=======
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ShibcalAI() {
>>>>>>> 4565b0dfac8d9589c15422c76f9af0ac2fed4d06
  const [messages, setMessages] = useState([
    { role: "bot", text: "שלום! איך אפשר לעזור לך היום?" },
  ]);
  const [input, setInput] = useState("");
<<<<<<< HEAD

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>🤖 שיבקל AI</h1>
      <div style={{ margin: "20px 0" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <strong>{m.role}:</strong> {m.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="כתוב כאן..."
        style={{ padding: 10, width: "60%" }}
      />
      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>
        שלח
      </button>
    </main>
  );
}
=======
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: newMessages.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text }))
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || "מצטער, לא הצלחתי להבין.";
      setMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", text: "שגיאה בתקשורת עם השרת." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen p-4 flex flex-col items-center"
      style={{
        backgroundImage: "url('/logo.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="bg-white bg-opacity-80 rounded-2xl p-4">
        <Image
          src="/logo.jpeg"
          alt="Shibcal AI Logo"
          width={100}
          height={100}
          className="mb-2 rounded-full"
        />
        <h1 className="text-3xl font-bold mb-4 text-center">🤖 שיבקל AI</h1>
      </div>
      <div className="w-full max-w-xl bg-white bg-opacity-80 rounded-2xl shadow p-4 space-y-2 overflow-y-auto h-[500px] mt-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-xl text-sm w-fit max-w-[75%] ${
              msg.role === "user" ? "bg-blue-100 self-end ml-auto" : "bg-gray-200"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="text-sm text-gray-500">טוען תגובה...</div>}
      </div>
      <div className="w-full max-w-xl mt-4 flex gap-2">
        <Input
          placeholder="הקלד הודעה..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>שלח</Button>
      </div>
    </div>
  );
}
>>>>>>> 4565b0dfac8d9589c15422c76f9af0ac2fed4d06
