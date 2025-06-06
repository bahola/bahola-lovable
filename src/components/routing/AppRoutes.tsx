

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
  AllergiesProductsPage
} from './LazyImports';

import {
  AnxietyStress,
  InsomniaPage,
  DigestiveIssues,
  AllergiesHayFever,
  HeadachesMigraines,
  SkinConditions,
  ColdFlu,
  JointPainArthritis,
  WomensHealth,
  ChildrensHealth,
  DepressionMood,
  WeightManagement,
  EyeProblems,
  HighBloodPressure,
  DiabetesSupport,
  AsthmaPage,
  EczemaPage,
  FoodAllergiesPage,
  PanicDisorderPage,
  GeneralizedAnxietyPage,
  IBSPage,
  BacterialInfections,
  ViralInfections,
  FungalInfections,
  UrinaryTractInfections,
  SkinInfections,
  EarSinusInfections,
  RecurrentFevers,
  FeverWithChills,
  SeasonalAllergies,
  Teething,
  Acne,
  Diarrhoea,
  Gastritis,
  ChronicRhinitis,
  BreastTenderness,
  FibroidsSupportive,
  GeneralWeakness,
  ConvalescenceRemedies,
  AllergyCare,
  GutHealth,
  HeartHealth,
  ChildCare,
  CancerSupport,
  AnxietyMentalHealth,
  ENTCare,
  EyeCare,
  HairCare,
  ImmuneBoosters,
  InfectionCare,
  LifestyleCare,
  MentalHealth,
  MuscleCare,
  NutritiveCare,
  PainCare,
  ReproductiveCare,
  RespiratoryCare,
  SkinCare,
  SpecialtyCare,
  ToothCare,
  UrologyCare
} from './HealthConcernImports';

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
        
        {/* Health Concern Category Routes - Updated to match exact category names */}
        <Route path="/diseases-conditions/allergy-care" element={<AllergyCare />} />
        <Route path="/diseases-conditions/gut-health" element={<GutHealth />} />
        <Route path="/diseases-conditions/heart-health" element={<HeartHealth />} />
        <Route path="/diseases-conditions/child-care" element={<ChildCare />} />
        <Route path="/diseases-conditions/cancer-support" element={<CancerSupport />} />
        <Route path="/diseases-conditions/ent-care" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear-nose-throat" element={<ENTCare />} />
        <Route path="/diseases-conditions/eye-care" element={<EyeCare />} />
        <Route path="/diseases-conditions/hair-care" element={<HairCare />} />
        <Route path="/diseases-conditions/immune-boosters" element={<ImmuneBoosters />} />
        <Route path="/diseases-conditions/infection-care" element={<InfectionCare />} />
        <Route path="/diseases-conditions/infection" element={<InfectionCare />} />
        <Route path="/diseases-conditions/lifestyle-care" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/mental-health" element={<MentalHealth />} />
        <Route path="/diseases-conditions/muscle-care" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care" element={<MuscleCare />} />
        <Route path="/diseases-conditions/nutritive-care" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/pain-care" element={<PainCare />} />
        <Route path="/diseases-conditions/reproductive-care" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/respiratory-care" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/skin-care" element={<SkinCare />} />
        <Route path="/diseases-conditions/specialty-care" element={<SpecialtyCare />} />
        <Route path="/diseases-conditions/tooth-care" element={<ToothCare />} />
        <Route path="/diseases-conditions/urology-care" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care" element={<UrologyCare />} />
        <Route path="/diseases-conditions/womens-health" element={<WomensHealth />} />
        <Route path="/diseases-conditions/womens-care" element={<WomensHealth />} />

        {/* Individual Health Concern Pages */}
        <Route path="/diseases-conditions/anxiety-stress" element={<AnxietyStress />} />
        <Route path="/diseases-conditions/insomnia-sleep-disorders" element={<InsomniaPage />} />
        <Route path="/diseases-conditions/digestive-issues" element={<DigestiveIssues />} />
        <Route path="/diseases-conditions/allergies-hay-fever" element={<AllergiesHayFever />} />
        <Route path="/diseases-conditions/headaches-migraines" element={<HeadachesMigraines />} />
        <Route path="/diseases-conditions/skin-conditions" element={<SkinConditions />} />
        <Route path="/diseases-conditions/cold-flu" element={<ColdFlu />} />
        <Route path="/diseases-conditions/joint-pain-arthritis" element={<JointPainArthritis />} />
        <Route path="/diseases-conditions/childrens-health" element={<ChildrensHealth />} />
        <Route path="/diseases-conditions/depression-mood" element={<DepressionMood />} />
        <Route path="/diseases-conditions/weight-management" element={<WeightManagement />} />
        <Route path="/diseases-conditions/eye-problems" element={<EyeProblems />} />
        <Route path="/diseases-conditions/high-blood-pressure" element={<HighBloodPressure />} />
        <Route path="/diseases-conditions/diabetes-support" element={<DiabetesSupport />} />
        
        {/* Disease-specific routes under diseases-conditions */}
        <Route path="/diseases-conditions/allergies-hay-fever/asthma" element={<AsthmaPage />} />
        <Route path="/diseases-conditions/allergies-hay-fever/eczema" element={<EczemaPage />} />
        <Route path="/diseases-conditions/allergies-hay-fever/food-allergies" element={<FoodAllergiesPage />} />
        <Route path="/diseases-conditions/anxiety-stress/panic-disorder" element={<PanicDisorderPage />} />
        <Route path="/diseases-conditions/anxiety-stress/generalized-anxiety" element={<GeneralizedAnxietyPage />} />
        <Route path="/diseases-conditions/digestive-issues/ibs" element={<IBSPage />} />
        
        {/* Infection-related routes */}
        <Route path="/diseases-conditions/bacterial-infections" element={<BacterialInfections />} />
        <Route path="/diseases-conditions/viral-infections" element={<ViralInfections />} />
        <Route path="/diseases-conditions/fungal-infections" element={<FungalInfections />} />
        <Route path="/diseases-conditions/urinary-tract-infections" element={<UrinaryTractInfections />} />
        <Route path="/diseases-conditions/skin-infections" element={<SkinInfections />} />
        <Route path="/diseases-conditions/ear-sinus-infections" element={<EarSinusInfections />} />
        <Route path="/diseases-conditions/recurrent-fevers" element={<RecurrentFevers />} />
        <Route path="/diseases-conditions/fever-with-chills" element={<FeverWithChills />} />
        
        {/* Additional health concern routes */}
        <Route path="/diseases-conditions/seasonal-allergies" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/teething-troubles" element={<Teething />} />
        <Route path="/diseases-conditions/acne-pimples" element={<Acne />} />
        <Route path="/diseases-conditions/diarrhoea" element={<Diarrhoea />} />
        <Route path="/diseases-conditions/gastritis" element={<Gastritis />} />
        <Route path="/diseases-conditions/chronic-rhinitis" element={<ChronicRhinitis />} />
        <Route path="/diseases-conditions/breast-tenderness" element={<BreastTenderness />} />
        <Route path="/diseases-conditions/fibroids-supportive" element={<FibroidsSupportive />} />
        <Route path="/diseases-conditions/general-weakness" element={<GeneralWeakness />} />
        <Route path="/diseases-conditions/convalescence-remedies" element={<ConvalescenceRemedies />} />

        {/* Search routes with dynamic parameters */}
        <Route path="/search" element={<Shop />} />
        
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

        {/* Products route */}
        <Route path="/products/allergies" element={<AllergiesProductsPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

