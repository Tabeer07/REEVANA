import React, { useState } from 'react';
import { Volume2, MessageSquare, Hotel, Bus, DollarSign, ShieldAlert, Hospital, Car, Check } from 'lucide-react';
import { TOURIST_QUICK_PHRASES, SUPPORTED_LANGUAGES, speakText } from '../../services/translationService';

export default function TouristPhrasesGrid({ selectedTargetLang = 'ja' }) {
  const [activeSpeechId, setActiveSpeechId] = useState(null);

  const categoryIconMap = {
    Stays: Hotel,
    Transport: Bus,
    Shopping: DollarSign,
    Emergency: ShieldAlert,
    Medical: Hospital
  };

  const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedTargetLang) || SUPPORTED_LANGUAGES[0];

  const handleSpeakPhrase = (phraseId, translationText) => {
    setActiveSpeechId(phraseId);
    speakText(translationText, targetLangObj.speechCode);
    setTimeout(() => {
      setActiveSpeechId(null);
    }, 2200);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white font-heading">
            Essential Tourist Phrases
          </h3>
          <p className="text-xs text-slate-400">
            Click 🔊 Listen to play native pronunciation aloud to locals
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold self-start sm:self-auto">
          {targetLangObj.flag} Translated in {targetLangObj.name.split(' ')[0]}
        </span>
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOURIST_QUICK_PHRASES.map((item) => {
          const IconComponent = categoryIconMap[item.category] || MessageSquare;
          const tr = item.translations[selectedTargetLang] || item.translations['ja'];
          const isSpeaking = activeSpeechId === item.id;

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 space-y-3 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <span className="text-xs">{targetLangObj.flag}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-300 font-heading">
                  "{item.english}"
                </h4>

                {/* Translation Display */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                  <div className="text-lg font-bold text-white">
                    {tr.text}
                  </div>
                  <div className="text-[11px] text-amber-300 font-mono italic">
                    Phonetic: "{tr.phonetic}"
                  </div>
                </div>
              </div>

              {/* Speak Audio Button */}
              <button
                onClick={() => handleSpeakPhrase(item.id, tr.text)}
                className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isSpeaking
                    ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-slate-200 hover:text-white'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce text-slate-950' : 'text-emerald-400'}`} />
                <span>{isSpeaking ? 'Playing Audio...' : 'Listen Pronunciation'}</span>
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
}
