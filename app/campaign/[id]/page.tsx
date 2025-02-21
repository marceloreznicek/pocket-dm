'use client';

import { FC, useState, useRef, useEffect, use } from 'react';
import { Send, User, Dice6 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  message_type: string;
  metadata?: any;
  created_at: Date;
  username?: string;
}

interface CampaignPageProps {
  params: Promise<{
    id: string;
  }>
}

const CampaignPage: FC<CampaignPageProps> = ({ params }) => {
  const { id: campaignId } = use(params);
  
  // State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
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
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/campaigns/${campaignId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: inputMessage,
          sender_id: 'test-user-id', // This should come from auth
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const newMessage = await response.json();
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-mystic-950 flex flex-col">
      {/* Header */}
      <div className="bg-mystic-900 border-b border-gold-700/30 p-4 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-display text-white">A Wild Sheep Chase</h1>
          <div className="flex items-center space-x-2 text-mystic-200">
            <User className="w-4 h-4" />
            <span>Playing as Test Player</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 mt-16 mb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map(message => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-mystic-800 text-white rounded-lg p-4 border border-gold-700/30">
                <div className="flex items-center space-x-2">
                  <Dice6 className="w-4 h-4 text-gold-500 animate-spin" />
                  <span>The Dungeon Master is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-mystic-900 border-t border-gold-700/30 p-4 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="What would you like to do?"
              className="flex-1 bg-mystic-800 border border-gold-700/30 rounded-lg px-4 py-2 text-white placeholder-mystic-400 focus:outline-none focus:border-gold-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-mystic-700 text-white px-4 py-2 rounded-lg hover:bg-mystic-600 transition border border-gold-700/30 disabled:opacity-50 disabled:hover:bg-mystic-700"
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