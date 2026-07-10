import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark, faRobot } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("Γεια σας! Πώς μπορώ να βοηθήσω σήμερα;");

  // Helper για καθυστέρηση στο streaming
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sendMessage = async () => {
    if (!msg.trim()) return;
    
    const currentMsg = msg;
    setReply(""); 
    setMsg("");

    const API_URL = "https://bro-project.onrender.com";
    
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: currentMsg }] }),
      });

      if (!res.ok) throw new Error("Σφάλμα σύνδεσης");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        
        // "Σπάμε" το string σε χαρακτήρες για πιο ομαλό, αργό εφέ
        for (let char of chunk) {
          fullReply += char;
          setReply(fullReply);
          await delay(20); // Ρυθμίστε αυτό το νούμερο για ταχύτητα (π.χ. 10=γρήγορο, 50=αργό)
        }
      }
    } catch (error) {
      setReply("Λυπάμαι, υπήρξε κάποιο τεχνικό πρόβλημα. Παρακαλώ προσπαθήστε ξανά αργότερα.");
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faComments} size="xl" />
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl w-96 border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faRobot} className="text-cyan-400" />
              <h3 className="font-semibold text-lg">AI Support Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-cyan-400 transition">
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-6 h-80 overflow-y-auto text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50">
            {reply || <span className="text-slate-400 italic">Γράφει...</span>}
          </div>
          
          {/* Footer Input */}
          <div className="p-4 border-t border-slate-100 flex gap-2">
            <input 
              className="flex-1 border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-cyan-500 transition" 
              value={msg} 
              onChange={(e) => setMsg(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Γράψτε την ερώτησή σας..." 
            />
            <button 
              onClick={sendMessage} 
              className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition font-bold"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
