import React, { useState } from 'react';
import { Search, MapPin, Activity, CheckCircle2 } from 'lucide-react';
import { PriceChart } from '../components/PriceChart';
import { generateOrderToken } from '../utils/token-generator';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MOCK_LISTINGS = [
  { id: '1', farmer: "Ramesh Singh", village: "Kothri", name: "Fresh Guava (Amrood)", price: 40, mandiPrice: 60, days: 1, remaining: 25, img: "https://images.unsplash.com/photo-1553279768-865429fd4ef0?auto=format&fit=crop&w=800&q=80" },
  { id: '2', farmer: "Sunita Devi", village: "Amlaha", name: "Farm Tomatoes", price: 30, mandiPrice: 50, days: 0, remaining: 40, img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80" },
];

export const StudentDashboard = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
        <div className="flex-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <Search className="text-text-secondary"/>
            <input 
              type="text" 
              placeholder="Search farm fresh produce (e.g. Guava, Tomatoes)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-lg"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MOCK_LISTINGS.map(l => (
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

                  <button 
                    onClick={() => navigate(`/product/${l.id}`)}
                    className="w-full bg-forest text-white font-bold py-3 rounded-xl hover:bg-forest-light transition-colors"
                  >
                    View Harvest Details
                  </button>
                </div>
              </div>
            ))}
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
