import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(["Γεια! Πώς μπορώ να βοηθήσω;"]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999 }}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#0f172a", color: "white", border: "none", cursor: "pointer" }}>
          <FontAwesomeIcon icon={faComments} />
        </button>
      ) : (
        <div style={{ width: "300px", height: "400px", background: "white", border: "1px solid #ccc", borderRadius: "15px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "#0f172a", color: "white", padding: "10px", display: "flex", justifyContent: "space-between" }}>
            <span>Live Chat</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white" }}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((m, i) => <div key={i} style={{ marginBottom: "10px" }}>{m}</div>)}
          </div>
          <div style={{ padding: "10px", borderTop: "1px solid #eee", display: "flex", gap: "5px" }}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Γράψε μήνυμα..." 
              style={{ flex: 1, padding: "5px" }}
            />
            <button onClick={handleSend} style={{ padding: "5px 10px" }}><FontAwesomeIcon icon={faPaperPlane} /></button>
          </div>
        </div>
      )}
    </div>
  );
}
