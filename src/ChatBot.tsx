import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("Γεια σου! Πώς μπορώ να βοηθήσω;");

  const sendMessage = async () => {
    if (!msg.trim()) return;
    
    const currentMsg = msg; // Κρατάμε το μήνυμα
    setReply("Σκέφτομαι...");
    setMsg(""); // Καθαρίζουμε το input αμέσως

    const API_URL = "https://bro-project.onrender.com";
    
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({ message: currentMsg }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setReply(data.response || "Δεν έλαβα απάντηση από τον server.");
    } catch (error) {
      console.error("ChatBot Error:", error);
      setReply("Σφάλμα σύνδεσης. Δοκίμασε ξανά σε λίγο.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-cyan-600 text-white p-4 rounded-full shadow-2xl hover:bg-cyan-700 transition"
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      ) : (
        <div className="bg-white p-5 rounded-2xl shadow-2xl w-80 border border-slate-200 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-slate-800">AI Assistant</h3>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-500 hover:text-black transition"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg mb-4 h-32 overflow-y-auto text-sm text-slate-700 border border-slate-100">
            {reply}
          </div>
          
          <div className="flex gap-2">
            <input 
              className="flex-1 border border-slate-300 p-2 rounded-lg text-sm outline-none focus:border-cyan-500 transition" 
              value={msg} 
              onChange={(e) => setMsg(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ρώτησέ με κάτι..." 
            />
            <button 
              onClick={sendMessage} 
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
