import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './contexts/CartContext';
import { ScrollToTop } from './utils/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { ContactUs } from './pages/ContactUs';
import { OurDoctors } from './pages/OurDoctors';
import { DoctorDetails } from './pages/DoctorDetails';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Shop } from './pages/Shop';
import { FAQs } from './pages/FAQs';
import { UserAccount } from './pages/UserAccount';
import { VideoConsultation } from './pages/VideoConsultation';
import { AppointmentBooking } from './pages/AppointmentBooking';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { ReturnsPolicy } from './pages/ReturnsPolicy';
import { ShippingPolicy } from './pages/ShippingPolicy';
import { NotFound } from './pages/NotFound';
import { AuthModals } from './components/auth/AuthModals';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { ProtectedDoctorRoute } from './components/auth/ProtectedDoctorRoute';
import AdminDashboard from "./pages/AdminDashboard";
import DoctorSchedule from "./pages/DoctorSchedule";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthModals />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:categorySlug" element={<Products />} />
                <Route path="/product/:productSlug" element={<ProductDetails />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/doctors" element={<OurDoctors />} />
                <Route path="/doctor/:doctorSlug" element={<DoctorDetails />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:blogPostSlug" element={<BlogPost />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/account" element={<UserAccount />} />
                <Route path="/video-consultation" element={<VideoConsultation />} />
                <Route path="/appointment-booking" element={<AppointmentBooking />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/returns-policy" element={<ReturnsPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/join-consultation/:appointmentId" element={<></>} />
                <Route path="/video-room/:roomId" element={<></>} />
                
                {/* Doctor Routes */}
                <Route path="/doctor" element={<ProtectedDoctorRoute><DoctorDashboard /></ProtectedDoctorRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminDashboard />} />

                <Route path="*" element={<NotFound />} />
                <Route path="/doctor/schedule" element={<DoctorSchedule />} />
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
