import { useRef, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { useChat } from '@/react-app/hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import WelcomeScreen from './WelcomeScreen';

export default function ChatInterface() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://mocha-cdn.com/019a6241-4706-72af-9504-3099e2171947/capyai-logo.png" 
              alt="CapyAI" 
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CapyAI</h1>
              <p className="text-sm text-gray-500">Çok dilli AI asistan</p>
            </div>
          </div>
          
          {hasMessages && (
            <button
              onClick={clearChat}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
              Yeni Sohbet
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {!hasMessages ? (
          <WelcomeScreen onStartChat={sendMessage} isLoading={isLoading} />
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="divide-y divide-gray-100">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Input */}
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
}
