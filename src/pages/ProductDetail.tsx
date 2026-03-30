import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Leaf, Award, ArrowRight, ShieldCheck, MapPin, Search } from 'lucide-react';
import { PriceChart } from '../components/PriceChart';
import { generateOrderToken } from '../utils/token-generator';
import { useAuth } from '../context/AuthContext';

// Mock product details
const MOCK_PRODUCT = {
  id: 'product_123',
  name: 'Farm Fresh Tomatoes (Tamatar)',
  farmerName: 'Ramesh Singh',
  village: 'Kothri Village, Sehore',
  trustScore: 4.8,
  farmerStory: "Growing vegetables organically for 20 years. My daughter is studying Computer Science at VIT Bhopal, and this direct platform helps me pay her fees instantly without Mandi commission.",
  price: 30,
  mandiPrice: 50,
  availableKg: 40,
  minimumOrder: 1,
  harvestDate: 'Tomorrow Morning JIT',
  images: [
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80'
  ]
};

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [quantity, setQuantity] = useState(MOCK_PRODUCT.minimumOrder);
  const total = quantity * MOCK_PRODUCT.price;
  const savings = quantity * (MOCK_PRODUCT.mandiPrice - MOCK_PRODUCT.price);

  const handlePreOrder = async () => {
    if (!user) {
      alert("Please login as a Student first from the Top Navigation menu!");
      return;
    }
    
    // Generate Secure cryptographic Token Token
    const { shortToken, fullToken } = await generateOrderToken({
      orderId: 'ORD_' + Date.now(),
      studentId: user.id,
      farmerId: 'f_123', // Mock farmer ID
      listingId: MOCK_PRODUCT.id,
      quantity: quantity,
      totalPrice: total,
      timestamp: Date.now()
    });

    // Navigate to confirmation
    navigate(`/order/${shortToken}`, { 
      state: { 
        listing: {
          name: MOCK_PRODUCT.name,
          price: total,
          farmer: MOCK_PRODUCT.farmerName
        }, 
        fullToken 
      } 
    });
  };

  return (
    <div className="py-8 max-w-6xl mx-auto space-y-8 px-4">
      
      {/* Top Banner mapping breadcrumbs */}
      <div className="text-sm text-text-secondary flex items-center gap-2">
        <span className="hover:text-forest cursor-pointer" onClick={() => navigate('/student/dashboard')}>Marketplace</span>
        <ArrowRight className="w-4 h-4" />
        <span className="font-bold text-text-primary">{MOCK_PRODUCT.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Col: Images & Chart */}
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden h-[400px] border border-gray-100 shadow-sm relative">
            <img src={MOCK_PRODUCT.images[0]} className="w-full h-full object-cover" alt="Product" />
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-forest font-bold shadow-md flex items-center gap-2">
              <Leaf className="w-5 h-5"/> JIT Harvest
            </div>
          </div>
          <div className="bg-cream-dark p-6 rounded-3xl border border-wheat">
             <h3 className="font-bold font-display flex items-center gap-2 mb-4">
               <Search className="text-forest"/> AI Price Predictor
             </h3>
             <PriceChart />
          </div>
        </div>

        {/* Right Col: Details & Checkout */}
        <div className="space-y-8">
          
          <div className="space-y-4 border-b border-gray-100 pb-8">
            <h1 className="text-4xl font-display font-bold text-forest">{MOCK_PRODUCT.name}</h1>
            
            <div className="flex items-center gap-4 text-text-secondary">
               <span className="flex items-center gap-1"><MapPin className="w-5 h-5"/> {MOCK_PRODUCT.village}</span>
               <span className="flex items-center gap-1 bg-green-50 text-forest px-2 py-1 rounded-lg font-bold"><Award className="w-4 h-4"/> {MOCK_PRODUCT.trustScore}/5 Rating</span>
            </div>

            <div className="flex items-end gap-3 mt-4">
              <span className="text-5xl font-bold font-display text-forest">₹{MOCK_PRODUCT.price}</span>
              <span className="text-text-secondary pb-1">/ kg</span>
            </div>
            
            <div className="bg-terracotta/10 text-terracotta-light border border-terracotta/20 px-4 py-3 rounded-xl inline-block mt-2">
               <strong>Agro-Bridge Impact:</strong> Mandi price is ₹{MOCK_PRODUCT.mandiPrice}/kg. <br/>
               Student saves ₹{MOCK_PRODUCT.mandiPrice - MOCK_PRODUCT.price}/kg. Farmer earns 100% of ₹{MOCK_PRODUCT.price}.
            </div>
          </div>

          <div className="bg-forest text-cream p-6 rounded-3xl shadow-xl flex items-center gap-6">
            <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=200&h=200" alt="Farmer Ramesh" className="w-24 h-24 rounded-full border-2 border-wheat object-cover"/>
            <div>
              <h3 className="font-bold font-display text-xl text-wheat mb-2">{MOCK_PRODUCT.farmerName}'s Story</h3>
              <p className="opacity-90 leading-relaxed text-sm italic">"{MOCK_PRODUCT.farmerStory}"</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
             <div className="flex justify-between items-center">
               <span className="font-bold text-lg">Quantity (kg)</span>
               <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-cream hover:bg-wheat transition-colors font-bold text-xl flex items-center justify-center">-</button>
                 <span className="text-2xl font-bold tabular-nums w-8 text-center">{quantity}</span>
                 <button 
                  onClick={() => setQuantity(Math.min(MOCK_PRODUCT.availableKg, quantity + 1))}
                  className="w-10 h-10 rounded-full bg-cream hover:bg-wheat transition-colors font-bold text-xl flex items-center justify-center">+</button>
               </div>
             </div>
             
             <div className="flex justify-between items-center pt-4 border-t border-gray-100">
               <div>
                 <span className="text-text-secondary">Total Price</span>
                 <h2 className="text-3xl font-bold font-display text-forest mt-1">₹{total}</h2>
               </div>
               <div className="text-right">
                 <span className="text-text-secondary">Expected Savings</span>
                 <p className="text-terracotta font-bold text-lg mt-1">₹{savings}</p>
               </div>
             </div>

             <button 
               onClick={handlePreOrder}
               className="w-full bg-forest text-cream font-bold text-xl py-5 rounded-2xl hover:bg-forest-light transition-all shadow-[0_10px_20px_-10px_rgba(45,106,79,0.5)] flex items-center justify-center gap-2"
             >
               <ShieldCheck className="w-6 h-6"/>
               Pre-Order & Generate Token
             </button>
             <p className="text-center text-xs text-text-secondary">Payment is 100% Direct to Farmer via UPI at pickup based on Token.</p>
          </div>

        </div>
      </div>
    </div>
  );
};
