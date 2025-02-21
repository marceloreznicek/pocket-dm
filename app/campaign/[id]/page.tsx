"use client"

import { FC, useState, useRef, useEffect } from 'react';
import { Send, User, Dice6 } from 'lucide-react';

// Types
interface ChatMessage {
  id: number;
  content: string;
  role: 'assistant' | 'user';
  metadata: {
    sender: 'dm' | 'player';
    characterName?: string;
    timestamp: Date;
  };
}

interface ChatProps {
  initialMessage?: string;
  playerName?: string;
  campaignName?: string;
}

const DEFAULT_INITIAL_MESSAGE = "Welcome adventurer. What would you like to do?";

export const ChatInterface: FC<ChatProps> = ({
  initialMessage = DEFAULT_INITIAL_MESSAGE,
  playerName = "Adventurer",
  campaignName = "New Campaign"
}) => {
  // State
  const [messages, setMessages] = useState<ChatMessage[]>(() => [{
    id: 1,
    content: initialMessage,
    role: 'assistant',
    metadata: {
      sender: 'dm',
      timestamp: new Date()
    }
  }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Effects
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Utilities
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createMessage = (
    content: string,
    role: 'assistant' | 'user',
    sender: 'dm' | 'player'
  ): ChatMessage => ({
    id: Date.now(),
    content,
    role,
    metadata: {
      sender,
      characterName: sender === 'player' ? playerName : undefined,
      timestamp: new Date()
    }
  });

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Create and add player message
    const playerMessage = createMessage(inputMessage, 'user', 'player');
    setMessages(prev => [...prev, playerMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send to API
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, playerMessage].map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const aiResponse = await response.json();
      const dmMessage = createMessage(aiResponse.content, 'assistant', 'dm');
      setMessages(prev => [...prev, dmMessage]);
    } catch (error) {
      console.error('Error:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  // Message Component
  const MessageBubble: FC<{ message: ChatMessage }> = ({ message }) => {
    const isPlayer = message.metadata.sender === 'player';
    
    return (
      <div className={`flex ${isPlayer ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            isPlayer
              ? 'bg-mystic-700 text-white'
              : 'bg-mystic-800 border border-gold-700/30'
          }`}
        >
          <div className="flex items-center space-x-2 mb-2">
            {isPlayer ? (
              <>
                <User className="w-4 h-4 text-mystic-200" />
                <span className="text-mystic-200 text-sm">{message.metadata.characterName}</span>
              </>
            ) : (
              <>
                <Dice6 className="w-4 h-4 text-gold-500" />
                <span className="text-gold-500 text-sm">Dungeon Master</span>
              </>
            )}
          </div>
          <p className="text-mystic-100">{message.content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-mystic-950 flex flex-col">
      {/* Header */}
      <div className="bg-mystic-900 border-b border-gold-700/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-display text-white">{campaignName}</h1>
          <div className="flex items-center space-x-2 text-mystic-200">
            <User className="w-4 h-4" />
            <span>Playing as {playerName}</span>
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

export default ChatInterface;