import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, MapPin, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { loginAs } = useAuth();

  const handleRoleSelect = (role: 'student' | 'farmer') => {
    loginAs(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="space-y-20 py-10">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto px-4">
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="inline-block bg-forest-light/10 text-forest-light px-4 py-2 rounded-full font-medium text-sm">
          📍 Serving VIT Bhopal directly from Sehore farmers
        </motion.div>
        
        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="text-5xl md:text-7xl font-bold font-display text-text-primary">
          Farm-Fresh to Your Hostel. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-forest-light">Zero Middlemen.</span>
        </motion.h1>
        
        <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-xl text-text-secondary">
          100% of your payment goes directly to the farmer. Order fresh, seasonal harvest from nearby villages today.
        </motion.p>
        
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="flex justify-center gap-4 pt-4">
          <button onClick={() => handleRoleSelect('student')} className="bg-forest text-cream px-8 py-4 rounded-xl font-bold hover:bg-forest-light transition-colors text-lg flex items-center gap-2 shadow-lg shadow-forest/20">
            I'm a Student
          </button>
          <button onClick={() => handleRoleSelect('farmer')} className="bg-wheat text-text-primary px-8 py-4 rounded-xl font-bold hover:brightness-95 transition-all text-lg border border-wheat border-b-4">
            I'm a Farmer (मैं किसान हूँ)
          </button>
        </motion.div>
      </section>

      {/* Visual Workflow */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-forest to-wheat -translate-y-1/2 z-0 opacity-20"></div>
          
          <div onClick={() => handleRoleSelect('farmer')} className="bg-cream p-8 rounded-2xl relative z-10 border border-cream-dark cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-forest rounded-full flex items-center justify-center text-cream mx-auto mb-4">
              <Leaf className="w-8 h-8"/>
            </div>
            <h3 className="text-xl font-bold mb-2">1. Farmer Lists</h3>
            <p className="text-text-secondary">JIT Harvest listed before picking</p>
          </div>
          
          <div onClick={() => handleRoleSelect('student')} className="bg-cream p-8 rounded-2xl relative z-10 border border-cream-dark cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-wheat rounded-full flex items-center justify-center text-text-primary mx-auto mb-4">
              <ArrowRight className="w-8 h-8"/>
            </div>
            <h3 className="text-xl font-bold mb-2">2. Direct Payment</h3>
            <p className="text-text-secondary">Pay directly to Farmer UPI (0% Commission)</p>
          </div>

          <div onClick={() => handleRoleSelect('student')} className="bg-cream p-8 rounded-2xl relative z-10 border border-cream-dark cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-terracotta rounded-full flex items-center justify-center text-cream mx-auto mb-4">
              <Truck className="w-8 h-8"/>
            </div>
            <h3 className="text-xl font-bold mb-2">3. VIT Pickup</h3>
            <p className="text-text-secondary">Farmer drops at VIT Main Gate</p>
          </div>
        </div>
      </section>

      {/* Farmer Story Spotlight */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-forest text-cream rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <Leaf className="w-96 h-96"/>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=400&h=400" 
            alt="Farmer Ramesh" 
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-wheat shadow-2xl relative z-10"
          />
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl font-display font-bold mb-2 text-wheat">Ramesh from Kothri Village</h2>
            <div className="flex items-center justify-center md:justify-start gap-1 text-cream/80 mb-6 font-medium">
              <MapPin className="w-4 h-4"/> 4km away from VIT Bhopal
            </div>
            <p className="text-lg leading-relaxed text-cream/90 italic">
              "Before Agro-Bridge, I sold my Guavas at Sehore Mandi for ₹15/kg. Transport cost took half of it. Now, I sell directly to VIT students for ₹30/kg. They get it cheaper, and my daughter's school fees are paid instantly via phone."
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
