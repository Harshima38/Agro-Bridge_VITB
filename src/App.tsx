import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { ImpactDashboard } from './pages/ImpactDashboard';
import { ProductDetail } from './pages/ProductDetail';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
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
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
