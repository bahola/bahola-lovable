
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

import { CartProvider } from './contexts/CartContext';
import ScrollToTop from './components/ScrollToTop';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Index from './pages/Index';
import Shop from './pages/Shop';
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
import Homeopathy from './pages/Homeopathy';
import HelpCenter from './pages/HelpCenter';
import StoreLocator from './pages/StoreLocator';
import { AuthModals } from './components/AuthModals';
import AdminDashboard from "./pages/AdminDashboard";
import AdminHome from "./pages/admin/AdminHome";
import PagesManagement from "./pages/admin/PagesManagement";
import HelpCenterManagement from "./pages/admin/HelpCenterManagement";
import DoctorSchedule from "./pages/DoctorSchedule";
import { ProtectedDoctorRoute } from './components/auth/ProtectedDoctorRoute';
import HealthConcerns from './pages/HealthConcerns';

// Import help center pages
import GettingStarted from './pages/help-center/GettingStarted';
import PotencyGuide from './pages/help-center/PotencyGuide';
import UsingPellets from './pages/help-center/UsingPellets';
import FirstAidKit from './pages/help-center/FirstAidKit';
import LiquidRemediesTroubleshooting from './pages/help-center/LiquidRemediesTroubleshooting';
import NoResultsTroubleshooting from './pages/help-center/NoResultsTroubleshooting';
import ChildrenSafety from './pages/help-center/ChildrenSafety';
import RemedyInteractions from './pages/help-center/RemedyInteractions';
import BachFlowerSelector from './pages/help-center/BachFlowerSelector';
import SeasonalRemedies from './pages/help-center/SeasonalRemedies';
import ShippingIssues from './pages/help-center/ShippingIssues';
import Certifications from './pages/help-center/Certifications';

