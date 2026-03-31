import React from 'react';
import { Home, Search, ShoppingCart, ClipboardList, User, PlusCircle, IndianRupee } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const BottomNav = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { items } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null; // Only show bottom nav for logged in users

  const isActive = (path: string) => location.pathname.includes(path) ? "text-forest" : "text-text-secondary hover:text-forest";

  if (user.role === 'student') {
    return (
      <div className="md:hidden fixed bottom-0 w-full bg-cream border-t border-cream-dark z-50 flex justify-around items-center py-3 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button onClick={() => navigate('/student/dashboard')} className={`flex flex-col items-center gap-1 ${isActive('/dashboard')}`}>
          <Home className="w-6 h-6"/>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-forest">
          <Search className="w-6 h-6"/>
          <span className="text-[10px] font-bold">Browse</span>
        </button>
        <button onClick={() => navigate('/cart')} className={`flex flex-col items-center gap-1 relative ${isActive('/cart')}`}>
          <ShoppingCart className="w-6 h-6"/>
          {items.length > 0 && <span className="absolute -top-1 -right-2 bg-terracotta text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{items.length}</span>}
          <span className="text-[10px] font-bold">{t('nav_cart' as any) || 'Cart'}</span>
        </button>
        <button onClick={() => navigate('/orders')} className={`flex flex-col items-center gap-1 ${isActive('/orders')}`}>
          <ClipboardList className="w-6 h-6"/>
          <span className="text-[10px] font-bold">{t('nav_orders')}</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-forest">
          <User className="w-6 h-6"/>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </div>
    );
  }

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-cream border-t border-cream-dark z-50 flex justify-around items-center py-3 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button onClick={() => navigate('/farmer/dashboard')} className={`flex flex-col items-center gap-1 ${isActive('/dashboard')}`}>
        <Home className="w-6 h-6"/>
        <span className="text-[10px] font-bold">Home</span>
      </button>
      <button onClick={() => navigate('/farmer/harvests')} className="flex flex-col items-center gap-1 text-text-secondary hover:text-forest">
        <PlusCircle className="w-6 h-6"/>
        <span className="text-[10px] font-bold">Add</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-forest">
        <ClipboardList className="w-6 h-6"/>
        <span className="text-[10px] font-bold">{t('nav_orders')}</span>
      </button>
      <button className={`flex flex-col items-center gap-1 ${isActive('/earnings')}`}>
        <IndianRupee className="w-6 h-6"/>
        <span className="text-[10px] font-bold">{t('nav_earnings')}</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-text-secondary hover:text-forest">
        <User className="w-6 h-6"/>
        <span className="text-[10px] font-bold">Profile</span>
      </button>
    </div>
  );
};
