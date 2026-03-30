import React, { useState } from 'react';
import { Package, Truck, UserCircle, MapPin, Building, ArrowRight } from 'lucide-react';

const mockPickups = [
  { id: 101, farmer: "Ramesh Kumar", village: "Kothri Kalan", items: "10kg Tomatoes", status: "pending" },
  { id: 102, farmer: "Suresh Singh", village: "Amlaha", items: "5kg Potatoes, 2kg Spinach", status: "pending" },
];

const mockDropoffs = [
  { id: 201, to: "Rahul S.", location: "Block 1 (Boys Hostel)", items: "2kg Tomatoes", status: "pending" },
  { id: 202, to: "Dr. Sharma", location: "Faculty Quarters", items: "5kg Potatoes", status: "pending" },
  { id: 203, to: "Priya M.", location: "Girls Hostel", items: "1kg Spinach", status: "pending" },
];

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState<'pickup' | 'dropoff'>('pickup');

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-earth-500 rounded-2xl p-6 text-white shadow-sm flex items-center justify-between">
          <div>
            <p className="text-earth-100 text-sm font-medium mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold">₹240</h3>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <UserCircle className="w-6 h-6" />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Pending Pickups</p>
            <h3 className="text-3xl font-bold text-gray-800">{mockPickups.length}</h3>
          </div>
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">VIT Drop-offs</p>
            <h3 className="text-3xl font-bold text-gray-800">{mockDropoffs.length}</h3>
          </div>
          <div className="w-12 h-12 bg-rural-green-50 text-rural-green-600 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('pickup')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${activeTab === 'pickup' ? 'text-earth-600 border-b-2 border-earth-600 bg-earth-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <MapPin className="w-4 h-4" />
            Pickups from Village
          </button>
          <button 
            onClick={() => setActiveTab('dropoff')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${activeTab === 'dropoff' ? 'text-rural-green-600 border-b-2 border-rural-green-600 bg-rural-green-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            <Building className="w-4 h-4" />
            Drop-offs to VIT
          </button>
        </div>

        <div className="p-0">
          {activeTab === 'pickup' && (
            <ul className="divide-y divide-gray-100">
              {mockPickups.map(pickup => (
                <li key={pickup.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{pickup.farmer}</h4>
                      <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3"/> {pickup.village}</p>
                      <div className="mt-2 text-sm font-medium text-gray-700 bg-gray-100 inline-block px-2.5 py-1 rounded-md">
                        {pickup.items}
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-earth-500 hover:text-earth-600 text-gray-600 font-medium py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">
                    Mark Collected
                  </button>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'dropoff' && (
            <ul className="divide-y divide-gray-100">
              {mockDropoffs.map(dropoff => (
                <li key={dropoff.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rural-green-100 text-rural-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{dropoff.to}</h4>
                      <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1"><Building className="w-3 h-3"/> {dropoff.location}</p>
                      <div className="mt-2 text-sm font-medium text-gray-700 bg-gray-100 inline-block px-2.5 py-1 rounded-md">
                        {dropoff.items}
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-rural-green-600 hover:bg-rural-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm text-sm">
                    Confirm Delivery <ArrowRight className="w-4 h-4"/>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
