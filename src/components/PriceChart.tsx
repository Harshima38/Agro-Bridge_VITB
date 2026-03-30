import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const dummyData = [
  { name: 'Mar 23', history: 40 },
  { name: 'Mar 24', history: 42 },
  { name: 'Mar 25', history: 38 },
  { name: 'Mar 26', history: 45 },
  { name: 'Mar 27', history: 43 },
  { name: 'Mar 28', history: 44 },
  { name: 'Mar 29', history: 46 },
  { name: 'Mar 30', predicted: 47 },
  { name: 'Mar 31', predicted: 43 },
  { name: 'Apr 01', predicted: 41 },
];

export const PriceChart = () => {
  return (
    <div className="w-full h-64 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-sm font-semibold mb-2 flex justify-between">
        <span>Sehore Price Trend</span>
        <span className="text-xs text-forest animate-pulse">● Live Prediction</span>
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
          <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val}`} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
          <Line type="monotone" dataKey="history" stroke="#2D6A4F" strokeWidth={3} dot={{r: 4}} activeDot={{ r: 6 }} name="Historical Price" />
          <Line type="monotone" dataKey="predicted" stroke="#E76F51" strokeWidth={3} strokeDasharray="5 5" dot={{r: 4}} name="Predicted Price (AI)" />
          <ReferenceLine x="Mar 29" stroke="#9CA3AF" strokeDasharray="3 3" label={{ position: 'top', value: 'Today', fill: '#6B7280', fontSize: 12 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
