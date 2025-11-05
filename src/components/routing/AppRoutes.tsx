
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedDoctorRoute } from '@/components/auth/ProtectedDoctorRoute';

// Import all page components
import {
  Index,
  NotFound,
  Shop,
  About,
  CategoryPage,
  CategoryOverview,
  ProductPage,
  Contact,
  Register,
  Login,
  FAQ,
  UserAccount,
  VideoConsultation,
  AppointmentBooking,
  PrivacyPolicy,
  TermsConditions,
  ReturnPolicy,
  ShippingInfo,
  Consultation,
  Homeopathy,
  HelpCenter,
  StoreLocator,
  AdminDashboard,
  AdminHome,
  PagesManagement,
  HelpCenterManagement,
  DoctorSchedule,
  HealthConcerns,
  Sitemap,
  Cart,
  Wishlist,
  OrderTracking,
  Reviews,
  PromoOffers,
  GettingStarted,
  PotencyGuide,
  UsingPellets,
  FirstAidKit,
  LiquidRemediesTroubleshooting,
  NoResultsTroubleshooting,
  ChildrenSafety,
  RemedyInteractions,
  BachFlowerSelector,
  SeasonalRemedies,
  ShippingIssues,
  Certifications,
  BachFlowerConcerns,
  AllergiesProductsPage,
  MateriaMedica,
  BryoniaRhus,
  PulsatillaSepia,
  LachesisPulsatilla,
  NuxVomicaSulphur,
  ApisCantharis,
  PhosphorusArsenicum,
  HeparMercurius,
  BelladonnaGlonoinum,
  CalcareaNatrum
} from './LazyImports';

// Import admin components
import ProductsManagement from '@/pages/admin/ProductsManagement';

// Import route functions
import { getHealthConcernRoutes } from './HealthConcernRoutes';
import { getDetailedHealthRoutes } from './DetailedHealthRoutes';
import { getSpecialtyHealthRoutes } from './SpecialtyHealthRoutes';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bahola-blue-500"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<CategoryPage />} />
        <Route path="/products/:categorySlug" element={<CategoryPage />} />
        <Route path="/categories" element={<CategoryOverview />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
        <Route path="/product/:productSlug" element={<ProductPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/appointment-booking" element={<AppointmentBooking />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/homeopathy" element={<Homeopathy />} />
        <Route path="/diseases-conditions" element={<HealthConcerns />} />
        <Route path="/bach-flower-concerns" element={<BachFlowerConcerns />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/stores" element={<StoreLocator />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/video-consultation" element={<VideoConsultation />} />
        
        {/* Policy pages with multiple route aliases */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/returns-policy" element={<ReturnPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping-policy" element={<ShippingInfo />} />
        <Route path="/shipping-info" element={<ShippingInfo />} />
        <Route path="/shipping" element={<ShippingInfo />} />
        
        {/* Cart and user-related pages */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-list" element={<Wishlist />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/track-order" element={<OrderTracking />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/promo-pocket" element={<PromoOffers />} />
        
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
        
        {/* Health Concern Routes - using spread operator to include all routes */}
        {getHealthConcernRoutes()}
        {getDetailedHealthRoutes()}
        {getSpecialtyHealthRoutes()}

        {/* Search routes with dynamic parameters */}
        <Route path="/search" element={<Shop />} />
        
        {/* Doctor Routes */}
        <Route path="/doctor/schedule" element={
          <ProtectedDoctorRoute>
            <DoctorSchedule />
          </ProtectedDoctorRoute>
        } />
        
        {/* Professional Routes */}
        <Route path="/professional/materia-medica" element={<MateriaMedica />} />
        <Route path="/professional/materia-medica/bryonia-rhus" element={<BryoniaRhus />} />
        <Route path="/professional/materia-medica/pulsatilla-sepia" element={<PulsatillaSepia />} />
        <Route path="/professional/materia-medica/lachesis-pulsatilla" element={<LachesisPulsatilla />} />
        <Route path="/professional/materia-medica/nux-vomica-sulphur" element={<NuxVomicaSulphur />} />
        <Route path="/professional/materia-medica/apis-cantharis" element={<ApisCantharis />} />
        <Route path="/professional/materia-medica/phosphorus-arsenicum" element={<PhosphorusArsenicum />} />
        <Route path="/professional/materia-medica/hepar-mercurius" element={<HeparMercurius />} />
        <Route path="/professional/materia-medica/belladonna-glonoinum" element={<BelladonnaGlonoinum />} />
        <Route path="/professional/materia-medica/calcarea-natrum" element={<CalcareaNatrum />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<ProductsManagement />} />
          <Route path="pages" element={<PagesManagement />} />
          <Route path="help-center" element={<HelpCenterManagement />} />
        </Route>

        {/* Products route */}
        <Route path="/products/allergies" element={<AllergiesProductsPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
