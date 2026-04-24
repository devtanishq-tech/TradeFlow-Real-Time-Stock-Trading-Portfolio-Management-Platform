import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AIChatAssistant.css";

const AIChatAssistant = ({ livePrices, holdings }) => {
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);
  const [isSending, setisSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const msgChange = (event) => {
    setmessage(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlesend();
    }
  };

  const handlesend = async () => {
    if (!message.trim()) return;

    const userData = {
      role: "user",
      text: message,
    };
    const updateMessages = [...messages, userData];
    setmessages(updateMessages);
    setmessage("");
    setisSending(true);

    try {
      let res = await axios.post(
        "http://localhost:8080/aiChat",
        {
          message: userData.text,
          holdings,
          livePrices,
          history: updateMessages,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = res.data;
      const botMessage = {
        role: "assistant",
        text: data.reply,
      };
      setmessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.log(err);
      const errorMessage = {
        role: "assistant",
        text: "Unable to reach the server. Please try again.",
        isError: true,
      };
      setmessages((prev) => [...prev, errorMessage]);
    } finally {
      setisSending(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={`chat-fab ${open ? "chat-fab--active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle AI Assistant"
      >
        <span className="chat-fab__icon">
          {open ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="12" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
            </svg>
          )}
        </span>
        <span className="chat-fab__pulse" />
      </button>

      {/* Chat Panel */}
      <div
        className={`chat-panel ${open ? "chat-panel--open" : ""}`}
        role="dialog"
        aria-label="AI Trading Assistant"
      >
        {/* Header */}
        <div className="chat-panel__header">
          <div className="chat-panel__header-left">
            <div className="chat-panel__avatar">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div className="chat-panel__title-group">
              <span className="chat-panel__title">AI Trading Assistant</span>
              <span className="chat-panel__subtitle">
                <span className="chat-panel__status-dot" />
                Live · Powered by NHIMBHU
              </span>
            </div>
          </div>
          <button
            className="chat-panel__close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages Area */}
        <div className="chat-panel__messages">
          {/* Empty State */}
          {messages.length === 0 && !isSending && (
            <div className="chat-empty">
              <div className="chat-empty__icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <p className="chat-empty__title">Start your analysis</p>
              <p className="chat-empty__body">
                Ask me anything about your portfolio, live prices, or trading
                strategies.
              </p>
              <div className="chat-empty__chips">
                <button
                  className="chat-empty__chip"
                  onClick={() => setmessage("How is my portfolio performing?")}
                >
                  Portfolio performance
                </button>
                <button
                  className="chat-empty__chip"
                  onClick={() => setmessage("What are my top holdings?")}
                >
                  Top holdings
                </button>
                <button
                  className="chat-empty__chip"
                  onClick={() => setmessage("Any buy opportunities today?")}
                >
                  Buy signals
                </button>
              </div>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message chat-message--${msg.role} ${msg.isError ? "chat-message--error" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="chat-message__avatar">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
              )}
              <div className="chat-message__bubble">
                <p className="chat-message__text">{msg.text}</p>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isSending && (
            <div className="chat-message chat-message--assistant">
              <div className="chat-message__avatar">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div className="chat-message__bubble chat-message__bubble--typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-panel__footer">
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              className="chat-input"
              value={message}
              onChange={msgChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your portfolio…"
              disabled={isSending}
              autoComplete="off"
            />
            <button
              className={`chat-send-btn ${isSending || !message.trim() ? "chat-send-btn--disabled" : ""}`}
              onClick={handlesend}
              disabled={isSending || !message.trim()}
              aria-label="Send message"
            >
              {isSending ? (
                <svg
                  className="chat-send-btn__spinner"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              )}
            </button>
          </div>
          <p className="chat-panel__hint">
            Press <kbd>Enter</kbd> to send
          </p>
        </div>
      </div>
    </>
  );
};

export default AIChatAssistant;
