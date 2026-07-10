import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark, faRobot } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("Γεια σας! Πώς μπορώ να βοηθήσω σήμερα;");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [reply]);

  const sendMessage = async () => {
    if (!msg.trim()) return;
    const currentMsg = msg;
    setReply(""); 
    setMsg("");

    try {
      const res = await fetch("https://bro-project.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: currentMsg }] }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        fullReply += decoder.decode(value, { stream: true });
        setReply(fullReply);
        await new Promise(resolve => setTimeout(resolve, 20)); // Slow streaming
      }
    } catch (error) {
      setReply("Σφάλμα σύνδεσης. Παρακαλώ δοκιμάστε ξανά.");
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] font-sans">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 border-2 border-white"
        >
          <FontAwesomeIcon icon={faComments} size="xl" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[380px] h-[520px] flex flex-col border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
          
          <div className="bg-slate-900 p-5 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-cyan-500 p-2 rounded-lg"><FontAwesomeIcon icon={faRobot} /></div>
              <span className="font-bold tracking-wide">AI Support</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition"><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto text-slate-700 bg-white prose prose-sm max-w-none">
            {reply ? (
              <ReactMarkdown components={{
                a: ({node, ...props}) => <a {...props} className="text-cyan-600 font-bold underline" target="_blank" rel="noreferrer" />,
                strong: ({node, ...props}) => <strong {...props} className="text-slate-900 font-bold" />
              }}>
                {reply}
              </ReactMarkdown>
            ) : (
              <div className="text-slate-400 animate-pulse italic">Σκέφτομαι...</div>
            )}
          </div>
          
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200 focus-within:ring-2 focus-within:ring-cyan-500 transition">
              <input 
                className="flex-1 px-3 py-2 text-sm outline-none bg-transparent" 
                value={msg} 
                onChange={(e) => setMsg(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Γράψε ένα μήνυμα..." 
              />
              <button onClick={sendMessage} className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
