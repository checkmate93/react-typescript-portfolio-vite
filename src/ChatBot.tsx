export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  // Αλλάζουμε το reply σε messages array
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Γεια σας! Πώς μπορώ να βοηθήσω σήμερα;" }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!msg.trim()) return;

    const userMsg = { role: "user", content: msg };
    const updatedMessages = [...messages, userMsg];
    
    setMessages(updatedMessages); // Προσθήκη του μηνύματος χρήστη
    setMsg(""); 

    try {
      const res = await fetch("https://bro-project.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Στέλνουμε όλο το array των μηνυμάτων
        body: JSON.stringify({ messages: updatedMessages, temperature: 0.2, max_tokens: 500 }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      
      // Προσθέτουμε ένα κενό μήνυμα assistant για να αρχίσουμε το stream
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        
        // Ενημερώνουμε το τελευταίο μήνυμα (το assistant) με το stream
        setMessages((prev) => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content += chunk;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Chat Error:", error);
    }
  };

  return (
    // ... στο JSX, άλλαξε το map για να εμφανίζει τα μηνύματα
    <div className="flex-1 p-6 overflow-y-auto">
      {messages.map((m, i) => (
        <div key={i} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
          <span className={`p-2 rounded ${m.role === 'user' ? 'bg-cyan-100' : 'bg-slate-100'}`}>
            {m.content}
          </span>
        </div>
      ))}
    </div>
  );
}
