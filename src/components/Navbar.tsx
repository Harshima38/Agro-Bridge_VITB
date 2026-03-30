import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sprout, UserCircle, LogOut, Home, Leaf, HeartHandshake } from 'lucide-react';

export const Navbar = () => {
  const { user, loginAs, logout } = useAuth();

  return (
    <nav className="bg-forest text-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <NavLink to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide">
            <Sprout className="w-8 h-8 text-wheat" />
            <span className="hidden sm:inline">Agro-Bridge VITB</span>
          </NavLink>

          <div className="flex space-x-4 sm:space-x-8 text-sm font-medium items-center">
            <NavLink to="/impact" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors flex items-center gap-1"}>
               <HeartHandshake className="w-4 h-4"/> Impact
            </NavLink>
            
            {user?.role === 'student' && (
              <NavLink to="/student/dashboard" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
                Marketplace
              </NavLink>
            )}
            {user?.role === 'farmer' && (
              <NavLink to="/farmer/dashboard" className={({isActive}) => isActive ? "text-wheat" : "hover:text-wheat transition-colors"}>
                My Harvest (मेरी फसल)
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
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col items-end text-xs">
                  <span className="font-bold">{user.name}</span>
                  <span className="opacity-75">{user.role.toUpperCase()}</span>
                </div>
                <button onClick={logout} className="p-2 bg-terracotta hover:bg-terracotta-light rounded-full transition-colors" title="Logout">
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
