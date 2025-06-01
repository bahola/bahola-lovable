
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { CartProvider } from './contexts/CartContext';
import ScrollToTop from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Index from './pages/Index';
import About from './pages/About';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Contact from './pages/Contact';
import Register from './pages/Register';
import FAQ from './pages/FAQ';
import UserAccount from './pages/UserAccount';
import VideoConsultation from './pages/VideoConsultation';
import AppointmentBooking from './pages/AppointmentBooking';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import ReturnPolicy from './pages/ReturnPolicy';
import ShippingInfo from './pages/ShippingInfo';
import NotFound from './pages/NotFound';
import Consultation from './pages/Consultation';
import { AuthModals } from './components/AuthModals';
import AdminDashboard from "./pages/AdminDashboard";
import DoctorSchedule from "./pages/DoctorSchedule";
import { ProtectedDoctorRoute } from './components/auth/ProtectedDoctorRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthModals modalType={null} onClose={() => {}} />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<CategoryPage />} />
                <Route path="/products/:categorySlug" element={<CategoryPage />} />
                <Route path="/product/:productSlug" element={<ProductPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/register" element={<Register />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="/video-consultation" element={<VideoConsultation />} />
                <Route path="/appointment-booking" element={<AppointmentBooking />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/returns-policy" element={<ReturnPolicy />} />
                <Route path="/shipping-policy" element={<ShippingInfo />} />
                <Route path="/join-consultation/:appointmentId" element={<></>} />
                <Route path="/video-room/:roomId" element={<></>} />
                
                {/* Doctor Routes */}
                <Route path="/doctor/schedule" element={
                  <ProtectedDoctorRoute>
                    <DoctorSchedule />
                  </ProtectedDoctorRoute>
                } />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
