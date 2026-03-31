import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ImpactDashboard } from './pages/ImpactDashboard';
import { ProductDetail } from './pages/ProductDetail';
import { CartPage } from './pages/CartPage';
import { OrdersPage } from './pages/OrdersPage';
import { FarmerHarvests } from './pages/FarmerHarvests';
import { FarmerEarnings } from './pages/FarmerEarnings';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { BottomNav } from './components/BottomNav';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <CartProvider>
        <div className="min-h-screen flex flex-col font-sans selection:bg-forest selection:text-cream">
          <Navbar />
          <main className="flex-1 w-full relative z-0">
            {/* Background Texture element */}
            <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')" }}></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                <Route path="/order/:token" element={<OrderConfirmation />} />
                <Route path="/impact" element={<ImpactDashboard />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/farmer/harvests" element={<FarmerHarvests />} />
                <Route path="/earnings" element={<FarmerEarnings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
          <BottomNav />
          </div>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  </Router>
);
}

export default App;
