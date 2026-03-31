import React, { useState } from 'react';
import { VoiceInput } from '../components/VoiceInput';
import { Package, TrendingUp, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const FarmerDashboard = () => {
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<any>(null);
  const [entryMode, setEntryMode] = useState<'voice' | 'manual'>('voice');
  const [manualForm, setManualForm] = useState({ name: '', qty: '', price: '' });

  const handleVoice = (text: string) => {
    setTranscriptions(prev => [text, ...prev]);
    
    // Natural Language Regex Parsing (Supports Hinglish & English)
    // Examples: "10 kilo tamatar 40 rupees", "10 kg tomato"
    let qtyMatch = text.match(/(\d+(?:\.\d+)?)\s*(kilo|kg)/i);
    let priceMatch = text.match(/(\d+)\s*(rupaye|rs|rupees|per|\/)/i); // Supports "40 rupees", "40 per kg"
    
    let quantity = qtyMatch ? qtyMatch[1] : '';
    let price = priceMatch ? priceMatch[1] : '';
    
    // Remove qty and price metrics from the raw text to isolate the crop name
    let item = text.replace(/(\d+(?:\.\d+)?)\s*(kilo|kg|rupaye|rs|rupees|per|\/)/gi, '').trim();
    if (!item || item.length < 2) item = text; // Fallback to raw string if regex strips too much

    // Capitalize first letter
    item = item.charAt(0).toUpperCase() + item.slice(1);

    setParsedData({ item, quantity, price });
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParsedData({ item: manualForm.name, quantity: manualForm.qty, price: manualForm.price });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8 px-4 md:px-0 pb-20">
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
        
        {/* Listing Addition Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-start justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <Package className="text-forest w-6 h-6 shrink-0"/>
              <h3 className="text-xl font-bold font-display">नया सामान जोड़ें</h3>
            </div>
            
            <div className="flex bg-cream-dark p-1 rounded-lg">
              <button 
                onClick={() => setEntryMode('voice')}
                className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${entryMode === 'voice' ? 'bg-forest text-white' : 'text-text-secondary hover:text-forest'}`}
              >
                Voice 🎙️
              </button>
              <button 
                onClick={() => setEntryMode('manual')}
                className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${entryMode === 'manual' ? 'bg-forest text-white' : 'text-text-secondary hover:text-forest'}`}
              >
                Type ⌨️
              </button>
            </div>
          </div>

          {entryMode === 'voice' ? (
            <>
              <p className="text-text-secondary text-sm text-center">माइक्रोफ़ोन दबाएं और बोलें</p>
              <VoiceInput onTranscription={handleVoice} />

              {transcriptions.length > 0 && !parsedData && (
                 <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 italic opacity-80">
                   "{transcriptions[0]}"
                 </div>
              )}
            </>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-text-secondary mb-1">Produce Name (सामान का नाम) *</label>
                <input required type="text" value={manualForm.name} onChange={e => setManualForm({...manualForm, name: e.target.value})} className="w-full bg-cream-dark border border-gray-200 rounded-lg p-3 outline-forest" placeholder="e.g. Tomato" />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-text-secondary mb-1">Prc/kg (भाव ₹) *</label>
                  <input required type="number" value={manualForm.price} onChange={e => setManualForm({...manualForm, price: e.target.value})} className="w-full bg-cream-dark border border-gray-200 rounded-lg p-3 outline-forest" placeholder="₹" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-bold text-text-secondary mb-1">Total kg (मात्रा) *</label>
                  <input required type="number" value={manualForm.qty} onChange={e => setManualForm({...manualForm, qty: e.target.value})} className="w-full bg-cream-dark border border-gray-200 rounded-lg p-3 outline-forest" placeholder="kg" />
                </div>
              </div>
              <button type="submit" className="w-full bg-wheat text-forest border-2 border-forest font-bold py-3 rounded-xl hover:brightness-95">Preview Listing</button>
            </form>
          )}

          {parsedData && (
            <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="bg-green-50 p-4 rounded-xl border border-green-200 relative mt-4">
               <button onClick={() => setParsedData(null)} className="absolute top-2 right-2 text-text-secondary text-sm underline">Clear</button>
               <h4 className="font-bold text-forest mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> समझ लिया (Detected):</h4>
               <p className="text-lg">Item: <strong>{parsedData.item}</strong></p>
               {parsedData.quantity && <p className="text-lg">मात्रा (Qty): <strong>{parsedData.quantity} kg</strong></p>}
               {parsedData.price && <p className="text-lg">भाव (Price): <strong>₹{parsedData.price}/kg</strong></p>}
               <button onClick={() => { setParsedData(null); setManualForm({name: '', qty: '', price: ''}); alert('Successfully listed!'); }} className="w-full mt-4 bg-forest text-white py-3 rounded-lg font-bold hover:bg-forest-light transition-colors">
                 पक्का करें (Confirm & List)
               </button>
            </motion.div>
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
