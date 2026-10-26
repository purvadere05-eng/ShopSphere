import { useState, useEffect } from "react";
import "./../App.css";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

function AIAssistant() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState(() => {
    try {
      const savedMessages = localStorage.getItem("shopsphere_chat");

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }

    return [
      {
        role: "assistant",
        text: "Hi! 👋 Welcome to ShopSphere. What are you looking for today?",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("shopsphere_chat", JSON.stringify(messages));
  }, [messages]);

  const productLinks = {
    "Wireless Headphones": 1,
    "Smart Watch": 2,
    "Running Shoes": 3,
    Backpack: 4,
    "Coffee Mug": 5,
    "Table Lamp": 6,
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hi! 👋 Welcome to ShopSphere. What are you looking for today?",
      },
    ]);
  };

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      { role: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);

      console.error("AI Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="ai-page">
      <section className="ai-chat">
        <header className="ai-chat-header">
          <h2>🤖 ShopSphere AI Assistant</h2>
          <p>Your personal shopping helper</p>
          <button
            type="button"
            className="clear-chat-btn"
            onClick={handleClearChat}
          >
            Clear Chat
          </button>
        </header>

        <div className="ai-messages">
          {messages.map((item, index) => (
            <div key={index} className={`ai-message ${item.role}`}>
              <ReactMarkdown
                components={{
                  strong: ({ children }) => {
                    const productName = String(children).trim();
                    const productId = productLinks[productName];

                    if (productId) {
                      return (
                        <Link
                          to={`/products/${productId}`}
                          className="ai-product-link"
                        >
                          {children}
                        </Link>
                      );
                    }

                    return <strong>{children}</strong>;
                  },
                }}
              >
                {item.text}
              </ReactMarkdown>
            </div>
          ))}

          {loading && (
            <div className="ai-message assistant">AI is thinking...</div>
          )}
        </div>

        <form className="ai-input-form" onSubmit={handleSend}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me what to buy..."
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AIAssistant;