// Import health concern pages - these will now be disease pages
import AnxietyStress from './pages/health-concerns/AnxietyStress';
import InsomniaPage from './pages/health-concerns/InsomniaPage';
import DigestiveIssues from './pages/health-concerns/DigestiveIssues';
import AllergiesHayFever from './pages/health-concerns/AllergiesHayFever';
import HeadachesMigraines from './pages/health-concerns/HeadachesMigraines';
import SkinConditions from './pages/health-concerns/SkinConditions';
import ColdFlu from './pages/health-concerns/ColdFlu';
import JointPainArthritis from './pages/health-concerns/JointPainArthritis';
import WomensHealth from './pages/health-concerns/WomensHealth';
import ChildrensHealth from './pages/health-concerns/ChildrensHealth';
import DepressionMood from './pages/health-concerns/DepressionMood';
import WeightManagement from './pages/health-concerns/WeightManagement';
import EyeProblems from './pages/health-concerns/EyeProblems';
import HighBloodPressure from './pages/health-concerns/HighBloodPressure';
import DiabetesSupport from './pages/health-concerns/DiabetesSupport';
import Sitemap from './pages/Sitemap';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
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
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<CategoryPage />} />
                  <Route path="/products/:categorySlug" element={<CategoryPage />} />
                  <Route path="/product/:productSlug" element={<ProductPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/consultation" element={<Consultation />} />
                  <Route path="/homeopathy" element={<Homeopathy />} />
                  <Route path="/health-concerns" element={<HealthConcerns />} />
                  <Route path="/diseases" element={<HealthConcerns />} />
                  <Route path="/help-center" element={<HelpCenter />} />
                  <Route path="/store-locator" element={<StoreLocator />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/account" element={<UserAccount />} />
                  <Route path="/video-consultation" element={<VideoConsultation />} />
                  <Route path="/appointment-booking" element={<AppointmentBooking />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-conditions" element={<TermsConditions />} />
                  <Route path="/returns-policy" element={<ReturnPolicy />} />
                  <Route path="/shipping-policy" element={<ShippingInfo />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route path="/join-consultation/:appointmentId" element={<></>} />
                  <Route path="/video-room/:roomId" element={<></>} />
                  
                  {/* Help Center Routes */}
                  <Route path="/help/getting-started" element={<GettingStarted />} />
                  <Route path="/help/potency-guide" element={<PotencyGuide />} />
                  <Route path="/help/using-pellets" element={<UsingPellets />} />
                  <Route path="/help/first-aid-kit" element={<FirstAidKit />} />
                  <Route path="/help/liquid-remedies-troubleshooting" element={<LiquidRemediesTroubleshooting />} />
                  <Route path="/help/no-results-troubleshooting" element={<NoResultsTroubleshooting />} />
                  <Route path="/help/children-safety" element={<ChildrenSafety />} />
                  <Route path="/help/remedy-interactions" element={<RemedyInteractions />} />
                  <Route path="/help/bach-flower-selector" element={<BachFlowerSelector />} />
                  <Route path="/help/seasonal-remedies" element={<SeasonalRemedies />} />
                  <Route path="/help/shipping-issues" element={<ShippingIssues />} />
                  <Route path="/help/certifications" element={<Certifications />} />
                  
                  {/* Disease Routes - Main categories */}
                  <Route path="/diseases/mental-health" element={<CategoryPage />} />
                  <Route path="/diseases/digestive-disorders" element={<CategoryPage />} />
                  <Route path="/diseases/respiratory-diseases" element={<CategoryPage />} />
                  <Route path="/diseases/skin-diseases" element={<CategoryPage />} />
                  <Route path="/diseases/joint-muscle-disorders" element={<CategoryPage />} />
                  <Route path="/diseases/womens-health" element={<CategoryPage />} />
                  <Route path="/diseases/childrens-health" element={<CategoryPage />} />
                  <Route path="/diseases/eye-problems" element={<CategoryPage />} />
                  <Route path="/diseases/cardiovascular-disorders" element={<CategoryPage />} />
                  <Route path="/diseases/metabolic-disorders" element={<CategoryPage />} />
                  
                  {/* Disease Routes - Subcategories following the structure */}
                  <Route path="/diseases/mental-health/anxiety-stress" element={<AnxietyStress />} />
                  <Route path="/diseases/mental-health/depression-mood" element={<DepressionMood />} />
                  <Route path="/diseases/mental-health/insomnia-sleep-disorders" element={<InsomniaPage />} />
                  
                  <Route path="/diseases/digestive-disorders/digestive-issues" element={<DigestiveIssues />} />
                  
                  <Route path="/diseases/respiratory-diseases/allergies-hay-fever" element={<AllergiesHayFever />} />
                  <Route path="/diseases/respiratory-diseases/cold-flu" element={<ColdFlu />} />
                  
                  <Route path="/diseases/skin-diseases/skin-conditions" element={<SkinConditions />} />
                  
                  <Route path="/diseases/joint-muscle-disorders/joint-pain-arthritis" element={<JointPainArthritis />} />
                  
                  <Route path="/diseases/womens-health/womens-health" element={<WomensHealth />} />
                  
                  <Route path="/diseases/childrens-health/childrens-health" element={<ChildrensHealth />} />
                  
                  <Route path="/diseases/eye-problems/eye-problems" element={<EyeProblems />} />
                  
                  <Route path="/diseases/cardiovascular-disorders/high-blood-pressure" element={<HighBloodPressure />} />
                  <Route path="/diseases/cardiovascular-disorders/headaches-migraines" element={<HeadachesMigraines />} />
                  
                  <Route path="/diseases/metabolic-disorders/diabetes-support" element={<DiabetesSupport />} />
                  <Route path="/diseases/metabolic-disorders/weight-management" element={<WeightManagement />} />
                  
                  {/* Legacy concern routes for backward compatibility */}
                  <Route path="/concern/anxiety-stress" element={<AnxietyStress />} />
                  <Route path="/concern/insomnia-sleep-disorders" element={<InsomniaPage />} />
                  <Route path="/concern/digestive-issues" element={<DigestiveIssues />} />
                  <Route path="/concern/allergies-hay-fever" element={<AllergiesHayFever />} />
                  <Route path="/concern/headaches-migraines" element={<HeadachesMigraines />} />
                  <Route path="/concern/skin-conditions" element={<SkinConditions />} />
                  <Route path="/concern/cold-flu" element={<ColdFlu />} />
                  <Route path="/concern/joint-pain-arthritis" element={<JointPainArthritis />} />
                  <Route path="/concern/womens-health" element={<WomensHealth />} />
                  <Route path="/concern/childrens-health" element={<ChildrensHealth />} />
                  <Route path="/concern/depression-mood" element={<DepressionMood />} />
                  <Route path="/concern/weight-management" element={<WeightManagement />} />
                  <Route path="/concern/eye-problems" element={<EyeProblems />} />
                  <Route path="/concern/high-blood-pressure" element={<HighBloodPressure />} />
                  <Route path="/concern/diabetes-support" element={<DiabetesSupport />} />
                  
                  {/* Doctor Routes */}
                  <Route path="/doctor/schedule" element={
                    <ProtectedDoctorRoute>
                      <DoctorSchedule />
                    </ProtectedDoctorRoute>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />}>
                    <Route index element={<AdminHome />} />
                    <Route path="pages" element={<PagesManagement />} />
                    <Route path="help-center" element={<HelpCenterManagement />} />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
