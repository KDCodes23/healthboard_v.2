"use client";
import axios from "axios";
import { PlaneIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  sender: "user" | "ai" | "system";
  text: string;
}

export default function TalkToAi() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi, I'm your AI consultant for health needs. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages and more stuff to come
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        message: newMessage.text,
      });
      const aiReply = response.data?.response || "No response received.";
      const aiMessage: Message = { sender: "ai", text: aiReply };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        sender: "ai",
        text: "I'm sorry, there was an error processing your request. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-[100vh] p-20 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <h1 className="text-2xl font-semibold">Talk to Your Health Consultant</h1>
        </div>
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-md px-5 py-3 rounded-xl shadow ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-green-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
                {/* Optional sender labels */}
                {msg.sender === "user" && (
                  <span className="absolute -bottom-2 -right-2 text-xs text-white bg-blue-700 rounded-full px-2 py-1">
                    You
                  </span>
                )}
                {msg.sender === "ai" && (
                  <span className="absolute -bottom-2 -left-2 text-xs text-gray-800 bg-green-200 rounded-full px-2 py-1">
                    AI
                  </span>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-md px-5 py-3 rounded-xl shadow bg-green-100 text-gray-800">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Bar */}
        <div className="border-t border-gray-200 p-4 flex items-center bg-white">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) handleSend();
            }}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="ml-4 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <PlaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
