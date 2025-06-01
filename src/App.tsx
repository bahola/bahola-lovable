
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CategoryOverview from './pages/CategoryOverview';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductsManagement from './pages/admin/ProductsManagement';
import EditProduct from './pages/admin/EditProduct';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import Homeopathy from './pages/Homeopathy';
import ILoveHomeopathy from './pages/ILoveHomeopathy';
import AppointmentBooking from './pages/AppointmentBooking';
import VideoConsultation from './pages/VideoConsultation';
import AppointmentConfirmation from './pages/AppointmentConfirmation';
import BachFlowerConcerns from './pages/BachFlowerConcerns';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import HealthConcerns from './pages/HealthConcerns';
import ThankYou from './pages/ThankYou';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ReturnPolicy from './pages/ReturnPolicy';
import OrderTracking from './pages/OrderTracking';
import PromoOffers from './pages/PromoOffers';
import DiscountsManagement from './pages/admin/DiscountsManagement';
import ShippingManagement from './pages/admin/ShippingManagement';
import CustomersManagement from './pages/admin/CustomersManagement';
import AdminHome from './pages/admin/AdminHome';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import VideoConsultationRoom from './components/video/VideoConsultationRoom';
import VideoConsultationJoin from './components/video/VideoConsultationJoin';

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
const HelpCenterManagement = React.lazy(() => import('./pages/admin/HelpCenterManagement'));
const SettingsManagement = React.lazy(() => import('./pages/admin/SettingsManagement'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/categories" element={<CategoryOverview />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/promo-offers" element={<PromoOffers />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/faq" element={<FAQ />} />
          
          {/* Help Center Individual Pages */}
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
          
          <Route path="/homeopathy" element={<Homeopathy />} />
          <Route path="/i-love-homeopathy" element={<ILoveHomeopathy />} />
          <Route path="/bach-flower" element={<CategoryPage />} />
          <Route path="/bach-flower-concerns" element={<BachFlowerConcerns />} />
          <Route path="/bach-flower/:subcategory" element={<CategoryPage />} />
          <Route path="/concern/:concernId" element={<CategoryPage />} />
          <Route path="/health-concerns" element={<HealthConcerns />} />
          
          {/* Legal pages */}
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          
          {/* Appointment routes */}
          <Route path="/book-appointment" element={<AppointmentBooking />} />
          <Route path="/video-consultation" element={<VideoConsultation />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="products" element={<ProductsManagement />} />
            <Route path="products/edit/:productId" element={<EditProduct />} />
            <Route path="orders" element={<AdminHome />} />
            <Route path="customers" element={<CustomersManagement />} />
            <Route path="discounts" element={<DiscountsManagement />} />
            <Route path="shipping" element={<ShippingManagement />} />
            <Route path="help-center" element={<HelpCenterManagement />} />
            <Route path="analytics" element={<AdminHome />} />
            <Route path="settings" element={<SettingsManagement />} />
          </Route>
          
          {/* Professional routes */}
          <Route path="/professional/materia-medica" element={<NotFound />} />
          <Route path="/professional/remedy-deep-dive" element={<NotFound />} />
          <Route path="/professional/case-studies" element={<NotFound />} />
          <Route path="/professional/signup" element={<Register />} />
          
          {/* Video consultation routes */}
          <Route path="/video-room/:appointmentId" element={<VideoConsultationRoom />} />
          <Route path="/join-consultation/:appointmentId" element={<VideoConsultationJoin />} />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
