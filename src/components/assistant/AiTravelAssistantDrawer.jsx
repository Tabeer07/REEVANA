import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, Trash2, RotateCcw, MapPin, Calendar, IndianRupee, AlertCircle, Cpu } from 'lucide-react';
import { sendChatMessage } from '../../services/aiAssistantService';

export default function AiTravelAssistantDrawer({ isOpen, onClose, tripContext = {}, onUpdateItinerary }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hello! I'm your **REEVANA AI Assistant**. I'm aware of your trip to **${tripContext.destination || 'Mussoorie'}** (Budget: ₹${(tripContext.userBudget || tripContext.budget || 10000).toLocaleString('en-IN')}).\n\nHow can I help you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [lastUserMessage, setLastUserMessage] = useState('');
  const chatBottomRef = useRef(null);

  // Suggested Questions Ticker (Parts 1, 4 & 16 Specs)
  const suggestedQuestions = [
    "Where should I eat near Mall Road?",
    "Suggest a cheap vegetarian restaurant.",
    "My hotel is too expensive. Find me a cheaper option.",
    "Optimize my trip",
    "How can I reach George Everest from Mall Road?",
    "It's raining today. What should I visit?",
    "What local food should I try?",
    "How much will transportation cost?"
  ];

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query || query.trim() === '') return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setErrorState(false);
    setLastUserMessage(query);

    try {
      const historyForApi = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.sender === 'user' ? 'user' : 'model', parts: [{ text: m.text }] }));

      const res = await sendChatMessage(query, historyForApi, tripContext);

      const botMsg = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: res.reply || 'I found some great travel options for you!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: res.provider
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (res.updatedItinerary && onUpdateItinerary) {
        onUpdateItinerary(res.updatedItinerary);
      }
    } catch (err) {
      setIsTyping(false);
      setErrorState(true);
      const errBotMsg = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        isError: true,
        text: 'Sorry, I ran into a connection issue while contacting Gemini. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errBotMsg]);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: `Conversation cleared. I am ready for your next travel question about **${tripContext.destination || 'Mussoorie'}**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorState(false);
  };

  const handleRetry = () => {
    if (lastUserMessage) {
      handleSend(lastUserMessage);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 shadow-2xl flex flex-col animate-slide-left">
      
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
              <Bot className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
              <span>REEVANA AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-sky-400" />
              <span className="truncate max-w-[160px]">{tripContext.destination || 'Mussoorie'}</span>
              <span>•</span>
              <IndianRupee className="w-3 h-3 text-emerald-400" />
              <span>₹{(tripContext.userBudget || tripContext.budget || 10000).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            title="Clear Chat"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Trip Context Information Strip */}
      <div className="px-4 py-2 bg-sky-950/30 border-b border-sky-500/20 text-[11px] text-sky-300 flex items-center justify-between">
        <div className="flex items-center gap-1.5 truncate">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">Context Active: <strong>{tripContext.destination || 'Mussoorie'}</strong> ({tripContext.days || 3} Days)</span>
        </div>
        <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-200 font-bold shrink-0 text-[10px]">
          Gemini 3.6
        </span>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : msg.isError
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'bg-slate-900 border border-slate-800 text-amber-300'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[82%] p-3.5 rounded-2xl space-y-1.5 shadow-md ${
              msg.sender === 'user'
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-tr-none'
                : msg.isError
                ? 'bg-rose-950/40 border border-rose-500/30 text-rose-200 rounded-tl-none'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              <div className="leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>

              <div className="flex items-center justify-between text-[9px] opacity-75 pt-1 border-t border-slate-800/40">
                <span>{msg.timestamp}</span>
                {msg.provider && <span>✨ {msg.provider}</span>}
              </div>
            </div>
          </div>
        ))}

        {/* Typing Animation */}
        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 text-sky-400 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] font-semibold text-sky-300 ml-1">Gemini AI is thinking...</span>
            </div>
          </div>
        )}

        {/* Error Retry Strip */}
        {errorState && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" /> Failed to get response.
            </span>
            <button
              onClick={handleRetry}
              className="px-3 py-1 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-[10px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Retry
            </button>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Questions Ticker */}
      <div className="px-4 py-2 border-t border-slate-800 bg-slate-900/60">
        <div className="text-[10px] text-slate-400 font-bold uppercase mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> Suggested Questions
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[10px] px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-300 hover:text-white whitespace-nowrap transition-all shrink-0"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={`Ask about ${tripContext.destination || 'Mussoorie'}...`}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl py-3 px-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-medium"
        />

        <button
          type="submit"
          disabled={!inputValue.trim() || isTyping}
          className="w-11 h-11 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
