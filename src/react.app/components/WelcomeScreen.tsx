import { Code, Globe, Zap } from 'lucide-react';
import ChatInput from './ChatInput';

interface WelcomeScreenProps {
  onStartChat: (message: string) => void;
  isLoading: boolean;
}

export default function WelcomeScreen({ onStartChat, isLoading }: WelcomeScreenProps) {
  const exampleQuestions = [
    {
      text: "React ile bir todo app nasıl yapılır?",
      icon: <Code className="w-4 h-4" />
    },
    {
      text: "How to sort an array in JavaScript?",
      icon: <Code className="w-4 h-4" />
    },
    {
      text: "Python'da liste comprehension nedir?",
      icon: <Code className="w-4 h-4" />
    },
    {
      text: "¿Cómo funciona async/await en JavaScript?",
      icon: <Code className="w-4 h-4" />
    }
  ];
  
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl text-center w-full">
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="https://mocha-cdn.com/019a6241-4706-72af-9504-3099e2171947/capyai-logo.png" 
              alt="CapyAI Logo" 
              className="w-32 h-32 mx-auto rounded-full shadow-lg"
            />
          </div>
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CapyAI'ye Hoş Geldin
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Çok dilli AI asistanın. Kodlama sorularını çöz, sohbet et ve hangi dilde yazarsan yazsın, 
            aynı dilde yanıt al.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Code className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Kod Uzmanı</h3>
              <p className="text-sm text-gray-600">
                Programlama sorularında detaylı kod örnekleri ve açıklamalar
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Globe className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Çok Dilli</h3>
              <p className="text-sm text-gray-600">
                Türkçe, İngilizce, Arapça, Çince ve daha fazla dilde destek
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Hızlı Yanıt</h3>
              <p className="text-sm text-gray-600">
                Gemini AI ile güçlendirilmiş, anlık ve akıllı yanıtlar
              </p>
            </div>
          </div>
          
          {/* Example questions */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Örnek sorular:
            </h3>
            
            {exampleQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => onStartChat(question.text)}
                className="w-full p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-left flex items-center gap-3 group"
              >
                <div className="text-gray-500 group-hover:text-green-600">
                  {question.icon}
                </div>
                <span className="text-gray-700 group-hover:text-gray-900">
                  {question.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="flex-shrink-0 bg-white border-t shadow-lg">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={onStartChat} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
