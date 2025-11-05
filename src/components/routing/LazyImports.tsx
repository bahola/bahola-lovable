
import React from 'react';

// Critical pages loaded immediately
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Lazy load non-critical pages for better performance
export const Shop = React.lazy(() => import('@/pages/Shop'));
export const About = React.lazy(() => import('@/pages/About'));
export const CategoryPage = React.lazy(() => import('@/pages/CategoryPage'));
export const CategoryOverview = React.lazy(() => import('@/pages/CategoryOverview'));
export const ProductPage = React.lazy(() => import('@/pages/ProductPage'));
export const Contact = React.lazy(() => import('@/pages/Contact'));
export const Register = React.lazy(() => import('@/pages/Register'));
export const Login = React.lazy(() => import('@/pages/Login'));
export const FAQ = React.lazy(() => import('@/pages/FAQ'));
export const UserAccount = React.lazy(() => import('@/pages/UserAccount'));
export const VideoConsultation = React.lazy(() => import('@/pages/VideoConsultation'));
export const AppointmentBooking = React.lazy(() => import('@/pages/AppointmentBooking'));
export const PrivacyPolicy = React.lazy(() => import('@/pages/PrivacyPolicy'));
export const TermsConditions = React.lazy(() => import('@/pages/TermsConditions'));
export const ReturnPolicy = React.lazy(() => import('@/pages/ReturnPolicy'));
export const ShippingInfo = React.lazy(() => import('@/pages/ShippingInfo'));
export const Consultation = React.lazy(() => import('@/pages/Consultation'));
export const Homeopathy = React.lazy(() => import('@/pages/Homeopathy'));
export const HelpCenter = React.lazy(() => import('@/pages/HelpCenter'));
export const StoreLocator = React.lazy(() => import('@/pages/StoreLocator'));
export const AdminDashboard = React.lazy(() => import('@/pages/AdminDashboard'));
export const AdminHome = React.lazy(() => import('@/pages/admin/AdminHome'));
export const PagesManagement = React.lazy(() => import('@/pages/admin/PagesManagement'));
export const HelpCenterManagement = React.lazy(() => import('@/pages/admin/HelpCenterManagement'));
export const DoctorSchedule = React.lazy(() => import('@/pages/DoctorSchedule'));
export const HealthConcerns = React.lazy(() => import('@/pages/HealthConcerns'));
export const Sitemap = React.lazy(() => import('@/pages/Sitemap'));
export const Cart = React.lazy(() => import('@/pages/Cart'));
export const Wishlist = React.lazy(() => import('@/pages/Wishlist'));
export const OrderTracking = React.lazy(() => import('@/pages/OrderTracking'));
export const Reviews = React.lazy(() => import('@/pages/Reviews'));
export const PromoOffers = React.lazy(() => import('@/pages/PromoOffers'));

// Lazy load help center pages
export const GettingStarted = React.lazy(() => import('@/pages/help-center/GettingStarted'));
export const PotencyGuide = React.lazy(() => import('@/pages/help-center/PotencyGuide'));
export const UsingPellets = React.lazy(() => import('@/pages/help-center/UsingPellets'));
export const FirstAidKit = React.lazy(() => import('@/pages/help-center/FirstAidKit'));
export const LiquidRemediesTroubleshooting = React.lazy(() => import('@/pages/help-center/LiquidRemediesTroubleshooting'));
export const NoResultsTroubleshooting = React.lazy(() => import('@/pages/help-center/NoResultsTroubleshooting'));
export const ChildrenSafety = React.lazy(() => import('@/pages/help-center/ChildrenSafety'));
export const RemedyInteractions = React.lazy(() => import('@/pages/help-center/RemedyInteractions'));
export const BachFlowerSelector = React.lazy(() => import('@/pages/help-center/BachFlowerSelector'));
export const SeasonalRemedies = React.lazy(() => import('@/pages/help-center/SeasonalRemedies'));
export const ShippingIssues = React.lazy(() => import('@/pages/help-center/ShippingIssues'));
export const Certifications = React.lazy(() => import('@/pages/help-center/Certifications'));

// Import BachFlowerConcerns component for new route
export const BachFlowerConcerns = React.lazy(() => import('@/pages/BachFlowerConcerns'));

// Add the new lazy import for AllergiesProductsPage
export const AllergiesProductsPage = React.lazy(() => import('@/pages/AllergiesProductsPage'));

// Add the new lazy import for InfectiousDiseasesPage
export const InfectiousDiseasesPage = React.lazy(() => import('@/pages/health-concerns/InfectiousDiseasesPage'));

// Add the new lazy import for LifestyleCategoryPage
export const LifestyleCategoryPage = React.lazy(() => import('@/pages/health-concerns/LifestyleCategoryPage'));

// Add the new lazy import for MuscleJointCategoryPage
export const MuscleJointCategoryPage = React.lazy(() => import('@/pages/health-concerns/MuscleJointCategoryPage'));

// Add the new lazy import for MentalHealthCategoryPage
export const MentalHealthCategoryPage = React.lazy(() => import('@/pages/health-concerns/MentalHealthCategoryPage'));

// Add the new lazy import for NutritiveCategoryPage
export const NutritiveCategoryPage = React.lazy(() => import('@/pages/health-concerns/NutritiveCategoryPage'));

// Add the new lazy import for PainCareCategoryPage
export const PainCareCategoryPage = React.lazy(() => import('@/pages/health-concerns/PainCareCategoryPage'));

// Add the new lazy import for ReproductiveCareCategoryPage
export const ReproductiveCareCategoryPage = React.lazy(() => import('@/pages/health-concerns/ReproductiveCareCategoryPage'));

// Add the new lazy import for RespiratoryCareCategoryPage
export const RespiratoryCareCategoryPage = React.lazy(() => import('@/pages/health-concerns/RespiratoryCareCategoryPage'));

// Add the new lazy import for SkinCareCategoryPage
export const SkinCareCategoryPage = React.lazy(() => import('@/pages/health-concerns/SkinCareCategoryPage'));

// Add the new lazy import for ToothCareCategoryPage
export const ToothCareCategoryPage = React.lazy(() => import('@/pages/health-concerns/ToothCareCategoryPage'));

// Add the new lazy import for UrinaryCareCategoryPage
export const UrinaryCareCategoryPage = React.lazy(() => import('@/pages/health-concerns/UrinaryCareCategoryPage'));

// Professional routes
export const MateriaMedica = React.lazy(() => import('@/pages/professional/MateriaMedica'));
export const BryoniaRhus = React.lazy(() => import('@/pages/professional/BryoniaRhus'));
export const PulsatillaSepia = React.lazy(() => import('@/pages/professional/PulsatillaSepia'));
export const LachesisPulsatilla = React.lazy(() => import('@/pages/professional/LachesisPulsatilla'));
export const NuxVomicaSulphur = React.lazy(() => import('@/pages/professional/NuxVomicaSulphur'));
export const ApisCantharis = React.lazy(() => import('@/pages/professional/ApisCantharis'));
export const PhosphorusArsenicum = React.lazy(() => import('@/pages/professional/PhosphorusArsenicum'));
export const HeparMercurius = React.lazy(() => import('@/pages/professional/HeparMercurius'));
export const BelladonnaGlonoinum = React.lazy(() => import('@/pages/professional/BelladonnaGlonoinum'));
export const CalcareaNatrum = React.lazy(() => import('@/pages/professional/CalcareaNatrum'));
export const GelsemiumBaptisia = React.lazy(() => import('@/pages/professional/GelsemiumBaptisia'));

// Export critical pages that are not lazy-loaded
export { Index, NotFound };
