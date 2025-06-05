
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
        <Route path="/health-concerns" element={<HealthConcerns />} />
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
        
        {/* Health Concern Category Routes - NEW STRUCTURE */}
        <Route path="/health-concerns/allergy-care" element={<AllergyCare />} />
        <Route path="/health-concerns/gut-health" element={<GutHealth />} />
        <Route path="/health-concerns/heart-health" element={<HeartHealth />} />
        <Route path="/health-concerns/child-care" element={<ChildCare />} />
        <Route path="/health-concerns/cancer-support" element={<CancerSupport />} />
        <Route path="/health-concerns/anxiety-mental-health" element={<AnxietyMentalHealth />} />
        <Route path="/health-concerns/ent-care" element={<ENTCare />} />
        <Route path="/health-concerns/eye-care" element={<EyeCare />} />
        <Route path="/health-concerns/hair-care" element={<HairCare />} />
        <Route path="/health-concerns/immune-boosters" element={<ImmuneBoosters />} />
        <Route path="/health-concerns/infection-care" element={<InfectionCare />} />
        <Route path="/health-concerns/lifestyle-care" element={<LifestyleCare />} />
        <Route path="/health-concerns/mental-health" element={<MentalHealth />} />
        <Route path="/health-concerns/muscle-care" element={<MuscleCare />} />
        <Route path="/health-concerns/nutritive-care" element={<NutritiveCare />} />
        <Route path="/health-concerns/pain-care" element={<PainCare />} />
        <Route path="/health-concerns/reproductive-care" element={<ReproductiveCare />} />
        <Route path="/health-concerns/respiratory-care" element={<RespiratoryCare />} />
        <Route path="/health-concerns/skin-care" element={<SkinCare />} />
        <Route path="/health-concerns/specialty-care" element={<SpecialtyCare />} />
        <Route path="/health-concerns/tooth-care" element={<ToothCare />} />
        <Route path="/health-concerns/urology-care" element={<UrologyCare />} />
        <Route path="/health-concerns/womens-health" element={<WomensHealth />} />

        {/* Individual Health Concern Pages - NEW STRUCTURE */}
        <Route path="/health-concerns/anxiety-stress" element={<AnxietyStress />} />
        <Route path="/health-concerns/insomnia-sleep-disorders" element={<InsomniaPage />} />
        <Route path="/health-concerns/digestive-issues" element={<DigestiveIssues />} />
        <Route path="/health-concerns/allergies-hay-fever" element={<AllergiesHayFever />} />
        <Route path="/health-concerns/headaches-migraines" element={<HeadachesMigraines />} />
        <Route path="/health-concerns/skin-conditions" element={<SkinConditions />} />
        <Route path="/health-concerns/cold-flu" element={<ColdFlu />} />
        <Route path="/health-concerns/joint-pain-arthritis" element={<JointPainArthritis />} />
        <Route path="/health-concerns/childrens-health" element={<ChildrensHealth />} />
        <Route path="/health-concerns/depression-mood" element={<DepressionMood />} />
        <Route path="/health-concerns/weight-management" element={<WeightManagement />} />
        <Route path="/health-concerns/eye-problems" element={<EyeProblems />} />
        <Route path="/health-concerns/high-blood-pressure" element={<HighBloodPressure />} />
        <Route path="/health-concerns/diabetes-support" element={<DiabetesSupport />} />
        
        {/* Disease-specific routes under health concerns */}
        <Route path="/health-concerns/allergies-hay-fever/asthma" element={<AsthmaPage />} />
        <Route path="/health-concerns/allergies-hay-fever/eczema" element={<EczemaPage />} />
        <Route path="/health-concerns/allergies-hay-fever/food-allergies" element={<FoodAllergiesPage />} />
        <Route path="/health-concerns/anxiety-stress/panic-disorder" element={<PanicDisorderPage />} />
        <Route path="/health-concerns/anxiety-stress/generalized-anxiety" element={<GeneralizedAnxietyPage />} />
        <Route path="/health-concerns/digestive-issues/ibs" element={<IBSPage />} />
        
        {/* Infection-related routes - NEW STRUCTURE */}
        <Route path="/health-concerns/bacterial-infections" element={<BacterialInfections />} />
        <Route path="/health-concerns/viral-infections" element={<ViralInfections />} />
        <Route path="/health-concerns/fungal-infections" element={<FungalInfections />} />
        <Route path="/health-concerns/urinary-tract-infections" element={<UrinaryTractInfections />} />
        <Route path="/health-concerns/skin-infections" element={<SkinInfections />} />
        <Route path="/health-concerns/ear-sinus-infections" element={<EarSinusInfections />} />
        <Route path="/health-concerns/recurrent-fevers" element={<RecurrentFevers />} />
        <Route path="/health-concerns/fever-with-chills" element={<FeverWithChills />} />
        
        {/* Additional health concern routes - NEW STRUCTURE */}
        <Route path="/health-concerns/seasonal-allergies" element={<SeasonalAllergies />} />
        <Route path="/health-concerns/teething-troubles" element={<Teething />} />
        <Route path="/health-concerns/acne-pimples" element={<Acne />} />
        <Route path="/health-concerns/diarrhoea" element={<Diarrhoea />} />
        <Route path="/health-concerns/gastritis" element={<Gastritis />} />
        <Route path="/health-concerns/chronic-rhinitis" element={<ChronicRhinitis />} />
        <Route path="/health-concerns/breast-tenderness" element={<BreastTenderness />} />
        <Route path="/health-concerns/fibroids-supportive" element={<FibroidsSupportive />} />
        <Route path="/health-concerns/general-weakness" element={<GeneralWeakness />} />
        <Route path="/health-concerns/convalescence-remedies" element={<ConvalescenceRemedies />} />
        
        {/* Placeholder routes for future health concerns - NEW STRUCTURE */}
        <Route path="/health-concerns/dust-allergy" element={<></>} />
        <Route path="/health-concerns/drug-allergies" element={<></>} />
        <Route path="/health-concerns/allergic-rhinitis" element={<></>} />
        <Route path="/health-concerns/pet-dander-allergy" element={<></>} />
        <Route path="/health-concerns/mold-allergy" element={<></>} />
        <Route path="/health-concerns/latex-allergy" element={<></>} />
        <Route path="/health-concerns/sinus-allergy" element={<></>} />
        
        <Route path="/health-concerns/cancer-related-fatigue" element={<></>} />
        <Route path="/health-concerns/immune-weakness-cancer" element={<></>} />
        <Route path="/health-concerns/loss-of-appetite-cancer" element={<></>} />
        <Route path="/health-concerns/mouth-ulcers-cancer-treatment" element={<></>} />
        <Route path="/health-concerns/lymphedema-support" element={<></>} />
        <Route path="/health-concerns/anxiety-sleep-disorders-cancer" element={<></>} />
        
        <Route path="/health-concerns/high-cholesterol" element={<></>} />
        <Route path="/health-concerns/angina-pectoris" element={<></>} />
        <Route path="/health-concerns/varicose-veins" element={<></>} />
        <Route path="/health-concerns/arrhythmias" element={<></>} />
        <Route path="/health-concerns/post-heart-attack-recovery" element={<></>} />
        
        <Route path="/health-concerns/colic" element={<></>} />
        <Route path="/health-concerns/diaper-rash" element={<></>} />
        <Route path="/health-concerns/childhood-constipation" element={<></>} />
        <Route path="/health-concerns/growth-appetite-issues" element={<></>} />
        <Route path="/health-concerns/bedwetting" element={<></>} />
        <Route path="/health-concerns/childhood-allergies" element={<></>} />
        <Route path="/health-concerns/worms" element={<></>} />
        <Route path="/health-concerns/temper-tantrums" element={<></>} />
        
        <Route path="/health-concerns/earache-otitis-media" element={<></>} />
        <Route path="/health-concerns/sinusitis" element={<></>} />
        <Route path="/health-concerns/tonsillitis" element={<></>} />
        <Route path="/health-concerns/sore-throat" element={<></>} />
        <Route path="/health-concerns/nasal-polyps" element={<></>} />
        <Route path="/health-concerns/nose-bleeds-epistaxis" element={<></>} />
        <Route path="/health-concerns/tinnitus" element={<></>} />
        <Route path="/health-concerns/loss-of-voice-laryngitis" element={<></>} />
        
        <Route path="/health-concerns/eye-strain-digital-fatigue" element={<></>} />
        <Route path="/health-concerns/dry-eyes" element={<></>} />
        <Route path="/health-concerns/conjunctivitis" element={<></>} />
        <Route path="/health-concerns/eye-redness-itching" element={<></>} />
        <Route path="/health-concerns/stye-chalazion" element={<></>} />
        <Route path="/health-concerns/vision-weakness" element={<></>} />
        <Route path="/health-concerns/watering-eyes" element={<></>} />
        <Route path="/health-concerns/light-sensitivity" element={<></>} />
        
        <Route path="/health-concerns/hair-fall-loss" element={<></>} />
        <Route path="/health-concerns/dandruff" element={<></>} />
        <Route path="/health-concerns/premature-greying" element={<></>} />
        <Route path="/health-concerns/scalp-itching-infections" element={<></>} />
        <Route path="/health-concerns/alopecia-areata" element={<></>} />
        <Route path="/health-concerns/thinning-hair" element={<></>} />
        <Route path="/health-concerns/postpartum-hair-fall" element={<></>} />
        
        <Route path="/health-concerns/recurrent-colds-cough" element={<></>} />
        <Route path="/health-concerns/frequent-infections" element={<></>} />
        <Route path="/health-concerns/low-energy-levels" element={<></>} />
        <Route path="/health-concerns/post-illness-recovery" element={<></>} />
        <Route path="/health-concerns/childrens-immunity-drops" element={<></>} />
        <Route path="/health-concerns/elderly-immune-support" element={<></>} />

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
