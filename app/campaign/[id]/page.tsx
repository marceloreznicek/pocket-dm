"use client";

import { FC, useState, useRef, useEffect, use } from "react";
import { Send, User, Dice6 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: number;
  message_type: string;
  metadata?: any;
  created_at: Date;
  username?: string;
}

interface CampaignPageProps {
  params: Promise<{
    id: string;
  }>;
}

const CampaignPage: FC<CampaignPageProps> = ({ params }) => {
  const { id: campaignId } = use(params);

  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Utilities
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/messages`);
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Create message object for immediate display
    const tempMessage: Message = {
      id: Date.now().toString(), // temporary ID
      content: inputMessage,
      sender_id: 4,
      message_type: "player",
      created_at: new Date(),
    };

    // Add message immediately for better UX
    setMessages((prev) => [...prev, tempMessage]);
    setInputMessage("");

    setIsLoading(true);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: inputMessage,
          sender_id: 4, // This should come from auth
        }),
      });

      if (!response.ok) throw new Error("Failed to send message");

      const newMessage = await response.json();
      setMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const MessageBubble: FC<{ message: Message }> = ({ message }) => {
    const isPlayer = message.sender_id !== 1;

    return (
      <div className={`flex ${isPlayer ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            isPlayer
              ? "bg-white/95 text-gray-800 border-2 border-emerald-200 shadow-md hover:shadow-lg transition-shadow"
              : "bg-emerald-50/95 text-gray-800 border border-emerald-100 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-2 mb-2 border-b border-emerald-100 pb-2">
            {" "}
            {/* Added separator */}
            {isPlayer ? (
              <>
                <User className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-700 text-sm font-medium">
                  {message.username || "Player"}
                </span>
              </>
            ) : (
              <>
                <Dice6 className="w-4 h-4 text-yellow-600" />
                <span className="text-emerald-700 text-sm font-medium">
                  Dungeon Master
                </span>
              </>
            )}
          </div>
          <p className="text-gray-800">{message.content}</p>
        </div>
      </div>
    );
  };

  return (
    // Main container
    <div
      className="min-h-screen flex flex-col overflow-hidden" // Added overflow-hidden to prevent outer scroll
      style={{
        background: `
      radial-gradient(
        circle at center,
        white 0%,
        rgba(167, 243, 208, 0.2) 60%,
        rgb(6, 95, 70) 100%
      )
    `,
      }}
    >
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-emerald-200 p-4 fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-display text-emerald-800 font-semibold">
            A Wild Sheep Chase
          </h1>
          <div className="flex items-center space-x-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <User className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-medium">
              Playing as Test Player
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 mt-16 mb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/95 text-gray-800 rounded-lg p-4 border border-emerald-200 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Dice6 className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="text-emerald-700">
                    The Dungeon Master is writing...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white/90 backdrop-blur-md border-t border-emerald-200 p-6 fixed bottom-0 left-0 right-0 z-10 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="What would you like to do?"
              className="flex-1 bg-emerald-50/50 border-2 border-emerald-200 rounded-lg px-6 py-3 text-gray-800 placeholder-emerald-600/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:bg-emerald-600 disabled:hover:scale-100 shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
