import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 9999 }}>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ 
            width: "60px", height: "60px", borderRadius: "50%", 
            background: "#0f172a", color: "white", border: "none", 
            cursor: "pointer", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" 
          }}
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      ) : (
        <div style={{ 
          width: "320px", height: "450px", background: "white", 
          borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", 
          display: "flex", flexDirection: "column", overflow: "hidden",
          border: "1px solid #e2e8f0"
        }}>
          <div style={{ 
            background: "#0f172a", color: "white", padding: "15px", 
            display: "flex", justifyContent: "space-between", alignItems: "center" 
          }}>
            <span style={{ fontWeight: "bold" }}>AI Assistant</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
          <div style={{ flex: 1, padding: "20px", overflowY: "auto", color: "#334155" }}>
            <p>Γεια σας! Πώς μπορώ να βοηθήσω σήμερα;</p>
          </div>
        </div>
      )}
    </div>
  );
}
