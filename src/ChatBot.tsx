import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark, faRobot } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Γεια σας! Πώς μπορώ να βοηθήσω σήμερα;" }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    const userMsg = { role: "user", content: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setMsg(""); 

    try {
      const res = await fetch("https://bro-project.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages, temperature: 0.2, max_tokens: 500 }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content += chunk;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] font-sans">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white">
          <FontAwesomeIcon icon={faComments} size="xl" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[380px] h-[500px] flex flex-col border border-slate-100 overflow-hidden">
          <div className="bg-slate-900 p-5 text-white flex justify-between items-center shadow-md">
            <span className="font-bold flex items-center gap-2"><FontAwesomeIcon icon={faRobot} /> AI Assistant</span>
            <button onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto bg-white text-slate-700 leading-relaxed">
            {messages.map((m, i) => (
              <div key={i} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-2xl max-w-[80%] ${m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-100'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
              <input className="flex-1 px-3 py-2 text-sm outline-none bg-transparent" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Γράψε μήνυμα..." />
              <button onClick={sendMessage} className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
