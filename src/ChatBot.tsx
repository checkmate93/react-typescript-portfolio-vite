import { useState } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 999999 }}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ padding: "15px 25px", background: "black", color: "white", borderRadius: "20px", cursor: "pointer" }}
        >
          Chat
        </button>
      ) : (
        <div style={{ width: "250px", height: "300px", background: "white", border: "2px solid black", padding: "10px" }}>
          <p>Το Chatbot λειτουργεί!</p>
          <button onClick={() => setIsOpen(false)}>Κλείσιμο</button>
        </div>
      )}
    </div>
  );
}
