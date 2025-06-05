
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
        
        {/* Disease-specific routes under concerns */}
        <Route path="/concern/allergies-hay-fever/asthma" element={<AsthmaPage />} />
        <Route path="/concern/allergies-hay-fever/eczema" element={<EczemaPage />} />
        <Route path="/concern/allergies-hay-fever/food-allergies" element={<FoodAllergiesPage />} />
        <Route path="/concern/anxiety-stress/panic-disorder" element={<PanicDisorderPage />} />
        <Route path="/concern/anxiety-stress/generalized-anxiety" element={<GeneralizedAnxietyPage />} />
        <Route path="/concern/digestive-issues/ibs" element={<IBSPage />} />
        
        {/* Infection-related routes */}
        <Route path="/concern/bacterial-infections" element={<BacterialInfections />} />
        <Route path="/concern/viral-infections" element={<ViralInfections />} />
        <Route path="/concern/fungal-infections" element={<FungalInfections />} />
        <Route path="/concern/urinary-tract-infections" element={<UrinaryTractInfections />} />
        <Route path="/concern/skin-infections" element={<SkinInfections />} />
        <Route path="/concern/ear-sinus-infections" element={<EarSinusInfections />} />
        <Route path="/concern/recurrent-fevers" element={<RecurrentFevers />} />
        <Route path="/concern/fever-with-chills" element={<FeverWithChills />} />
        
        {/* Additional health concern routes */}
        <Route path="/concern/diarrhoea" element={<Diarrhoea />} />
        <Route path="/concern/gastritis" element={<Gastritis />} />
        <Route path="/concern/chronic-rhinitis" element={<ChronicRhinitis />} />
        <Route path="/concern/breast-tenderness" element={<BreastTenderness />} />
        <Route path="/concern/fibroids-supportive" element={<FibroidsSupportive />} />
        <Route path="/concern/general-weakness" element={<GeneralWeakness />} />
        <Route path="/concern/convalescence-remedies" element={<ConvalescenceRemedies />} />
        
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

        {/* Add the new allergies products route */}
        <Route path="/products/allergies" element={<AllergiesProductsPage />} />
        
        <Route path="/concern/seasonal-allergies" element={<SeasonalAllergies />} />
        <Route path="/concern/teething-troubles" element={<Teething />} />
        <Route path="/concern/acne-pimples" element={<Acne />} />
        
        {/* Add new health concern routes for missing diseases */}
        <Route path="/concern/dust-allergy" element={<></>} />
        <Route path="/concern/drug-allergies" element={<></>} />
        <Route path="/concern/allergic-rhinitis" element={<></>} />
        <Route path="/concern/pet-dander-allergy" element={<></>} />
        <Route path="/concern/mold-allergy" element={<></>} />
        <Route path="/concern/latex-allergy" element={<></>} />
        <Route path="/concern/sinus-allergy" element={<></>} />
        
        <Route path="/concern/cancer-related-fatigue" element={<></>} />
        <Route path="/concern/immune-weakness-cancer" element={<></>} />
        <Route path="/concern/loss-of-appetite-cancer" element={<></>} />
        <Route path="/concern/mouth-ulcers-cancer-treatment" element={<></>} />
        <Route path="/concern/lymphedema-support" element={<></>} />
        <Route path="/concern/anxiety-sleep-disorders-cancer" element={<></>} />
        
        <Route path="/concern/high-cholesterol" element={<></>} />
        <Route path="/concern/angina-pectoris" element={<></>} />
        <Route path="/concern/varicose-veins" element={<></>} />
        <Route path="/concern/arrhythmias" element={<></>} />
        <Route path="/concern/post-heart-attack-recovery" element={<></>} />
        
        <Route path="/concern/colic" element={<></>} />
        <Route path="/concern/diaper-rash" element={<></>} />
        <Route path="/concern/childhood-constipation" element={<></>} />
        <Route path="/concern/growth-appetite-issues" element={<></>} />
        <Route path="/concern/bedwetting" element={<></>} />
        <Route path="/concern/childhood-allergies" element={<></>} />
        <Route path="/concern/worms" element={<></>} />
        <Route path="/concern/temper-tantrums" element={<></>} />
        
        <Route path="/concern/earache-otitis-media" element={<></>} />
        <Route path="/concern/sinusitis" element={<></>} />
        <Route path="/concern/tonsillitis" element={<></>} />
        <Route path="/concern/sore-throat" element={<></>} />
        <Route path="/concern/nasal-polyps" element={<></>} />
        <Route path="/concern/nose-bleeds-epistaxis" element={<></>} />
        <Route path="/concern/tinnitus" element={<></>} />
        <Route path="/concern/loss-of-voice-laryngitis" element={<></>} />
        
        <Route path="/concern/eye-strain-digital-fatigue" element={<></>} />
        <Route path="/concern/dry-eyes" element={<></>} />
        <Route path="/concern/conjunctivitis" element={<></>} />
        <Route path="/concern/eye-redness-itching" element={<></>} />
        <Route path="/concern/stye-chalazion" element={<></>} />
        <Route path="/concern/vision-weakness" element={<></>} />
        <Route path="/concern/watering-eyes" element={<></>} />
        <Route path="/concern/light-sensitivity" element={<></>} />
        
        <Route path="/concern/hair-fall-loss" element={<></>} />
        <Route path="/concern/dandruff" element={<></>} />
        <Route path="/concern/premature-greying" element={<></>} />
        <Route path="/concern/scalp-itching-infections" element={<></>} />
        <Route path="/concern/alopecia-areata" element={<></>} />
        <Route path="/concern/thinning-hair" element={<></>} />
        <Route path="/concern/postpartum-hair-fall" element={<></>} />
        
        <Route path="/concern/recurrent-colds-cough" element={<></>} />
        <Route path="/concern/frequent-infections" element={<></>} />
        <Route path="/concern/low-energy-levels" element={<></>} />
        <Route path="/concern/post-illness-recovery" element={<></>} />
        <Route path="/concern/childrens-immunity-drops" element={<></>} />
        <Route path="/concern/elderly-immune-support" element={<></>} />
        
        {/* Add new health concern category routes */}
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
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
