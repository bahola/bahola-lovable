
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

import { CartProvider } from './contexts/CartContext';
import { ERPNextAuthProvider } from './contexts/ERPNextAuthContext';
import ScrollToTop from './components/ScrollToTop';
import { LazyHeader } from './components/LazyHeader';
import { Footer } from './components/Footer';
import { AuthModals } from './components/AuthModals';
import { ProtectedDoctorRoute } from './components/auth/ProtectedDoctorRoute';

// Critical pages loaded immediately
import Index from './pages/Index';
import NotFound from './pages/NotFound';

// Lazy load non-critical pages for better performance
const Shop = React.lazy(() => import('./pages/Shop'));
const About = React.lazy(() => import('./pages/About'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Register = React.lazy(() => import('./pages/Register'));
const Login = React.lazy(() => import('./pages/Login'));
const FAQ = React.lazy(() => import('./pages/FAQ'));
const UserAccount = React.lazy(() => import('./pages/UserAccount'));
const VideoConsultation = React.lazy(() => import('./pages/VideoConsultation'));
const AppointmentBooking = React.lazy(() => import('./pages/AppointmentBooking'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = React.lazy(() => import('./pages/TermsConditions'));
const ReturnPolicy = React.lazy(() => import('./pages/ReturnPolicy'));
const ShippingInfo = React.lazy(() => import('./pages/ShippingInfo'));
const Consultation = React.lazy(() => import('./pages/Consultation'));
const Homeopathy = React.lazy(() => import('./pages/Homeopathy'));
const HelpCenter = React.lazy(() => import('./pages/HelpCenter'));
const StoreLocator = React.lazy(() => import('./pages/StoreLocator'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const AdminHome = React.lazy(() => import('./pages/admin/AdminHome'));
const PagesManagement = React.lazy(() => import('./pages/admin/PagesManagement'));
const HelpCenterManagement = React.lazy(() => import('./pages/admin/HelpCenterManagement'));
const DoctorSchedule = React.lazy(() => import('./pages/DoctorSchedule'));
const HealthConcerns = React.lazy(() => import('./pages/HealthConcerns'));
const Sitemap = React.lazy(() => import('./pages/Sitemap'));

// Lazy load help center pages
const GettingStarted = React.lazy(() => import('./pages/help-center/GettingStarted'));
const PotencyGuide = React.lazy(() => import('./pages/help-center/PotencyGuide'));
const UsingPellets = React.lazy(() => import('./pages/help-center/UsingPellets'));
const FirstAidKit = React.lazy(() => import('./pages/help-center/FirstAidKit'));
const LiquidRemediesTroubleshooting = React.lazy(() => import('./pages/help-center/LiquidRemediesTroubleshooting'));
const NoResultsTroubleshooting = React.lazy(() => import('./pages/help-center/NoResultsTroubleshooting'));
const ChildrenSafety = React.lazy(() => import('./pages/help-center/ChildrenSafety'));
const RemedyInteractions = React.lazy(() => import('./pages/help-center/RemedyInteractions'));
const BachFlowerSelector = React.lazy(() => import('./pages/help-center/BachFlowerSelector'));
const SeasonalRemedies = React.lazy(() => import('./pages/help-center/SeasonalRemedies'));
const ShippingIssues = React.lazy(() => import('./pages/help-center/ShippingIssues'));
const Certifications = React.lazy(() => import('./pages/help-center/Certifications'));

// Lazy load health concern pages
const AnxietyStress = React.lazy(() => import('./pages/health-concerns/AnxietyStress'));
const InsomniaPage = React.lazy(() => import('./pages/health-concerns/InsomniaPage'));
const DigestiveIssues = React.lazy(() => import('./pages/health-concerns/DigestiveIssues'));
const AllergiesHayFever = React.lazy(() => import('./pages/health-concerns/AllergiesHayFever'));
const HeadachesMigraines = React.lazy(() => import('./pages/health-concerns/HeadachesMigraines'));
const SkinConditions = React.lazy(() => import('./pages/health-concerns/SkinConditions'));
const ColdFlu = React.lazy(() => import('./pages/health-concerns/ColdFlu'));
const JointPainArthritis = React.lazy(() => import('./pages/health-concerns/JointPainArthritis'));
const WomensHealth = React.lazy(() => import('./pages/health-concerns/WomensHealth'));
const ChildrensHealth = React.lazy(() => import('./pages/health-concerns/ChildrensHealth'));
const DepressionMood = React.lazy(() => import('./pages/health-concerns/DepressionMood'));
const WeightManagement = React.lazy(() => import('./pages/health-concerns/WeightManagement'));
const EyeProblems = React.lazy(() => import('./pages/health-concerns/EyeProblems'));
const HighBloodPressure = React.lazy(() => import('./pages/health-concerns/HighBloodPressure'));
const DiabetesSupport = React.lazy(() => import('./pages/health-concerns/DiabetesSupport'));

const queryClient = new QueryClient();

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bahola-blue-500"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ERPNextAuthProvider>
          <CartProvider>
            <BrowserRouter>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col">
                <LazyHeader />
                <main className="flex-1">
                  <Suspense fallback={<PageLoader />}>
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
                      <Route path="/help-center" element={<HelpCenter />} />
                      <Route path="/store-locator" element={<StoreLocator />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
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
                      
                      {/* Health Concern Routes */}
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
                  </Suspense>
                </main>
                <Footer />
              </div>
              <Toaster />
            </BrowserRouter>
          </CartProvider>
        </ERPNextAuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
