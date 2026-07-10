import { useState } from "react";

export default function ChatBot() {
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
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={{ padding: "15px", borderRadius: "50%", background: "black", color: "white" }}>
          Chat
        </button>
      ) : (
        <div style={{ width: "250px", height: "300px", background: "white", border: "1px solid black", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, padding: "10px", overflowY: "auto" }}>
            {messages.map((m, i) => <div key={i}>{m}</div>)}
          </div>
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Γράψε εδώ..." 
              style={{ flex: 1 }}
            />
            <button onClick={handleSend}>Αποστολή</button>
          </div>
        </div>
      )}
    </div>
  );
}
