
import React from 'react';
import { Route } from 'react-router-dom';

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
  UrologyCare,
  DustAllergy,
  DrugAllergies,
  PetDanderAllergy,
  MoldAllergy,
  LatexAllergy,
  SinusAllergy,
  ChemotherapySideEffects,
  Palpitations
} from './HealthConcernImports';

export const HealthConcernRoutes = () => (
  <>
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
    <Route path="/diseases-conditions/allergies/dust-allergy" element={<DustAllergy />} />
    <Route path="/diseases-conditions/allergies/food-allergies-milk-gluten-nuts" element={<FoodAllergiesPage />} />
    <Route path="/diseases-conditions/allergies/drug-allergies" element={<DrugAllergies />} />
    <Route path="/diseases-conditions/allergies/skin-allergies-hives-eczema-urticaria" element={<EczemaPage />} />
    <Route path="/diseases-conditions/allergies/allergic-rhinitis" element={<AllergiesHayFever />} />
    <Route path="/diseases-conditions/allergies/pet-dander-allergy" element={<PetDanderAllergy />} />
    <Route path="/diseases-conditions/allergies/mold-allergy" element={<MoldAllergy />} />
    <Route path="/diseases-conditions/allergies/latex-allergy" element={<LatexAllergy />} />
    <Route path="/diseases-conditions/allergies/sinus-allergy" element={<SinusAllergy />} />

    {/* Cancer Routes */}
    <Route path="/diseases-conditions/cancer/chemotherapy-side-effects-nausea-fatigue" element={<ChemotherapySideEffects />} />
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
    <Route path="/diseases-conditions/heart-health/palpitations" element={<Palpitations />} />
    <Route path="/diseases-conditions/heart-health/angina-pectoris-chest-pain" element={<HeartHealth />} />
    <Route path="/diseases-conditions/heart-health/poor-circulation" element={<HeartHealth />} />
    <Route path="/diseases-conditions/heart-health/varicose-veins" element={<HeartHealth />} />
    <Route path="/diseases-conditions/heart-health/arrhythmias-irregular-heartbeat" element={<HeartHealth />} />
    <Route path="/diseases-conditions/heart-health/post-heart-attack-recovery-support" element={<HeartHealth />} />

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
  </>
);
