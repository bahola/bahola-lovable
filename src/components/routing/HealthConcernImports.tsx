
import React from 'react';

// Lazy load health concern pages
export const AnxietyStress = React.lazy(() => import('@/pages/health-concerns/AnxietyStress'));
export const InsomniaPage = React.lazy(() => import('@/pages/health-concerns/InsomniaPage'));
export const DigestiveIssues = React.lazy(() => import('@/pages/health-concerns/DigestiveIssues'));
export const AllergiesHayFever = React.lazy(() => import('@/pages/health-concerns/AllergiesHayFever'));
export const HeadachesMigraines = React.lazy(() => import('@/pages/health-concerns/HeadachesMigraines'));
export const SkinConditions = React.lazy(() => import('@/pages/health-concerns/SkinConditions'));
export const ColdFlu = React.lazy(() => import('@/pages/health-concerns/ColdFlu'));
export const JointPainArthritis = React.lazy(() => import('@/pages/health-concerns/JointPainArthritis'));
export const WomensHealth = React.lazy(() => import('@/pages/health-concerns/WomensHealth'));
export const ChildrensHealth = React.lazy(() => import('@/pages/health-concerns/ChildrensHealth'));
export const DepressionMood = React.lazy(() => import('@/pages/health-concerns/DepressionMood'));
export const WeightManagement = React.lazy(() => import('@/pages/health-concerns/WeightManagement'));
export const EyeProblems = React.lazy(() => import('@/pages/health-concerns/EyeProblems'));
export const HighBloodPressure = React.lazy(() => import('@/pages/health-concerns/HighBloodPressure'));
export const DiabetesSupport = React.lazy(() => import('@/pages/health-concerns/DiabetesSupport'));

// Add new lazy imports for disease-specific pages
export const AsthmaPage = React.lazy(() => import('@/pages/health-concerns/allergies/AsthmaPage'));
export const EczemaPage = React.lazy(() => import('@/pages/health-concerns/allergies/EczemaPage'));
export const FoodAllergiesPage = React.lazy(() => import('@/pages/health-concerns/allergies/FoodAllergiesPage'));
export const PanicDisorderPage = React.lazy(() => import('@/pages/health-concerns/anxiety/PanicDisorderPage'));
export const GeneralizedAnxietyPage = React.lazy(() => import('@/pages/health-concerns/anxiety/GeneralizedAnxietyPage'));
export const IBSPage = React.lazy(() => import('@/pages/health-concerns/digestive/IBSPage'));

// Add lazy imports for infection-related pages
export const BacterialInfections = React.lazy(() => import('@/pages/health-concerns/BacterialInfections'));
export const ViralInfections = React.lazy(() => import('@/pages/health-concerns/ViralInfections'));
export const FungalInfections = React.lazy(() => import('@/pages/health-concerns/FungalInfections'));
export const UrinaryTractInfections = React.lazy(() => import('@/pages/health-concerns/UrinaryTractInfections'));
export const SkinInfections = React.lazy(() => import('@/pages/health-concerns/SkinInfections'));
export const EarSinusInfections = React.lazy(() => import('@/pages/health-concerns/EarSinusInfections'));
export const RecurrentFevers = React.lazy(() => import('@/pages/health-concerns/RecurrentFevers'));
export const FeverWithChills = React.lazy(() => import('@/pages/health-concerns/FeverWithChills'));

export const SeasonalAllergies = React.lazy(() => import('@/pages/health-concerns/SeasonalAllergies'));
export const Teething = React.lazy(() => import('@/pages/health-concerns/Teething'));
export const Acne = React.lazy(() => import('@/pages/health-concerns/Acne'));
export const Diarrhoea = React.lazy(() => import('@/pages/health-concerns/Diarrhoea'));
export const Gastritis = React.lazy(() => import('@/pages/health-concerns/Gastritis'));
export const ChronicRhinitis = React.lazy(() => import('@/pages/health-concerns/ChronicRhinitis'));
export const BreastTenderness = React.lazy(() => import('@/pages/health-concerns/BreastTenderness'));
export const FibroidsSupportive = React.lazy(() => import('@/pages/health-concerns/FibroidsSupportive'));
export const GeneralWeakness = React.lazy(() => import('@/pages/health-concerns/GeneralWeakness'));
export const ConvalescenceRemedies = React.lazy(() => import('@/pages/health-concerns/ConvalescenceRemedies'));

// Add new lazy imports for category pages
export const AllergyCare = React.lazy(() => import('@/pages/health-concerns/AllergyCare'));
export const GutHealth = React.lazy(() => import('@/pages/health-concerns/GutHealth'));
export const HeartHealth = React.lazy(() => import('@/pages/health-concerns/HeartHealth'));
export const ChildCare = React.lazy(() => import('@/pages/health-concerns/ChildCare'));
export const CancerSupport = React.lazy(() => import('@/pages/health-concerns/CancerSupport'));
export const AnxietyMentalHealth = React.lazy(() => import('@/pages/health-concerns/AnxietyMentalHealth'));
export const ENTCare = React.lazy(() => import('@/pages/health-concerns/ENTCare'));
export const EyeCare = React.lazy(() => import('@/pages/health-concerns/EyeCare'));
export const HairCare = React.lazy(() => import('@/pages/health-concerns/HairCare'));
export const ImmuneBoosters = React.lazy(() => import('@/pages/health-concerns/ImmuneBoosters'));
export const InfectionCare = React.lazy(() => import('@/pages/health-concerns/InfectionCare'));
export const LifestyleCare = React.lazy(() => import('@/pages/health-concerns/LifestyleCare'));
export const MentalHealth = React.lazy(() => import('@/pages/health-concerns/MentalHealth'));
export const MuscleCare = React.lazy(() => import('@/pages/health-concerns/MuscleCare'));
export const NutritiveCare = React.lazy(() => import('@/pages/health-concerns/NutritiveCare'));
export const PainCare = React.lazy(() => import('@/pages/health-concerns/PainCare'));
export const ReproductiveCare = React.lazy(() => import('@/pages/health-concerns/ReproductiveCare'));
export const RespiratoryCare = React.lazy(() => import('@/pages/health-concerns/RespiratoryCare'));
export const SkinCare = React.lazy(() => import('@/pages/health-concerns/SkinCare'));
export const SpecialtyCare = React.lazy(() => import('@/pages/health-concerns/SpecialtyCare'));
export const ToothCare = React.lazy(() => import('@/pages/health-concerns/ToothCare'));
export const UrologyCare = React.lazy(() => import('@/pages/health-concerns/UrologyCare'));

// Add new missing allergy pages
export const DustAllergy = React.lazy(() => import('@/pages/health-concerns/DustAllergy'));
export const DrugAllergies = React.lazy(() => import('@/pages/health-concerns/DrugAllergies'));
export const PetDanderAllergy = React.lazy(() => import('@/pages/health-concerns/PetDanderAllergy'));
export const MoldAllergy = React.lazy(() => import('@/pages/health-concerns/MoldAllergy'));
export const LatexAllergy = React.lazy(() => import('@/pages/health-concerns/LatexAllergy'));
export const SinusAllergy = React.lazy(() => import('@/pages/health-concerns/SinusAllergy'));

// Add new cancer pages
export const ChemotherapySideEffects = React.lazy(() => import('@/pages/health-concerns/ChemotherapySideEffects'));

// Add new heart health pages
export const Palpitations = React.lazy(() => import('@/pages/health-concerns/Palpitations'));
