import React from 'react';
import { Leaf, Award, DollarSign, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const ImpactDashboard = () => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-forest">Our Impact Metrics</h1>
        <p className="text-lg text-text-secondary">Track the real-time social, environmental, and economic impact of the Agro-Bridge platform across Sehore District.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-forest text-cream p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20"><DollarSign className="w-40 h-40"/></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold font-display opacity-90">Micro-Economies Built</h3>
            <p className="text-5xl font-bold tabular-nums">₹1.2M</p>
            <p className="text-sm opacity-80">+28% extra income generated for 142 farmers compared to Mandi rates.</p>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="bg-wheat text-text-primary p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20"><Leaf className="w-40 h-40"/></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold font-display opacity-90">Food Miles Saved</h3>
            <p className="text-5xl font-bold tabular-nums">42k <span className="text-2xl font-normal">km</span></p>
            <p className="text-sm opacity-80 mt-2">Bypassing wholesale transport reduces emissions significantly.</p>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="bg-terracotta text-cream p-8 rounded-[2rem] shadow-xl relative overflow-hidden border border-terracotta-light">
          <div className="absolute -right-6 -bottom-6 opacity-20"><Award className="w-40 h-40"/></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold font-display opacity-90">Zero Plastic Pledges</h3>
            <p className="text-5xl font-bold tabular-nums">98%</p>
            <p className="text-sm opacity-80 mt-2">Orders fulfilled using student-owned or biodegradable containers.</p>
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="bg-cream-dark text-text-primary p-8 rounded-[2rem] shadow-xl relative overflow-hidden border border-wheat">
          <div className="absolute -right-6 -bottom-6 text-forest opacity-10"><TrendingDown className="w-40 h-40"/></div>
          <div className="relative z-10 space-y-4">
            <h3 className="text-xl font-bold font-display text-forest opacity-90">Student Savings</h3>
            <p className="text-5xl font-bold tabular-nums text-forest-light">₹48k</p>
            <p className="text-sm text-text-secondary mt-2">Total money saved by VIT Bhopal students compared to retail outlets.</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
