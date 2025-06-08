
import React from 'react';
import { Route } from 'react-router-dom';

import {
  LifestyleCare,
  MuscleCare,
  MentalHealth,
  NutritiveCare,
  PainCare,
  ReproductiveCare,
  RespiratoryCare,
  SkinCare,
  ToothCare,
  UrologyCare,
  WeightManagement,
  InsomniaPage,
  JointPainArthritis,
  HeadachesMigraines,
  AsthmaPage,
  AllergiesHayFever,
  Acne,
  EczemaPage,
  SkinConditions,
  FungalInfections,
  AnxietyStress,
  DepressionMood,
  PanicDisorderPage,
  ConvalescenceRemedies,
  UrinaryTractInfections
} from './HealthConcernImports';

export const SpecialtyHealthRoutes = () => (
  <>
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
    <Route path="/diseases-conditions/respiratory-care/dry-cough-wet-cough" element={<RespiratoryCare />} />
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
  </>
);
