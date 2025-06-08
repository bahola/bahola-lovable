
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
        
        {/* Health Concern Category Routes */}
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

        {/* NEW HIERARCHICAL ROUTES - Allergies */}
        <Route path="/diseases-conditions/allergies/seasonal-allergies-hay-fever" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/allergies/dust-allergy" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/allergies/food-allergies-milk-gluten-nuts" element={<FoodAllergiesPage />} />
        <Route path="/diseases-conditions/allergies/drug-allergies" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/allergies/skin-allergies-hives-eczema-urticaria" element={<EczemaPage />} />
        <Route path="/diseases-conditions/allergies/allergic-rhinitis" element={<AllergiesHayFever />} />
        <Route path="/diseases-conditions/allergies/pet-dander-allergy" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/allergies/mold-allergy" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/allergies/latex-allergy" element={<SeasonalAllergies />} />
        <Route path="/diseases-conditions/allergies/sinus-allergy" element={<SeasonalAllergies />} />

        {/* Cancer Routes */}
        <Route path="/diseases-conditions/cancer/chemotherapy-side-effects-nausea-fatigue" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/radiation-skin-reactions" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/cancer-related-fatigue" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/immune-weakness-in-cancer-patients" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/loss-of-appetite" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/mouth-ulcers-from-cancer-treatment" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/lymphedema-support" element={<CancerSupport />} />
        <Route path="/diseases-conditions/cancer/anxiety-or-sleep-disorders-during-cancer" element={<CancerSupport />} />

        {/* Heart Health Routes */}
        <Route path="/diseases-conditions/heart-health/high-blood-pressure-hypertension" element={<HighBloodPressure />} />
        <Route path="/diseases-conditions/heart-health/high-cholesterol-hyperlipidemia" element={<HeartHealth />} />
        <Route path="/diseases-conditions/heart-health/palpitations" element={<HeartHealth />} />
        <Route path="/diseases-conditions/heart-health/angina-pectoris-chest-pain" element={<HeartHealth />} />
        <Route path="/diseases-conditions/heart-health/poor-circulation" element={<HeartHealth />} />
        <Route path="/diseases-conditions/heart-health/varicose-veins" element={<HeartHealth />} />
        <Route path="/diseases-conditions/heart-health/arrhythmias-irregular-heartbeat" element={<HeartHealth />} />
        <Route path="/diseases-conditions/heart-health/post-heart-attack-recovery-support" element={<HeartHealth />} />

        {/* Child Care Routes */}
        <Route path="/diseases-conditions/child-care/teething-troubles" element={<Teething />} />
        <Route path="/diseases-conditions/child-care/colic" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/diaper-rash" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/childhood-constipation" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/growth-and-appetite-issues" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/bedwetting-enuresis" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/childhood-allergies" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/recurrent-colds-and-cough" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/worm-infestation" element={<ChildCare />} />
        <Route path="/diseases-conditions/child-care/temper-tantrums-hyperactivity" element={<ChildCare />} />

        {/* Ear, Nose, Throat Routes */}
        <Route path="/diseases-conditions/ear,-nose,-throat/earache-otitis-media" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/sinusitis" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/tonsillitis" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/sore-throat" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/nasal-polyps" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/chronic-rhinitis" element={<ChronicRhinitis />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/nose-bleeds-epistaxis" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/tinnitus" element={<ENTCare />} />
        <Route path="/diseases-conditions/ear,-nose,-throat/loss-of-voice-laryngitis" element={<ENTCare />} />

        {/* Eye Care Routes */}
        <Route path="/diseases-conditions/eye-care/eye-strain-digital-eye-fatigue" element={<EyeProblems />} />
        <Route path="/diseases-conditions/eye-care/dry-eyes" element={<EyeCare />} />
        <Route path="/diseases-conditions/eye-care/conjunctivitis" element={<EyeCare />} />
        <Route path="/diseases-conditions/eye-care/redness-and-itching-of-eyes" element={<EyeCare />} />
        <Route path="/diseases-conditions/eye-care/stye-chalazion" element={<EyeCare />} />
        <Route path="/diseases-conditions/eye-care/vision-weakness-supportive-care" element={<EyeCare />} />
        <Route path="/diseases-conditions/eye-care/watering-eyes" element={<EyeCare />} />
        <Route path="/diseases-conditions/eye-care/sensitivity-to-light" element={<EyeCare />} />

        {/* Gut Health Routes */}
        <Route path="/diseases-conditions/gut-health/acidity-gerd" element={<DigestiveIssues />} />
        <Route path="/diseases-conditions/gut-health/constipation" element={<GutHealth />} />
        <Route path="/diseases-conditions/gut-health/ibs-irritable-bowel-syndrome" element={<IBSPage />} />
        <Route path="/diseases-conditions/gut-health/diarrhoea" element={<Diarrhoea />} />
        <Route path="/diseases-conditions/gut-health/bloating-flatulence" element={<GutHealth />} />
        <Route path="/diseases-conditions/gut-health/indigestion" element={<GutHealth />} />
        <Route path="/diseases-conditions/gut-health/gastritis" element={<Gastritis />} />
        <Route path="/diseases-conditions/gut-health/nausea-vomiting" element={<GutHealth />} />
        <Route path="/diseases-conditions/gut-health/loss-of-appetite" element={<GutHealth />} />
        <Route path="/diseases-conditions/gut-health/worms" element={<GutHealth />} />

        {/* Women's Care Routes */}
        <Route path="/diseases-conditions/women's-care/irregular-periods-menstrual-irregularities" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/pcos/pcod" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/menopause-support" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/premenstrual-syndrome-pms" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/leucorrhoea-vaginal-discharge" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/painful-periods-dysmenorrhoea" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/fibroids-supportive-care" element={<FibroidsSupportive />} />
        <Route path="/diseases-conditions/women's-care/breast-tenderness" element={<BreastTenderness />} />
        <Route path="/diseases-conditions/women's-care/infertility-supportive-role" element={<WomensHealth />} />
        <Route path="/diseases-conditions/women's-care/lactation-issues" element={<WomensHealth />} />

        {/* Hair Care Routes */}
        <Route path="/diseases-conditions/hair-care/hair-fall-hair-loss" element={<HairCare />} />
        <Route path="/diseases-conditions/hair-care/dandruff" element={<HairCare />} />
        <Route path="/diseases-conditions/hair-care/premature-greying" element={<HairCare />} />
        <Route path="/diseases-conditions/hair-care/scalp-itching-infections" element={<HairCare />} />
        <Route path="/diseases-conditions/hair-care/alopecia-areata" element={<HairCare />} />
        <Route path="/diseases-conditions/hair-care/thinning-hair" element={<HairCare />} />
        <Route path="/diseases-conditions/hair-care/postpartum-hair-fall" element={<HairCare />} />

        {/* Immune Boosters Routes */}
        <Route path="/diseases-conditions/immune-boosters/recurrent-colds-cough" element={<ImmuneBoosters />} />
        <Route path="/diseases-conditions/immune-boosters/frequent-infections" element={<ImmuneBoosters />} />
        <Route path="/diseases-conditions/immune-boosters/low-energy-levels" element={<ImmuneBoosters />} />
        <Route path="/diseases-conditions/immune-boosters/post-illness-recovery" element={<ImmuneBoosters />} />
        <Route path="/diseases-conditions/immune-boosters/general-weakness" element={<GeneralWeakness />} />
        <Route path="/diseases-conditions/immune-boosters/convalescence-remedies" element={<ConvalescenceRemedies />} />
        <Route path="/diseases-conditions/immune-boosters/children's-immunity-drops" element={<ImmuneBoosters />} />
        <Route path="/diseases-conditions/immune-boosters/elderly-immune-support" element={<ImmuneBoosters />} />

        {/* Infection Routes */}
        <Route path="/diseases-conditions/infection/bacterial-infections-boils-abscesses" element={<BacterialInfections />} />
        <Route path="/diseases-conditions/infection/viral-infections-flu-warts-cold-sores" element={<ViralInfections />} />
        <Route path="/diseases-conditions/infection/fungal-infections-ringworm-candidiasis" element={<FungalInfections />} />
        <Route path="/diseases-conditions/infection/urinary-tract-infections-utis" element={<UrinaryTractInfections />} />
        <Route path="/diseases-conditions/infection/skin-infections" element={<SkinInfections />} />
        <Route path="/diseases-conditions/infection/ear-sinus-infections" element={<EarSinusInfections />} />
        <Route path="/diseases-conditions/infection/recurrent-fevers" element={<RecurrentFevers />} />
        <Route path="/diseases-conditions/infection/fever-with-chills-intermittent-fever" element={<FeverWithChills />} />

        {/* Lifestyle Routes */}
        <Route path="/diseases-conditions/lifestyle/obesity-weight-gain" element={<WeightManagement />} />
        <Route path="/diseases-conditions/lifestyle/smoking-cessation-support" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle/fatigue-burnout" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle/jet-lag-recovery" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle/sleep-disorders" element={<InsomniaPage />} />
        <Route path="/diseases-conditions/lifestyle/sedentary-lifestyle-issues" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle/travel-digestive-issues" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle/detox-liver-cleanse" element={<LifestyleCare />} />
        <Route path="/diseases-conditions/lifestyle/chronic-inflammation" element={<LifestyleCare />} />

        {/* Muscle & Joint Care Routes */}
        <Route path="/diseases-conditions/muscle-joint-care/rheumatoid-arthritis" element={<JointPainArthritis />} />
        <Route path="/diseases-conditions/muscle-joint-care/osteoarthritis" element={<JointPainArthritis />} />
        <Route path="/diseases-conditions/muscle-joint-care/back-pain" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/neck-pain-spondylosis" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/muscle-cramps" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/fibromyalgia" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/sports-injuries" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/frozen-shoulder" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/gout" element={<MuscleCare />} />
        <Route path="/diseases-conditions/muscle-joint-care/sciatica" element={<MuscleCare />} />

        {/* Mental Health Routes */}
        <Route path="/diseases-conditions/mental-health/anxiety" element={<AnxietyStress />} />
        <Route path="/diseases-conditions/mental-health/depression" element={<DepressionMood />} />
        <Route path="/diseases-conditions/mental-health/sleep-disorders-insomnia" element={<InsomniaPage />} />
        <Route path="/diseases-conditions/mental-health/stress" element={<AnxietyStress />} />
        <Route path="/diseases-conditions/mental-health/lack-of-concentration" element={<MentalHealth />} />
        <Route path="/diseases-conditions/mental-health/panic-attacks" element={<PanicDisorderPage />} />
        <Route path="/diseases-conditions/mental-health/restlessness-irritability" element={<MentalHealth />} />
        <Route path="/diseases-conditions/mental-health/mood-swings" element={<DepressionMood />} />
        <Route path="/diseases-conditions/mental-health/performance-anxiety" element={<AnxietyStress />} />
        <Route path="/diseases-conditions/mental-health/exam-stress-in-children" element={<MentalHealth />} />

        {/* Nutritive Routes */}
        <Route path="/diseases-conditions/nutritive/general-debility" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/malnutrition" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/poor-appetite" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/post-illness-nutrition-support" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/protein-deficiency" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/vitamin-and-mineral-support" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/convalescence" element={<ConvalescenceRemedies />} />
        <Route path="/diseases-conditions/nutritive/nutrition-in-pregnancy-and-lactation" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/growth-supplements-for-children" element={<NutritiveCare />} />
        <Route path="/diseases-conditions/nutritive/menopausal-nutrition" element={<NutritiveCare />} />

        {/* Pain Care Routes */}
        <Route path="/diseases-conditions/pain-care/headaches-and-migraines" element={<HeadachesMigraines />} />
        <Route path="/diseases-conditions/pain-care/joint-pain" element={<JointPainArthritis />} />
        <Route path="/diseases-conditions/pain-care/sciatic-pain" element={<PainCare />} />
        <Route path="/diseases-conditions/pain-care/menstrual-cramps" element={<PainCare />} />
        <Route path="/diseases-conditions/pain-care/dental-pain" element={<PainCare />} />
        <Route path="/diseases-conditions/pain-care/muscle-pain-myalgia" element={<PainCare />} />
        <Route path="/diseases-conditions/pain-care/back-pain" element={<PainCare />} />
        <Route path="/diseases-conditions/pain-care/fibromyalgia" element={<PainCare />} />
        <Route path="/diseases-conditions/pain-care/chronic-pain-syndrome" element={<PainCare />} />

        {/* Reproductive Care Routes */}
        <Route path="/diseases-conditions/reproductive-care/male-infertility-low-sperm-count-libido" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/female-infertility-irregular-ovulation-pcos" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/erectile-dysfunction" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/premature-ejaculation" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/menstrual-health" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/painful-intercourse" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/hormonal-imbalances" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/sexual-debility" element={<ReproductiveCare />} />
        <Route path="/diseases-conditions/reproductive-care/libido-enhancers-both-genders" element={<ReproductiveCare />} />

        {/* Respiratory Care Routes */}
        <Route path="/diseases-conditions/respiratory-care/asthma" element={<AsthmaPage />} />
        <Route path="/diseases-conditions/respiratory-care/chronic-bronchitis" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/respiratory-care/allergic-rhinitis" element={<AllergiesHayFever />} />
        <Route path="/diseases-conditions/respiratory-care/sinusitis" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/respiratory-care/wheezing" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/respiratory-care/dry-cough-wet-cough" element={<ColdFlu />} />
        <Route path="/diseases-conditions/respiratory-care/copd-supportive-care" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/respiratory-care/breathlessness" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/respiratory-care/recurrent-cold-and-cough" element={<RespiratoryCare />} />
        <Route path="/diseases-conditions/respiratory-care/nasal-block-deviated-septum-support" element={<RespiratoryCare />} />

        {/* Skin Care Routes */}
        <Route path="/diseases-conditions/skin-care/acne-pimples" element={<Acne />} />
        <Route path="/diseases-conditions/skin-care/eczema-dermatitis" element={<EczemaPage />} />
        <Route path="/diseases-conditions/skin-care/psoriasis-supportive-care" element={<SkinConditions />} />
        <Route path="/diseases-conditions/skin-care/fungal-infections" element={<FungalInfections />} />
        <Route path="/diseases-conditions/skin-care/skin-allergy-itching" element={<SkinConditions />} />
        <Route path="/diseases-conditions/skin-care/urticaria" element={<SkinConditions />} />
        <Route path="/diseases-conditions/skin-care/warts" element={<SkinConditions />} />
        <Route path="/diseases-conditions/skin-care/pigmentation" element={<SkinCare />} />
        <Route path="/diseases-conditions/skin-care/dry-skin" element={<SkinCare />} />
        <Route path="/diseases-conditions/skin-care/corns-calluses" element={<SkinCare />} />

        {/* Tooth Care Routes */}
        <Route path="/diseases-conditions/tooth-care/toothache" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/bleeding-gums" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/pyorrhoea" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/dental-abscess" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/mouth-ulcers" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/bad-breath-halitosis" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/sensitive-teeth" element={<ToothCare />} />
        <Route path="/diseases-conditions/tooth-care/teeth-grinding-bruxism" element={<ToothCare />} />

        {/* Urinary Care Routes */}
        <Route path="/diseases-conditions/urinary-care/urinary-tract-infection-uti" element={<UrinaryTractInfections />} />
        <Route path="/diseases-conditions/urinary-care/bedwetting" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/frequent-urination" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/burning-urination" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/kidney-stone-support" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/bladder-spasms" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/incontinence" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/prostate-enlargement-bph" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/cystitis" element={<UrologyCare />} />
        <Route path="/diseases-conditions/urinary-care/nephrotic-syndrome-supportive" element={<UrologyCare />} />

        {/* Legacy routes for backward compatibility */}
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
