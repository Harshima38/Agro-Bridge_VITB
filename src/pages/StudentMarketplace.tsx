import React, { useState } from 'react';
import { Search, MapPin, Map, CheckCircle2, ShoppingCart } from 'lucide-react';

const mockProduce = [
  { id: 1, name: "Juicy Red Tomatoes", price: 40, fresh: true, season: "Current", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Farm Fresh Potatoes", price: 25, fresh: true, season: "Current", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Organic Spinach", price: 30, fresh: true, season: "Current", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Sweet Mangoes", price: 120, fresh: false, season: "Upcoming", image: "https://images.unsplash.com/photo-1553279768-865429fd4ef0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
];

const locations = [
  "Block 1 (Boys Hostel)",
  "Block 2 (Boys Hostel)",
  "Block 3 (Boys Hostel)",
  "Block 4 (Boys Hostel)",
  "Block 5 (Boys Hostel)",
  "Girls Hostel",
  "Faculty Quarters"
];

const StudentMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeason, setFilterSeason] = useState('Current');
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [cartCount, setCartCount] = useState(0);

  const filteredProduce = mockProduce.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.season === filterSeason
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      
      {/* Produce Grid */}
      <div className="flex-1 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search farm fresh produce..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rural-green-500"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={() => setFilterSeason('Current')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterSeason === 'Current' ? 'bg-rural-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Current Season
            </button>
            <button 
              onClick={() => setFilterSeason('Upcoming')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterSeason === 'Upcoming' ? 'bg-earth-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              Upcoming
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProduce.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="h-48 relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.fresh && (
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-rural-green-600 flex items-center gap-1 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-rural-green-500" />
                    100% Fresh
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-lg">{item.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-rural-green-600">₹{item.price}<span className="text-sm text-gray-500 font-normal">/kg</span></span>
                  <button 
                    onClick={() => setCartCount(prev => prev + 1)}
                    className="p-2 bg-rural-green-50 text-rural-green-600 rounded-full hover:bg-rural-green-600 hover:text-white transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProduce.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No produce found for this season.
            </div>
          )}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-rural-green-600" />
            Your Cart
          </h2>
          
          {cartCount === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">
               Your cart is empty. Add some fresh produce!
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Items ({cartCount})</span>
                <span className="font-medium">₹{cartCount * 40}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-4">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-rural-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg pt-2">
                <span>Total</span>
                <span>₹{cartCount * 40}</span>
              </div>
              
              <div className="pt-4 space-y-3">
                <label className="block text-sm font-medium text-gray-700">Delivery Location (VIT Bhopal)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-10 w-full rounded-lg border border-gray-300 bg-gray-50/50 py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-rural-green-500 focus:border-transparent text-sm appearance-none"
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full mt-6 bg-earth-500 hover:bg-earth-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm focus:ring-4 focus:ring-earth-200">
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default StudentMarketplace;
