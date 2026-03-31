import React, { useState } from 'react';
import { Search, MapPin, Activity, CheckCircle2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { PriceChart } from '../components/PriceChart';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const MOCK_LISTINGS = [
  { id: '1', farmer: "Ramesh Singh", farmerId: "f_123", category: "fruits", village: "Kothri", name: "Fresh Guava (Amrood)", nameHi: "ताज़ा अमरूद", price: 40, mandiPrice: 60, days: 1, remaining: 25, img: "https://images.unsplash.com/photo-1553279768-865429fd4ef0?auto=format&fit=crop&w=800&q=80" },
  { id: '2', farmer: "Sunita Devi", farmerId: "f_456", category: "veg", village: "Amlaha", name: "Farm Tomatoes", nameHi: "खेत के टमाटर", price: 30, mandiPrice: 50, days: 0, remaining: 40, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
  { id: '3', farmer: "Sunita Devi", farmerId: "f_456", category: "veg", village: "Amlaha", name: "Fresh Spinich (Palak)", nameHi: "ताज़ा पालक", price: 15, mandiPrice: 25, days: 0, remaining: 10, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80" },
];

const CATEGORIES = [
  { id: 'all', icon: '🛒', en: 'All', hi: 'सभी' },
  { id: 'fruits', icon: '🍎', en: 'Fruits', hi: 'फल' },
  { id: 'veg', icon: '🥦', en: 'Vegetables', hi: 'सब्ज़ी' },
  { id: 'grains', icon: '🌾', en: 'Grains', hi: 'अनाज' },
];

export const StudentDashboard = () => {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('all');
  const navigate = useNavigate();
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const { lang, t } = useLanguage();
  const { user } = useAuth();

  return (
    <div className="py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 sticky top-16 z-10">
            <Search className="text-text-secondary w-6 h-6"/>
            <input 
              type="text" 
              placeholder={t('search_placeholder' as any) || "Search for Guava, Tomatoes..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg"
            />
          </div>

          {/* Categories (Horizontal Scroll) */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex-none px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-colors ${activeCat === cat.id ? 'bg-forest text-cream' : 'bg-white border border-gray-200 text-text-secondary hover:bg-cream-dark'}`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{lang === 'hi' ? cat.hi : cat.en}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20 md:pb-0">
            {MOCK_LISTINGS.filter(l => activeCat === 'all' || l.category === activeCat).map(l => {
              const cartItem = items.find(i => i.id === l.id);
              
              return (
              <div key={l.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <img src={l.img} className="w-full h-full object-cover" alt={l.name}/>
                  <div className="absolute top-2 right-2 bg-cream text-forest px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-forest-light"/> Harvested {l.days === 0 ? 'Today' : `${l.days} days ago`}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-xl mb-1">{l.name}</h3>
                  <div className="text-sm text-text-secondary mb-4 flex items-center gap-1">
                    <MapPin className="w-4 h-4"/> {l.farmer} • {l.village} Village
                  </div>
                  
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-2xl font-bold text-forest">₹{l.price}</span>
                      <span className="text-sm text-text-secondary">/kg</span>
                    </div>
                    <div className="text-right text-xs">
                       <span className="line-through text-terracotta">₹{l.mandiPrice}/kg at Mandi</span>
                       <p className="text-forest-light font-bold">You save ₹{l.mandiPrice - l.price}!</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div className="bg-wheat h-2 rounded-full" style={{width: `${(l.remaining/50)*100}%`}}></div>
                  </div>
                  <p className="text-xs text-center text-text-secondary mb-4">{l.remaining} kg remaining from harvest</p>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => navigate(`/product/${l.id}`)}
                      className="flex-1 border-2 border-forest text-forest font-bold py-3 rounded-xl hover:bg-forest/5 transition-colors"
                    >
                      View Details
                    </button>
                    
                    {cartItem ? (
                      <div className="bg-forest text-cream flex items-center justify-between px-3 py-3 rounded-xl shrink-0 w-32 font-bold shadow-md shadow-forest/20">
                        <button onClick={() => cartItem.quantityKg <= 0.5 ? removeFromCart(l.id) : updateQuantity(l.id, -0.5)} className="p-1 hover:bg-white/20 rounded">
                          <Minus className="w-4 h-4"/>
                        </button>
                        <span>{cartItem.quantityKg} kg</span>
                        <button onClick={() => updateQuantity(l.id, 0.5)} className="p-1 hover:bg-white/20 rounded">
                          <Plus className="w-4 h-4"/>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => addToCart({
                          id: l.id, farmerId: l.farmerId, farmerName: l.farmer, village: l.village, 
                          name: lang === 'hi' ? l.nameHi : l.name, pricePerKg: l.price, quantityKg: 0.5, image: l.img
                        })}
                        className="bg-wheat text-forest shrink-0 w-32 font-bold py-3 rounded-xl hover:brightness-95 transition-all flex items-center justify-center gap-1 border-b-4 border-forest/10"
                      >
                        <ShoppingCart className="w-4 h-4"/> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Aside ML Widget */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <div className="bg-cream-dark p-6 rounded-2xl border border-wheat/30">
            <h3 className="font-bold flex items-center gap-2 mb-4"><Activity className="w-5 h-5 text-forest" /> Market Insights</h3>
            <PriceChart />
            <p className="text-xs text-text-secondary mt-4 leading-relaxed">
              Price prediction using Polynomial Regression trained on Sehore Mandi historical data. Avoid overpaying!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
