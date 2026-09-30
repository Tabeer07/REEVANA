import React, { useState } from 'react';
import { Languages, Volume2, Copy, Check, ArrowRightLeft, Sparkles, RefreshCw, VolumeX } from 'lucide-react';
import { SUPPORTED_LANGUAGES, translateText, speakText } from '../../services/translationService';

export default function TranslationTranslatorWidget() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ja');
  const [inputText, setInputText] = useState('Where is the hotel?');
  const [translatedResult, setTranslatedResult] = useState({
    originalText: 'Where is the hotel?',
    translatedText: 'ホテルはどこですか？',
    phonetic: 'Hoteru wa doko desu ka?'
  });
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSwapLanguages = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setIsTranslating(true);
    
    // Simulate brief API delay for real UX feel
    setTimeout(async () => {
      const res = await translateText(inputText, sourceLang, targetLang);
      setTranslatedResult(res);
      setIsTranslating(false);
    }, 400);
  };

  const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLang) || SUPPORTED_LANGUAGES[0];

  const handleListenAudio = () => {
    if (!translatedResult.translatedText) return;
    setIsPlayingAudio(true);
    speakText(translatedResult.translatedText, targetLangObj.speechCode);
    setTimeout(() => setIsPlayingAudio(false), 2500);
  };

  const handleCopyText = () => {
    if (translatedResult.translatedText) {
      navigator.clipboard.writeText(translatedResult.translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/20">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-heading">
              Smart Tourist Translator
            </h3>
            <p className="text-xs text-slate-400">
              Instant multi-lingual translation & audio pronunciation
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
          🔊 Native Speech Audio
        </span>
      </div>

      {/* Language Selectors Bar with Swap */}
      <div className="flex items-center justify-between gap-3 p-2 bg-slate-900 rounded-2xl border border-slate-800">
        
        {/* Source Language */}
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>

        {/* Swap Button */}
        <button
          type="button"
          onClick={handleSwapLanguages}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all shrink-0"
          title="Swap Languages"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Target Language */}
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-xs font-bold text-emerald-400 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>

      </div>

      {/* Custom Text Input & Translate CTA */}
      <div className="space-y-3">
        <textarea
          rows="3"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text or question to translate..."
          className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none font-medium"
        ></textarea>

        <button
          onClick={handleTranslate}
          disabled={isTranslating || !inputText.trim()}
          className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isTranslating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Translating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Translate to {targetLangObj.name.split(' ')[0]}</span>
            </>
          )}
        </button>
      </div>

      {/* Translation Result Output Box */}
      {translatedResult.translatedText && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-emerald-500/30 space-y-4 shadow-xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>{targetLangObj.flag}</span>
              <span>Translation ({targetLangObj.name})</span>
            </span>

            <div className="flex items-center gap-2">
              {/* Copy Button */}
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Listen Pronunciation Audio Button */}
              <button
                onClick={handleListenAudio}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                  isPlayingAudio
                    ? 'bg-emerald-500 text-slate-950 font-extrabold animate-pulse'
                    : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-slate-950'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                <span>{isPlayingAudio ? 'Speaking...' : 'Listen Audio'}</span>
              </button>
            </div>
          </div>

          {/* Translated Text Typography */}
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-relaxed">
              {translatedResult.translatedText}
            </div>

            {translatedResult.phonetic && (
              <div className="text-xs text-amber-300 font-mono italic pt-1">
                Phonetic Pronunciation: "{translatedResult.phonetic}"
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
