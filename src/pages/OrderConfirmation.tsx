import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ShieldCheck, CalendarClock, Smartphone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const OrderConfirmation = () => {
  const { token } = useParams<{ token: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as any;

  if (!state?.listing) {
    return <div className="text-center p-20">No order context found. Start over.</div>;
  }

  const { listing } = state;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">
        
        {/* Token Header */}
        <div className="bg-forest text-cream -mx-8 -mt-8 px-8 py-10 mb-8 rounded-t-[2rem] text-center">
           <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-wheat opacity-90"/>
           <h1 className="text-3xl font-display font-bold mb-2">Order Secured</h1>
           <p className="opacity-90 mb-6">Present this unique token to the farmer at pickup.</p>
           <motion.div initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} className="inline-block bg-white text-forest font-mono text-4xl font-bold px-8 py-4 rounded-2xl tracking-widest shadow-lg">
             {token}
           </motion.div>
        </div>

        {/* Order Details */}
        <div className="space-y-6 px-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <div>
              <p className="text-sm text-text-secondary">Item</p>
              <h3 className="text-lg font-bold">{listing.name} (1 kg)</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Total Price</p>
              <h3 className="text-2xl font-bold text-forest">₹{listing.price}</h3>
            </div>
          </div>

          <div className="flex gap-4 border-b border-gray-100 pb-4">
             <div className="w-12 h-12 bg-cream-dark rounded-full flex items-center justify-center shrink-0">
               <MapPin className="text-terracotta"/>
             </div>
             <div>
               <h4 className="font-bold text-gray-800">Pickup Location</h4>
               <p className="text-text-secondary">VIT Bhopal Main Gate</p>
               <p className="text-sm text-forest-light mt-1 flex items-center gap-1"><CalendarClock className="w-4 h-4"/> Today, 5:30 PM</p>
             </div>
          </div>

          {/* Payment Section (Crucial requirement) */}
          <div className="bg-cream p-6 rounded-2xl border border-wheat border-dashed">
            <h4 className="font-bold text-lg mb-1 flex items-center gap-2"><Smartphone/> 100% Direct to Farmer</h4>
            <p className="text-sm text-text-secondary mb-4">
              Agro-Bridge takes zero commission. Scan or click to pay Ramesh directly via UPI.
            </p>
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4 font-mono font-medium text-lg">
              ramesh.vitb@upi
            </div>
            <a 
              href={`upi://pay?pa=ramesh.vitb@upi&pn=${encodeURIComponent(listing.farmer)}&am=${listing.price}&tn=AgroBridge-${token}`}
              className="w-full block text-center bg-forest hover:bg-forest-light transition-colors text-white py-4 rounded-xl font-bold shadow-md"
            >
              Open UPI App to Pay ₹{listing.price}
            </a>
          </div>

          <button onClick={() => navigate('/student/dashboard')} className="w-full py-4 text-text-secondary font-bold hover:text-text-primary transition-colors">
            Back to Marketplace
          </button>
        </div>

      </div>
    </div>
  );
};
