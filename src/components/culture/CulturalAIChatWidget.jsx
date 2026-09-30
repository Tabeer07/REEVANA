import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';
import { SUGGESTED_AI_QUESTIONS, askCulturalAI } from '../../services/aiCulturalGuideService';

export default function CulturalAIChatWidget({ monument }) {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello! I am your AI Cultural Guide for **${monument.name}**. Ask me anything about its history, architectural secrets, or visiting tips!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleSendMessage = async (queryText = inputQuery) => {
    const textToSend = queryText.trim();
    if (!textToSend || isThinking) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    const aiAnswer = await askCulturalAI(monument, textToSend);

    const aiMsg = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: aiAnswer,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsThinking(false);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 space-y-6 shadow-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/20">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Ask AI About This Place
            </h3>
            <p className="text-xs text-slate-400">
              Instant AI answers & cultural storytelling for {monument.name}
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
          ⚡ AI Cultural Engine Active
        </span>
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Suggested Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_AI_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-amber-200 text-xs font-medium transition-all"
            >
              💬 "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread Window */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4 max-h-80 overflow-y-auto">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                  isUser
                    ? 'bg-sky-600 text-white rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none font-sans whitespace-pre-line'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-[10px] opacity-60 text-right">{msg.time}</div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium p-2">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>AI Cultural Guide is analyzing historical archives...</span>
          </div>
        )}
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask anything about ${monument.name}...`}
          className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-medium"
        />

        <button
          type="submit"
          disabled={!inputQuery.trim() || isThinking}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </button>
      </form>

    </div>
  );
}
