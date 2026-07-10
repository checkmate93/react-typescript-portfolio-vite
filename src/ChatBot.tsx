import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Γεια σας! Πώς μπορώ να βοηθήσω σήμερα;" }
  ]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { role: "user", content: msg }]);
    setMsg("");
    // Εδώ θα μπει αργότερα η κλήση στο API σου
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999 }}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#0f172a", color: "white", border: "none", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}>
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      ) : (
        <div style={{ width: "320px", height: "450px", background: "white", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid #e2e8f0" }}>
          {/* Header */}
          <div style={{ background: "#0f172a", color: "white", padding: "15px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold" }}>AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          
          {/* Messages Area */}
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#e2e8f0' : '#f1f5f9', padding: "8px 12px", borderRadius: "10px" }}>
                {m.content}
              </div>
            ))}
          </div>

          {/* Input Area (ΕΔΩ ΗΤΑΝ ΤΟ ΠΡΟΒΛΗΜΑ) */}
          <div style={{ padding: "10px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "5px" }}>
            <input 
              value={msg} 
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Γράψε μήνυμα..."
              style={{ flex: 1, padding: "8px", border: "1px solid #ccc", borderRadius: "5px" }}
            />
            <button onClick={sendMessage} style={{ background: "#0f172a", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
