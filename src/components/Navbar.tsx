import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { Sprout, UserCircle, LogOut, Home, Leaf, HeartHandshake, Globe, ShoppingCart, Bell } from 'lucide-react';

export const Navbar = () => {
  const { user, loginAs, logout } = useAuth();
  const { lang, setLang, t } = useLanguage();
  const { items } = useCart();

  return (
    <nav className="bg-forest text-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide">
            <Sprout className="w-8 h-8 text-wheat" />
            <span className="hidden sm:inline">Agro-Bridge VITB</span>
          </NavLink>

          <div className="flex space-x-4 sm:space-x-8 text-sm font-medium items-center">
            <NavLink to="/" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
              {lang === 'hi' ? 'होम' : 'Home'}
            </NavLink>
            <NavLink to="/impact" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors flex items-center gap-1"}>
               <HeartHandshake className="w-4 h-4"/> Impact
            </NavLink>
            
            {user?.role === 'student' && (
              <NavLink to="/student/dashboard" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
                {t('nav_market' as any)}
              </NavLink>
            )}
            {user?.role === 'student' && (
              <NavLink to="/orders" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
                {t('nav_orders' as any)}
              </NavLink>
            )}
            {user?.role === 'farmer' && (
              <NavLink to="/farmer/dashboard" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
                {t('nav_harvest' as any)}
              </NavLink>
            )}
            {user?.role === 'farmer' && (
              <NavLink to="/earnings" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
                {t('nav_earnings' as any)}
              </NavLink>
            )}

            {!user ? (
              <div className="flex items-center bg-forest-light px-2 py-1 rounded-lg">
                <span className="text-xs mr-2 opacity-80">Mock Login:</span>
                <select 
                  className="bg-transparent outline-none cursor-pointer font-bold text-cream"
                  onChange={(e) => loginAs(e.target.value as any)}
                  defaultValue=""
                >
                  <option value="" disabled className="text-black">Select Role...</option>
                  <option value="student" className="text-black">Student (VIT)</option>
                  <option value="farmer" className="text-black">Farmer (Kisan)</option>
                  <option value="admin" className="text-black">Admin</option>
                </select>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                
                {/* Utilities */}
                {user.role === 'student' && (
                  <NavLink to="/cart" className="relative text-cream hover:text-white transition-colors">
                    <ShoppingCart className="w-5 h-5"/>
                    {items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-terracotta text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {items.length}
                      </span>
                    )}
                  </NavLink>
                )}

                <button className="text-cream hover:text-white relative transition-colors hidden sm:block">
                  <Bell className="w-5 h-5"/>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-terracotta rounded-full"></span>
                </button>

                <button 
                  onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                  className="flex items-center gap-1 text-sm font-bold text-wheat hover:text-white transition-colors border border-wheat/30 px-2 py-1 rounded-md"
                  title="Toggle Language"
                >
                  <Globe className="w-4 h-4"/>
                  <span className="uppercase">{lang}</span>
                </button>

                {/* Profile */}
                <div className="hidden sm:flex flex-col items-end text-xs pl-2 border-l border-forest-light">
                  <span className="font-bold">{user.name}</span>
                  <span className="opacity-75">{user.role.toUpperCase()}</span>
                </div>
                <button onClick={logout} className="p-2 bg-terracotta hover:bg-terracotta-light rounded-full transition-colors ml-2" title="Logout">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
