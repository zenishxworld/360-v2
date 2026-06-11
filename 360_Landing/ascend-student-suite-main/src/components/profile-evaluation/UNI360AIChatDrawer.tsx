import React, { useState } from "react";
import { Sparkles, X, Send, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const PRESET_QUESTIONS = [
  "Why was this course recommended?",
  "Can I get admission with my score?",
  "Show cheaper alternatives.",
  "Compare with another course."
];

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const UNI360AIChatDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi! I'm UNI 360 AI. How can I help you understand your profile evaluation today?", isUser: false }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMsg = { id: Date.now().toString(), text, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        text: "I'm analyzing your profile and the universities to give you the best answer. (This is a simulated AI response for the demo)", 
        isUser: false 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#8B6AE8] text-white rounded-full px-6 py-4 shadow-[0_10px_40px_rgba(139,106,232,0.4)] flex items-center gap-3 font-semibold hover:bg-[#7251d1] transition-transform hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5" />
              Ask UNI 360 AI
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-[100] backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 right-0 w-full lg:w-[400px] h-[80vh] lg:h-[600px] lg:bottom-6 lg:right-6 bg-white rounded-t-3xl lg:rounded-3xl shadow-[0_10px_50px_rgba(0,0,0,0.2)] z-[110] flex flex-col overflow-hidden border border-gray-100"
            >
              {/* Header */}
              <div className="bg-[#8B6AE8] text-white p-4 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">UNI 360 AI</h3>
                    <p className="text-white/80 text-xs">Always here to help</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.isUser ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                      msg.isUser 
                        ? "bg-[#8B6AE8] text-white rounded-br-sm" 
                        : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                {messages.length === 1 && (
                  <div className="flex overflow-x-auto gap-2 pb-4 hide-scrollbar">
                    {PRESET_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(q)}
                        className="whitespace-nowrap px-4 py-2 bg-[#F4EEFF] text-[#8B6AE8] text-xs font-medium rounded-full border border-[#8B6AE8]/20 hover:bg-[#8B6AE8] hover:text-white transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="relative flex items-center">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                    placeholder="Ask anything..."
                    className="pr-12 h-12 rounded-full border-gray-200 bg-gray-50 focus-visible:ring-[#8B6AE8]"
                  />
                  <button 
                    onClick={() => handleSend(input)}
                    disabled={!input.trim()}
                    className="absolute right-1.5 w-9 h-9 flex items-center justify-center rounded-full bg-[#8B6AE8] text-white disabled:opacity-50 disabled:bg-gray-300 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
