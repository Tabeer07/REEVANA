/**
 * REEVANA Translation Service Module
 * 
 * Provides mock translation matrix, phonetic guides, pre-set tourist phrases,
 * and browser Web Speech API audio pronunciation.
 * 
 * TO CONNECT REAL TRANSLATION API (e.g. Google Cloud Translate API / DeepL API):
 * Replace `translateText` with an API call:
 * fetch(`https://translation.googleapis.com/language/translate/v2?q=${text}&target=${targetLang}&key=${API_KEY}`)
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'ja', name: 'Japanese (日本語)', flag: '🇯🇵', speechCode: 'ja-JP' },
  { code: 'fr', name: 'French (Français)', flag: '🇫🇷', speechCode: 'fr-FR' },
  { code: 'es', name: 'Spanish (Español)', flag: '🇪🇸', speechCode: 'es-ES' },
  { code: 'it', name: 'Italian (Italiano)', flag: '🇮🇹', speechCode: 'it-IT' },
  { code: 'de', name: 'German (Deutsch)', flag: '🇩🇪', speechCode: 'de-DE' },
  { code: 'hi', name: 'Hindi (हिंदी)', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'en', name: 'English (US/UK)', flag: '🇺🇸', speechCode: 'en-US' }
];

export const TOURIST_QUICK_PHRASES = [
  {
    id: 'phrase-1',
    english: 'Where is the hotel?',
    category: 'Stays',
    translations: {
      ja: { text: 'ホテルはどこですか？', phonetic: 'Hoteru wa doko desu ka?' },
      fr: { text: "Où est l'hôtel ?", phonetic: 'Oo eh lo-tel?' },
      es: { text: '¿Dónde está el hotel?', phonetic: 'Don-de es-ta el o-tel?' },
      it: { text: "Dov'è l'hotel?", phonetic: 'Doh-veh lo-tel?' },
      de: { text: 'Wo ist das Hotel?', phonetic: 'Vo ist das ho-tel?' },
      hi: { text: 'होटल कहाँ है?', phonetic: 'Hotel kahaan hai?' }
    }
  },
  {
    id: 'phrase-2',
    english: 'Where is the bus station?',
    category: 'Transport',
    translations: {
      ja: { text: 'バス停はどこですか？', phonetic: 'Basutei wa doko desu ka?' },
      fr: { text: "Où est la gare routière ?", phonetic: 'Oo eh lah gar roo-tyer?' },
      es: { text: '¿Dónde está la estación de autobuses?', phonetic: 'Don-de es-ta la es-ta-cion de au-to-bu-ses?' },
      it: { text: "Dov'è la stazione degli autobus?", phonetic: 'Doh-veh lah stah-tsyo-ne deh-lyee au-to-boos?' },
      de: { text: 'Wo ist der Busbahnhof?', phonetic: 'Vo ist der boos-bahn-hof?' },
      hi: { text: 'बस स्टैंड कहाँ है?', phonetic: 'Bus stand kahaan hai?' }
    }
  },
  {
    id: 'phrase-3',
    english: 'How much does this cost?',
    category: 'Shopping',
    translations: {
      ja: { text: 'これはいくらですか？', phonetic: 'Kore wa ikura desu ka?' },
      fr: { text: 'Combien ça coûte ?', phonetic: 'Kom-byen sah koot?' },
      es: { text: '¿Cuánto cuesta esto?', phonetic: 'Kwan-to kwes-ta es-to?' },
      it: { text: 'Quanto costa questo?', phonetic: 'Kwan-to kos-ta kwes-to?' },
      de: { text: 'Wie viel kostet das?', phonetic: 'Vee feel kos-tet das?' },
      hi: { text: 'यह कितने का है?', phonetic: 'Yeh kitne ka hai?' }
    }
  },
  {
    id: 'phrase-4',
    english: 'I need help.',
    category: 'Emergency',
    translations: {
      ja: { text: '助けてください。', phonetic: 'Tasukete kudasai.' },
      fr: { text: "J'ai besoin d'aide.", phonetic: 'Zhay buh-zwan dede.' },
      es: { text: 'Necesito ayuda.', phonetic: 'Ne-ce-si-to a-yu-da.' },
      it: { text: 'Ho bisogno di aiuto.', phonetic: 'Oh bee-zon-yo dee ah-yoo-to.' },
      de: { text: 'Ich brauche Hilfe.', phonetic: 'Ikh brow-khe heel-feh.' },
      hi: { text: 'मुझे मदद चाहिए।', phonetic: 'Mujhe madad chahiye.' }
    }
  },
  {
    id: 'phrase-5',
    english: 'Where is the hospital?',
    category: 'Medical',
    translations: {
      ja: { text: '病院はどこですか？', phonetic: 'Byōin wa doko desu ka?' },
      fr: { text: "Où est l'hôpital ?", phonetic: 'Oo eh lo-pee-tal?' },
      es: { text: '¿Dónde está el hospital?', phonetic: 'Don-de es-ta el hos-pi-tal?' },
      it: { text: "Dov'è l'ospedale?", phonetic: 'Doh-veh los-peh-dah-leh?' },
      de: { text: 'Wo ist das Krankenhaus?', phonetic: 'Vo ist das kran-ken-hows?' },
      hi: { text: 'अस्पताल कहाँ है?', phonetic: 'Aspataal kahaan hai?' }
    }
  },
  {
    id: 'phrase-6',
    english: 'I need a taxi.',
    category: 'Transport',
    translations: {
      ja: { text: 'タクシーを呼びたいです。', phonetic: 'Takushī wo yobitai desu.' },
      fr: { text: "J'ai besoin d'un taxi.", phonetic: 'Zhay buh-zwan dun tak-see.' },
      es: { text: 'Necesito un taxi.', phonetic: 'Ne-ce-si-to un tak-si.' },
      it: { text: 'Ho bisogno di un taxi.', phonetic: 'Oh bee-zon-yo dee oon tak-see.' },
      de: { text: 'Ich brauche ein Taxi.', phonetic: 'Ikh brow-khe ayn tak-see.' },
      hi: { text: 'मुझे एक टैक्सी चाहिए।', phonetic: 'Mujhe ek taxi chahiye.' }
    }
  }
];

export const translateText = async (text, sourceLang = 'en', targetLang = 'ja') => {
  if (!text || text.trim() === '') {
    return { translatedText: '', phonetic: '' };
  }

  // Check if text matches any quick phrases
  const lower = text.trim().toLowerCase();
  const match = TOURIST_QUICK_PHRASES.find(p => p.english.toLowerCase() === lower);

  if (match && match.translations[targetLang]) {
    return {
      originalText: text,
      translatedText: match.translations[targetLang].text,
      phonetic: match.translations[targetLang].phonetic,
      sourceLang,
      targetLang
    };
  }

  // Mock translation for custom text input
  if (targetLang === 'ja') {
    return {
      originalText: text,
      translatedText: `すみません、${text} (Sumimasen, ${text})`,
      phonetic: `Sumimasen, ${text}`,
      sourceLang,
      targetLang
    };
  } else if (targetLang === 'fr') {
    return {
      originalText: text,
      translatedText: `S'il vous plaît, ${text}`,
      phonetic: `Seel voo play, ${text}`,
      sourceLang,
      targetLang
    };
  } else if (targetLang === 'es') {
    return {
      originalText: text,
      translatedText: `Por favor, ${text}`,
      phonetic: `Por fa-vor, ${text}`,
      sourceLang,
      targetLang
    };
  }

  return {
    originalText: text,
    translatedText: `[${targetLang.toUpperCase()}] ${text}`,
    phonetic: text,
    sourceLang,
    targetLang
  };
};

/**
 * Web Speech API audio pronunciation helper
 */
export const speakText = (text, langCode = 'ja-JP') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find matching browser voice if available
    const voices = window.speechSynthesis.getVoices();
    const voiceMatch = voices.find(v => v.lang.startsWith(langCode.slice(0, 2)));
    if (voiceMatch) {
      utterance.voice = voiceMatch;
    }
    
    utterance.lang = langCode;
    utterance.rate = 0.9; // Slightly slower for clear tourist listening
    window.speechSynthesis.speak(utterance);
  }
};
