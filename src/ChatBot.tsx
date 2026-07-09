import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faPaperPlane, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const API_URL = import.meta.env.VITE_PUBLIC_API_URL || "https://bro-project.onrender.com";
    const res = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg }),
    });
    const data = await res.json();
    setReply(data.response);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-cyan-600 text-white p-4 rounded-full shadow-lg">
          <FontAwesomeIcon icon={faComments} />
        </button>
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-2xl w-72 border border-slate-200">
          <div className="flex justify-between mb-2">
            <h3 className="font-bold">Chat</h3>
            <button onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faXmark} /></button>
          </div>
          <input className="w-full border p-2 rounded mb-2" value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type..." />
          <button onClick={sendMessage} className="w-full bg-slate-900 text-white p-2 rounded">Send</button>
          {reply && <p className="mt-2 text-sm bg-gray-100 p-2 rounded">{reply}</p>}
        </div>
      )}
    </div>
  );
}
