import { Message } from '@/shared/types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-4 p-4 ${isUser ? 'bg-green-50' : 'bg-blue-50'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-green-100 text-green-600' 
          : 'bg-blue-100 text-blue-600'
      }`}>
        {isUser ? <User size={16} /> : <Bot size={16} />}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className={`text-sm font-medium mb-1 ${
          isUser ? 'text-green-800' : 'text-blue-800'
        }`}>
          {isUser ? 'Sen' : 'CapyAI'}
        </div>
        
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">
            {message.content}
          </pre>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          {new Date(message.created_at).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
