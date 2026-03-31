import React, { useState } from 'react';
import { Package, Clock, ShieldCheck, MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export const OrdersPage = () => {
  const { user } = useAuth();
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'active' | 'past'>('active');

  // Hardcoded mock order for demonstration
  const mockOrder = {
    id: '#A8F2K1',
    product: lang === 'hi' ? 'ताज़ा अमरूद' : 'Fresh Guava',
    farmer: 'Ramesh Singh',
    quantity: '2.5',
    price: '100',
    date: 'Mar 29',
    statusStep: 3, // 1: Placed, 2: Paid, 3: Harvesting, 4: Ready, 5: Completed
  };

  const isFarmer = user?.role === 'farmer';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-24">
      <h1 className="text-3xl font-display font-bold text-forest mb-6">
        {t('nav_orders' as any) || 'My Orders'}
      </h1>

      <div className="flex gap-4 border-b border-cream-dark mb-8">
        <button 
          onClick={() => setActiveTab('active')}
          className={`pb-4 font-bold transition-all ${activeTab === 'active' ? 'text-forest border-b-2 border-forest' : 'text-text-secondary hover:text-forest'}`}
        >
          {lang === 'hi' ? 'सक्रिय ऑर्डर' : 'Active Orders'}
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`pb-4 font-bold transition-all ${activeTab === 'past' ? 'text-forest border-b-2 border-forest' : 'text-text-secondary hover:text-forest'}`}
        >
          {lang === 'hi' ? 'पिछले ऑर्डर' : 'Past Orders'}
        </button>
      </div>

      {activeTab === 'active' ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
          
          {/* Order Details */}
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-forest-light/20 text-forest px-3 py-1 rounded-full text-xs font-bold mb-2 inline-block">Order {mockOrder.id}</span>
                <h3 className="font-display font-bold text-2xl">{mockOrder.product} <span className="text-text-secondary font-medium text-lg">x {mockOrder.quantity} kg</span></h3>
                <p className="text-text-secondary flex items-center gap-1 mt-1">
                  {isFarmer ? <UserIcon /> : <FarmerIcon />} 
                  {isFarmer ? 'Student: Aryan Sharma' : `Farmer: ${mockOrder.farmer}`}
                </p>
              </div>
              <div className="text-right">
                <span className="block text-2xl font-bold text-forest">₹{mockOrder.price}</span>
                <span className="text-xs text-text-secondary">Fully Paid (0% Commission)</span>
              </div>
            </div>

            <div className="bg-cream-dark p-4 rounded-xl flex items-center justify-between border border-wheat/30">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-forest" />
                 <span className="font-bold text-sm text-forest">Verification Token: <span className="bg-white px-2 py-1 rounded border border-forest/20">F2K1</span></span>
               </div>
               {!isFarmer && <button className="text-sm font-bold text-terracotta underline">Cancel</button>}
            </div>
          </div>

          {/* Vertical Tracking Timeline */}
          <div className="w-full md:w-64 shrink-0 bg-gray-50 p-6 rounded-xl border border-gray-100 relative">
             <h4 className="font-bold mb-6 flex items-center gap-2"><Clock className="w-4 h-4 text-forest"/> Tracking Timeline</h4>
             
             <div className="space-y-6 relative">
               <div className="absolute left-3 top-2 bottom-6 w-0.5 bg-gray-300"></div>

               <TimelineStep done={mockOrder.statusStep >= 1} title="Order Placed" time="10:30 AM" />
               <TimelineStep done={mockOrder.statusStep >= 2} title="Payment Sent (UPI)" time="10:32 AM" />
               <TimelineStep done={mockOrder.statusStep >= 3} title="Harvesting..." time="Est: 2:00 PM" active={mockOrder.statusStep === 3} />
               <TimelineStep done={mockOrder.statusStep >= 4} title="Ready for Pickup" time="Pending" />
             </div>

             <button className="mt-8 w-full bg-forest text-cream font-bold py-3 rounded-xl shadow-md hover:bg-forest-light transition-colors">
               Get Directions
             </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 text-text-secondary">
          <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No past orders yet. Start ordering farm-fresh produce today!</p>
        </div>
      )}
    </div>
  );
};

const TimelineStep = ({ done, title, time, active }: { done: boolean, title: string, time: string, active?: boolean }) => (
  <div className="flex gap-4 relative z-10">
    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-forest text-white' : 'bg-gray-200 text-transparent border-2 border-white'}`}>
      {done && <CheckCircle2 className="w-4 h-4"/>}
    </div>
    <div className="-mt-1">
      <p className={`font-bold text-sm ${active ? 'text-forest' : done ? 'text-text-primary' : 'text-gray-400'}`}>{title}</p>
      <p className="text-xs text-text-secondary">{time}</p>
    </div>
  </div>
);

const FarmerIcon = () => <MapPin className="w-4 h-4" />;
const UserIcon = () => <Truck className="w-4 h-4" />;
