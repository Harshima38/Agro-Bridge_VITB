import React from 'react';
import { IndianRupee, TrendingUp, Download, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const FarmerEarnings = () => {
  const { lang, t } = useLanguage();
  
  const mockEarnings = [
    { week: 'W1', earnings: 4500 },
    { week: 'W2', earnings: 5200 },
    { week: 'W3', earnings: 3800 },
    { week: 'W4', earnings: 6100 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold text-forest">
          {t('nav_earnings' as any) || 'My Earnings'}
        </h1>
        <button className="text-forest flex items-center gap-1 font-bold bg-cream px-4 py-2 rounded-lg hover:bg-cream-dark transition-colors text-sm">
          <Download className="w-4 h-4"/>
          {lang === 'hi' ? 'डाउनलोड' : 'Export'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-forest text-cream p-6 rounded-2xl shadow-lg relative overflow-hidden">
          <TrendingUp className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 text-wheat" />
          <p className="font-bold text-wheat/80 mb-2">{lang === 'hi' ? 'इस महीने की कमाई' : 'This Month\'s Earnings'}</p>
          <div className="flex items-end gap-3 mb-2">
            <h2 className="text-5xl font-display font-bold tracking-tight">₹19,600</h2>
            <span className="flex items-center text-wheat font-bold text-sm bg-wheat/10 px-2 py-1 rounded mb-1">
              <ArrowUpRight className="w-4 h-4"/> +14%
            </span>
          </div>
          <p className="text-sm text-cream/80 opacity-90 mt-4 border-t border-cream/20 pt-4">
            You earned <strong className="text-wheat">₹6,200 more</strong> compared to selling at strictly Mandi prices this month.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h3 className="font-bold text-forest mb-6">Earnings Timeline</h3>
           <div className="h-40 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={mockEarnings}>
                 <XAxis dataKey="week" stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#8884d8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `₹${v/1000}k`} />
                 <Tooltip cursor={{fill: '#f0fdf4'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                 <Bar dataKey="earnings" fill="#2D6A4F" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <h3 className="font-bold text-xl mb-4 mt-8">Recent Payments (UPI)</h3>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-cream-dark text-forest font-bold">
            <tr>
              <th className="p-4 border-b border-cream">Date</th>
              <th className="p-4 border-b border-cream">Student</th>
              <th className="p-4 border-b border-cream">Produce</th>
              <th className="p-4 border-b border-cream text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { d: 'Mar 29', s: 'Aryan S.', p: 'Guava (2kg)', a: 80 },
              { d: 'Mar 28', s: 'Priya M.', p: 'Tomato (3kg)', a: 90 },
              { d: 'Mar 26', s: 'Rahul V.', p: 'Papaya (1kg)', a: 40 },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 border-b border-gray-50 last:border-0">
                <td className="p-4 text-text-secondary">{row.d}</td>
                <td className="p-4 font-bold">{row.s}</td>
                <td className="p-4">{row.p}</td>
                <td className="p-4 text-right font-bold text-forest flex items-center justify-end"><IndianRupee className="w-3 h-3"/>{row.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
