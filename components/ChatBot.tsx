import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

// Custom Demon Bot Icon
const DemonBotIcon: React.FC<{ size?: number, className?: string }> = ({ size = 28, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    >
        <rect width="18" height="10" x="3" y="11" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <path d="M8 16h0" />
        <path d="M16 16h0" />
    </svg>
    {/* Red Glowing Demon Eyes Overlays */}
    <div className="absolute top-[57%] left-[30%] w-[10%] h-[10%] bg-red-500 rounded-full shadow-[0_0_8px_red] animate-pulse"></div>
    <div className="absolute top-[57%] right-[30%] w-[10%] h-[10%] bg-red-500 rounded-full shadow-[0_0_8px_red] animate-pulse"></div>
  </div>
);

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Duggled. ¿En qué puedo ayudarte hoy? Pregúntame sobre nuestros planes o servicios de automatización.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    // Format history for API
    const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
    }));

    const response = await sendMessageToGemini(userMsg, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <>
        {!isOpen && (
            <motion.button
                onClick={toggleChat}
                className="fixed bottom-24 right-6 z-40 bg-green-600 p-4 rounded-full shadow-lg text-white flex items-center justify-center border-2 border-green-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <DemonBotIcon size={28} />
            </motion.button>
        )}

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.9 }}
                    className="fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-96 h-[500px] z-40 bg-neu-base rounded-3xl shadow-neu-flat flex flex-col overflow-hidden border border-white/40"
                >
                    {/* Header */}
                    <div className="p-4 bg-neu-base shadow-sm flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-neu-base shadow-neu-pressed text-gray-600">
                                <DemonBotIcon size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-700">Duggled AI</h3>
                                <p className="text-xs text-green-500 font-semibold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    En línea
                                </p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="text-gray-500 hover:text-red-500 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neu-base">
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                    msg.role === 'user' 
                                        ? 'bg-neu-accent text-white shadow-lg rounded-tr-none' 
                                        : 'bg-neu-base shadow-neu-flat text-gray-700 rounded-tl-none border border-white/50'
                                }`}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-neu-base shadow-neu-pressed px-4 py-2 rounded-full">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-neu-base">
                        <div className="flex gap-2 items-center bg-neu-base shadow-neu-pressed rounded-full px-4 py-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu consulta..."
                                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                            />
                            <button 
                                onClick={handleSend}
                                disabled={isLoading}
                                className="p-2 rounded-full text-neu-accent hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};