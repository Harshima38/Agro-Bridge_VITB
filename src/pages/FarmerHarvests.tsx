import React, { useState } from 'react';
import { PlusCircle, Search, Edit3, Archive, Activity, IndianRupee } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FarmerHarvests = () => {
  const { lang, t } = useLanguage();
  
  const mockHarvests = [
    { title: lang === 'hi' ? 'ताज़ा अमरूद' : 'Fresh Guava', price: 40, stock: 25, views: 180, orders: 12, exp: '2 days' },
    { title: lang === 'hi' ? 'कच्चा पपीता' : 'Raw Papaya', price: 20, stock: 50, views: 65, orders: 4, exp: '1 day' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-forest">
            {t('nav_harvest' as any) || 'My Active Harvests'}
          </h1>
          <p className="text-text-secondary mt-1">Manage your inventory and update pricing.</p>
        </div>
        
        <button className="bg-forest text-cream font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-forest-light transition-all flex items-center gap-2">
          <PlusCircle className="w-5 h-5"/>
          {lang === 'hi' ? 'नई फ़सल जोड़ें' : 'Add New Listing'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockHarvests.map((h, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl">{h.title}</h3>
                <span className="bg-wheat text-forest text-xs font-bold px-3 py-1 rounded-full">Expires in {h.exp}</span>
              </div>
              
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-xs text-text-secondary">Current Price</p>
                  <p className="text-2xl font-bold text-forest flex items-center"><IndianRupee className="w-5 h-5"/>{h.price}/kg</p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary">Stock Remaining</p>
                  <p className="text-lg font-bold">{h.stock} kg</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span className="flex items-center gap-1"><Activity className="w-4 h-4"/> {h.views} views</span>
                <span>•</span>
                <span>{h.orders} orders</span>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-forest border border-forest rounded-lg hover:bg-forest/5"><Edit3 className="w-4 h-4"/></button>
                <button className="p-2 text-terracotta border border-terracotta rounded-lg hover:bg-terracotta/5"><Archive className="w-4 h-4"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
