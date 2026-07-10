import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 99999 }}>
      {/* Το κουμπί που ανοίγει το chat */}
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#0f172a", color: "white", border: "none", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" }}
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      ) : (
        /* Το παράθυρο του chat */
        <div style={{ width: "300px", height: "400px", background: "white", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "#0f172a", color: "white", padding: "15px", display: "flex", justifyContent: "space-between" }}>
            <span>AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div style={{ flex: 1, padding: "15px", overflowY: "auto" }}>
            <p>Γεια σας! Πώς μπορώ να βοηθήσω;</p>
          </div>
        </div>
      )}
    </div>
  );
}
