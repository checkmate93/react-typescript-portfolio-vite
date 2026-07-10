import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", content: "Γεια! Πώς μπορώ να βοηθήσω;" }]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { role: "user", content: msg }]);
    setMsg("");
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999 }}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#0f172a", color: "white", border: "none", cursor: "pointer" }}>
          <FontAwesomeIcon icon={faComments} />
        </button>
      ) : (
        <div style={{ width: "300px", height: "400px", background: "white", borderRadius: "15px", display: "flex", flexDirection: "column", border: "1px solid #ccc", overflow: "hidden" }}>
          <div style={{ background: "#0f172a", color: "white", padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((m, i) => <div key={i} style={{ marginBottom: "10px" }}>{m.content}</div>)}
          </div>
          <div style={{ padding: "10px", borderTop: "1px solid #eee", display: "flex", gap: "5px" }}>
            <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Γράψε μήνυμα..." style={{ flex: 1 }} />
            <button onClick={sendMessage}><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
