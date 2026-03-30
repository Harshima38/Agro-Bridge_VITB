import React, { useState } from 'react';
import { VoiceInput } from '../components/VoiceInput';
import { Package, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const FarmerDashboard = () => {
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleVoice = (text: string) => {
    setTranscriptions(prev => [text, ...prev]);
    // Simulate NLP parsing
    if(text.includes('amrood') || text.toLowerCase().includes('guava')) {
      setParsedData({ item: 'Guava (अमरूद)', quantity: '50 kg', price: '₹40/kg' });
    } else {
      setParsedData({ item: 'Unknown', raw: text });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="bg-forest text-cream p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold font-display">राम राम, Ramesh!</h2>
          <p className="opacity-90 mt-1">आपकी कुल कमाई इस महीने (Earnings): <strong>₹8,450</strong></p>
        </div>
        <div className="flex gap-2">
           <span className="bg-cream text-forest px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">⭐ 4.8 / 5.0 Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Voice Listing Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-start gap-3 border-b border-gray-100 pb-4">
            <Package className="text-forest w-6 h-6 shrink-0"/>
            <div>
              <h3 className="text-xl font-bold font-display">नया सामान जोड़ें (Add Listing)</h3>
              <p className="text-text-secondary text-sm">माइक्रोफ़ोन दबाएं और बोलें</p>
            </div>
          </div>

          <VoiceInput onTranscription={handleVoice} />

          {parsedData && (
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="bg-green-50 p-4 rounded-xl border border-green-200">
               <h4 className="font-bold text-forest mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> समझ लिया (Detected):</h4>
               <p className="text-lg">Item: <strong>{parsedData.item}</strong></p>
               {parsedData.quantity && <p className="text-lg">मात्रा (Qty): <strong>{parsedData.quantity}</strong></p>}
               {parsedData.price && <p className="text-lg">भाव (Price): <strong>{parsedData.price}</strong></p>}
               <button className="w-full mt-4 bg-forest text-white py-3 rounded-lg font-bold hover:bg-forest-light">
                 पक्का करें (Confirm & List)
               </button>
            </motion.div>
          )}
          
          {transcriptions.length > 0 && !parsedData && (
             <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 italic opacity-80">
               "{transcriptions[0]}"
             </div>
          )}
        </div>

        {/* Existing Active Orders */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold font-display flex items-center gap-2">
             <TrendingUp className="text-forest"/> ताज़ा ऑर्डर (Active Orders)
           </h3>
           
           {[1, 2].map((i) => (
             <div key={i} className="bg-white p-5 rounded-xl border-l-4 border-wheat shadow-sm">
               <div className="flex justify-between items-start mb-2">
                 <h4 className="font-bold text-lg">2 kg Guava</h4>
                 <span className="font-mono bg-cream-dark text-text-primary px-2 py-1 rounded text-sm tracking-wider font-bold border border-wheat">#A8F2K{i}</span>
               </div>
               <p className="text-text-secondary text-sm mb-3">Student: Aryan | Phone: 9876543***</p>
               <div className="flex gap-2">
                 <button className="flex-1 bg-wheat text-text-primary py-2 rounded-lg text-sm font-bold border border-[#b6895c] hover:bg-[#b6895c]">UPI Confirm</button>
                 <button className="flex-1 bg-gray-100 text-text-secondary py-2 rounded-lg text-sm font-bold">Cancel</button>
               </div>
             </div>
           ))}

           <div className="bg-warning/20 p-4 rounded-xl text-sm flex gap-2 text-warning-dark border border-warning">
             <AlertCircle className="w-5 h-5 shrink-0"/>
             <p>Agro-Bridge Policy: Payment must be fully confirmed directly to your Bank A/C via UPI before pickup. Do not hand over harvest without Token Validation.</p>
           </div>
        </div>

      </div>
    </div>
  );
};
