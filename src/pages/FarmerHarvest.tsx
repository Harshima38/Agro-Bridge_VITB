import React, { useState } from 'react';
import { Leaf, PlusSquare, Calendar, DollarSign, Scale } from 'lucide-react';

const FarmerHarvest = () => {
  const [formData, setFormData] = useState({
    cropName: '',
    quantity: '',
    pricePerKg: '',
    expiryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Harvest Submitted:", formData);
    alert('Harvest Successfully Listed!');
    setFormData({ cropName: '', quantity: '', pricePerKg: '', expiryDate: '' });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      
      <div className="bg-white rounded-2xl shadow-sm border border-rural-green-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rural-green-400 to-rural-green-600"></div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rural-green-50 rounded-lg text-rural-green-600">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">List Your Harvest</h2>
              <p className="text-gray-500 text-sm mt-1">Add your daily fresh produce to be picked up today.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            <div className="space-y-4">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Leaf className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-gray-50/50 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-rural-green-500 focus:border-transparent transition-all"
                    placeholder="e.g. Fresh Tomatoes"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Kg)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Scale className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-gray-50/50 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-rural-green-500 focus:border-transparent transition-all"
                      placeholder="e.g. 50"
                      required
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Kg (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="pricePerKg"
                      value={formData.pricePerKg}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-lg border border-gray-300 bg-gray-50/50 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-rural-green-500 focus:border-transparent transition-all"
                      placeholder="e.g. 30"
                      required
                      min="1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date / Freshness Guaranteed Until</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-gray-50/50 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-rural-green-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-rural-green-600 hover:bg-rural-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm focus:ring-4 focus:ring-rural-green-200"
            >
              <PlusSquare className="w-5 h-5" />
              List Crop Availability
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default FarmerHarvest;
