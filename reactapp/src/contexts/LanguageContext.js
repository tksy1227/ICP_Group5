import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const languages = {
  en: {
    name: 'English',
    code: 'en',
    chatbot: {
      title: 'PalmPilot Chatbot',
      placeholder: 'Type your message...',
      send: 'Send',
      clear: 'Clear Chat',
      thinking: 'Thinking',
      error: 'Sorry, I didn\'t understand that.',
      connectionError: 'Sorry, there was an error connecting to the chatbot API.',
      modelInfo: 'This chatbot is powered by Llama 2-7B model'
    }
  },
  id: {
    name: 'Bahasa Indonesia',
    code: 'id',
    chatbot: {
      title: 'PalmPilot Chatbot',
      placeholder: 'Ketik pesan Anda...',
      send: 'Kirim',
      clear: 'Hapus Chat',
      thinking: 'Sedang berpikir',
      error: 'Maaf, saya tidak mengerti.',
      connectionError: 'Maaf, terjadi kesalahan saat menghubungi chatbot API.',
      modelInfo: 'Chatbot ini menggunakan model Llama 2-7B'
    }
  },
  jw: {
    name: 'Basa Jawa',
    code: 'jw',
    chatbot: {
      title: 'PalmPilot Chatbot',
      placeholder: 'Ketik pesen sampeyan...',
      send: 'Kirim',
      clear: 'Busak Chat',
      thinking: 'Mikir',
      error: 'Nyuwun pangapunten, kula mboten mangertos.',
      connectionError: 'Nyuwun pangapunten, wonten kesalahan nalika nyambung kaliyan chatbot API.',
      modelInfo: 'Chatbot niki ngangge model Llama 2-7B'
    }
  },
  su: {
    name: 'Basa Sunda',
    code: 'su',
    chatbot: {
      title: 'PalmPilot Chatbot',
      placeholder: 'Ketik pesen anjeun...',
      send: 'Kirim',
      clear: 'Hapus Chat',
      thinking: 'Mikir',
      error: 'Punten, abdi teu ngartos.',
      connectionError: 'Punten, aya kasalahan dina nyambungkeun ka chatbot API.',
      modelInfo: 'Chatbot ieu ngagunakeun model Llama 2-7B'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id'); // Default to Indonesian

  const value = {
    language,
    setLanguage,
    translations: languages[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);