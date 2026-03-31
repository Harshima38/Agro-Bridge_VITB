import React, { useState, useEffect } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceInputProps {
  onTranscription: (text: string) => void;
}

// Ensure TypeScript knows about window.SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceInput = ({ onTranscription }: VoiceInputProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');

  const toggleRecording = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setError("Web Speech API is not supported in this browser.");
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-IN'; // Changed from hi-IN to en-IN (Hinglish) to hugely widen vocabulary support

      rec.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        onTranscription(transcript);
        setIsRecording(false);
      };

      rec.onerror = (e: any) => {
        if (e.error !== 'no-speech') {
          setError(`Error: ${e.error}`);
        }
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      setError('');
      rec.start();
      setIsRecording(true);
    } catch (err) {
      setError("Microphone access denied or error starting.");
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-wheat rounded-2xl bg-cream-dark">
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={toggleRecording}
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-colors ${isRecording ? 'bg-terracotta animate-pulse' : 'bg-forest hover:bg-forest-light'}`}
      >
        {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-12 h-12" />}
      </motion.button>
      
      <p className="mt-4 text-center text-lg font-medium text-text-primary">
        {isRecording ? "सुन रहा हूँ... (Listening...)" : "बोलकर जोड़ें (Tap to Voice List)"}
      </p>
      
      {error && (
        <p className="mt-2 text-sm text-terracotta flex items-center gap-1">
          <AlertCircle className="w-4 h-4"/> {error}
        </p>
      )}
    </div>
  );
};
