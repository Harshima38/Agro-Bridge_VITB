import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CartPage = () => {
  const { itemsByFarmer, removeFromCart, updateQuantity, totalItems } = useCart();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const farmers = Object.keys(itemsByFarmer);

  if (farmers.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center px-4">
         <div className="w-32 h-32 bg-cream-dark rounded-full flex items-center justify-center mb-6">
           <ShoppingBag className="w-16 h-16 text-forest/30" />
         </div>
         <h2 className="text-3xl font-display font-bold text-forest mb-2">{t('cart_empty' as any) || 'Your cart is empty'}</h2>
         <p className="text-text-secondary mb-8">Add farm-fresh items to your basket and pay 0% platform commission.</p>
         <button onClick={() => navigate('/student/dashboard')} className="bg-forest text-cream px-8 py-3 rounded-xl font-bold hover:bg-forest-light">
           Browse Harvests
         </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 pb-24">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-cream-dark rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-forest" />
        </button>
        <h1 className="text-3xl font-display font-bold text-forest cursor-pointer">Your Cart</h1>
        <span className="bg-wheat text-forest font-bold px-3 py-1 rounded-full text-sm">
          {totalItems} items
        </span>
      </div>

      <div className="space-y-8">
        {farmers.map(farmerId => {
          const cartItems = itemsByFarmer[farmerId];
          const farmerName = cartItems[0].farmerName;
          const village = cartItems[0].village;
          const subtotal = cartItems.reduce((acc, item) => acc + (item.pricePerKg * item.quantityKg), 0);

          return (
            <div key={farmerId} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
               {/* Farmer Group Header */}
               <div className="bg-cream-dark px-6 py-4 flex items-center justify-between border-b border-cream">
                  <div>
                    <h3 className="font-bold text-lg text-forest">{farmerName}</h3>
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      <MapPin className="w-3 h-3"/> {village}
                    </p>
                  </div>
                  <ShieldCheck className="w-6 h-6 text-forest opacity-50"/>
               </div>

               {/* Items List */}
               <div className="p-6 space-y-6">
                 {cartItems.map(item => (
                   <div key={item.id} className="flex gap-4 items-center">
                     <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl bg-gray-100" />
                     <div className="flex-1">
                       <h4 className="font-bold text-text-primary">{item.name}</h4>
                       <span className="text-sm font-bold text-forest">₹{item.pricePerKg}/kg</span>
                     </div>
                     
                     <div className="flex items-center gap-4">
                       <span className="font-bold bg-cream px-3 py-1 rounded-lg text-sm">{item.quantityKg} kg</span>
                       <span className="font-bold w-12 text-right">₹{item.pricePerKg * item.quantityKg}</span>
                       <button onClick={() => removeFromCart(item.id)} className="text-terracotta hover:bg-red-50 p-2 rounded-full transition-colors text-sm">
                         <Trash2 className="w-4 h-4"/>
                       </button>
                     </div>
                   </div>
                 ))}
               </div>

               {/* Checkout Action */}
               <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                 <div>
                   <p className="text-sm text-text-secondary">Subtotal for {farmerName}</p>
                   <p className="text-2xl font-bold text-forest">₹{subtotal}</p>
                 </div>
                 <button className="w-full sm:w-auto bg-forest text-cream font-bold px-8 py-3 rounded-xl hover:bg-forest-light transition-colors shadow-lg shadow-forest/20 flex flex-col items-center">
                   <span>{t('checkout_btn' as any) || 'Proceed to Pay'}</span>
                 </button>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
