
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

export const getSpecialtyHealthRoutes = () => [
  // Lifestyle Routes
  <Route key="obesity-weight-gain" path="/diseases-conditions/lifestyle/obesity-weight-gain" element={<WeightManagement />} />,
  <Route key="smoking-cessation" path="/diseases-conditions/lifestyle/smoking-cessation-support" element={<LifestyleCare />} />,
  <Route key="fatigue-burnout" path="/diseases-conditions/lifestyle/fatigue-burnout" element={<LifestyleCare />} />,
  <Route key="jet-lag" path="/diseases-conditions/lifestyle/jet-lag-recovery" element={<LifestyleCare />} />,
  <Route key="sleep-disorders" path="/diseases-conditions/lifestyle/sleep-disorders" element={<InsomniaPage />} />,
  <Route key="sedentary-lifestyle" path="/diseases-conditions/lifestyle/sedentary-lifestyle-issues" element={<LifestyleCare />} />,
  <Route key="travel-digestive" path="/diseases-conditions/lifestyle/travel-digestive-issues" element={<LifestyleCare />} />,
  <Route key="detox-liver" path="/diseases-conditions/lifestyle/detox-liver-cleanse" element={<LifestyleCare />} />,
  <Route key="chronic-inflammation" path="/diseases-conditions/lifestyle/chronic-inflammation" element={<LifestyleCare />} />,

  // Muscle & Joint Care Routes
  <Route key="rheumatoid-arthritis" path="/diseases-conditions/muscle-joint-care/rheumatoid-arthritis" element={<JointPainArthritis />} />,
  <Route key="osteoarthritis" path="/diseases-conditions/muscle-joint-care/osteoarthritis" element={<JointPainArthritis />} />,
  <Route key="back-pain" path="/diseases-conditions/muscle-joint-care/back-pain" element={<MuscleCare />} />,
  <Route key="neck-pain" path="/diseases-conditions/muscle-joint-care/neck-pain-spondylosis" element={<MuscleCare />} />,
  <Route key="muscle-cramps" path="/diseases-conditions/muscle-joint-care/muscle-cramps" element={<MuscleCare />} />,
  <Route key="fibromyalgia" path="/diseases-conditions/muscle-joint-care/fibromyalgia" element={<MuscleCare />} />,
  <Route key="sports-injuries" path="/diseases-conditions/muscle-joint-care/sports-injuries" element={<MuscleCare />} />,
  <Route key="frozen-shoulder" path="/diseases-conditions/muscle-joint-care/frozen-shoulder" element={<MuscleCare />} />,
  <Route key="gout" path="/diseases-conditions/muscle-joint-care/gout" element={<MuscleCare />} />,
  <Route key="sciatica" path="/diseases-conditions/muscle-joint-care/sciatica" element={<MuscleCare />} />,

  // Mental Health Routes
  <Route key="anxiety" path="/diseases-conditions/mental-health/anxiety" element={<AnxietyStress />} />,
  <Route key="depression" path="/diseases-conditions/mental-health/depression" element={<DepressionMood />} />,
  <Route key="sleep-disorders-insomnia" path="/diseases-conditions/mental-health/sleep-disorders-insomnia" element={<InsomniaPage />} />,
  <Route key="stress" path="/diseases-conditions/mental-health/stress" element={<AnxietyStress />} />,
  <Route key="lack-concentration" path="/diseases-conditions/mental-health/lack-of-concentration" element={<MentalHealth />} />,
  <Route key="panic-attacks" path="/diseases-conditions/mental-health/panic-attacks" element={<PanicDisorderPage />} />,
  <Route key="restlessness" path="/diseases-conditions/mental-health/restlessness-irritability" element={<MentalHealth />} />,
  <Route key="mood-swings" path="/diseases-conditions/mental-health/mood-swings" element={<DepressionMood />} />,
  <Route key="performance-anxiety" path="/diseases-conditions/mental-health/performance-anxiety" element={<AnxietyStress />} />,
  <Route key="exam-stress" path="/diseases-conditions/mental-health/exam-stress-in-children" element={<MentalHealth />} />,

  // Nutritive Routes
  <Route key="general-debility" path="/diseases-conditions/nutritive/general-debility" element={<NutritiveCare />} />,
  <Route key="malnutrition" path="/diseases-conditions/nutritive/malnutrition" element={<NutritiveCare />} />,
  <Route key="poor-appetite" path="/diseases-conditions/nutritive/poor-appetite" element={<NutritiveCare />} />,
  <Route key="post-illness-nutrition" path="/diseases-conditions/nutritive/post-illness-nutrition-support" element={<NutritiveCare />} />,
  <Route key="protein-deficiency" path="/diseases-conditions/nutritive/protein-deficiency" element={<NutritiveCare />} />,
  <Route key="vitamin-mineral" path="/diseases-conditions/nutritive/vitamin-and-mineral-support" element={<NutritiveCare />} />,
  <Route key="convalescence" path="/diseases-conditions/nutritive/convalescence" element={<ConvalescenceRemedies />} />,
  <Route key="nutrition-pregnancy" path="/diseases-conditions/nutritive/nutrition-in-pregnancy-and-lactation" element={<NutritiveCare />} />,
  <Route key="growth-supplements" path="/diseases-conditions/nutritive/growth-supplements-for-children" element={<NutritiveCare />} />,
  <Route key="menopausal-nutrition" path="/diseases-conditions/nutritive/menopausal-nutrition" element={<NutritiveCare />} />,

  // Pain Care Routes
  <Route key="headaches-migraines-pain" path="/diseases-conditions/pain-care/headaches-and-migraines" element={<HeadachesMigraines />} />,
  <Route key="joint-pain" path="/diseases-conditions/pain-care/joint-pain" element={<JointPainArthritis />} />,
  <Route key="sciatic-pain" path="/diseases-conditions/pain-care/sciatic-pain" element={<PainCare />} />,
  <Route key="menstrual-cramps" path="/diseases-conditions/pain-care/menstrual-cramps" element={<PainCare />} />,
  <Route key="dental-pain" path="/diseases-conditions/pain-care/dental-pain" element={<PainCare />} />,
  <Route key="muscle-pain" path="/diseases-conditions/pain-care/muscle-pain-myalgia" element={<PainCare />} />,
  <Route key="back-pain-care" path="/diseases-conditions/pain-care/back-pain" element={<PainCare />} />,
  <Route key="fibromyalgia-pain" path="/diseases-conditions/pain-care/fibromyalgia" element={<PainCare />} />,
  <Route key="chronic-pain" path="/diseases-conditions/pain-care/chronic-pain-syndrome" element={<PainCare />} />,

  // Reproductive Care Routes
  <Route key="male-infertility" path="/diseases-conditions/reproductive-care/male-infertility-low-sperm-count-libido" element={<ReproductiveCare />} />,
  <Route key="female-infertility" path="/diseases-conditions/reproductive-care/female-infertility-irregular-ovulation-pcos" element={<ReproductiveCare />} />,
  <Route key="erectile-dysfunction" path="/diseases-conditions/reproductive-care/erectile-dysfunction" element={<ReproductiveCare />} />,
  <Route key="premature-ejaculation" path="/diseases-conditions/reproductive-care/premature-ejaculation" element={<ReproductiveCare />} />,
  <Route key="menstrual-health" path="/diseases-conditions/reproductive-care/menstrual-health" element={<ReproductiveCare />} />,
  <Route key="painful-intercourse" path="/diseases-conditions/reproductive-care/painful-intercourse" element={<ReproductiveCare />} />,
  <Route key="hormonal-imbalances" path="/diseases-conditions/reproductive-care/hormonal-imbalances" element={<ReproductiveCare />} />,
  <Route key="sexual-debility" path="/diseases-conditions/reproductive-care/sexual-debility" element={<ReproductiveCare />} />,
  <Route key="libido-enhancers" path="/diseases-conditions/reproductive-care/libido-enhancers-both-genders" element={<ReproductiveCare />} />,

  // Respiratory Care Routes
  <Route key="asthma" path="/diseases-conditions/respiratory-care/asthma" element={<AsthmaPage />} />,
  <Route key="chronic-bronchitis" path="/diseases-conditions/respiratory-care/chronic-bronchitis" element={<RespiratoryCare />} />,
  <Route key="allergic-rhinitis-resp" path="/diseases-conditions/respiratory-care/allergic-rhinitis" element={<AllergiesHayFever />} />,
  <Route key="sinusitis-resp" path="/diseases-conditions/respiratory-care/sinusitis" element={<RespiratoryCare />} />,
  <Route key="wheezing" path="/diseases-conditions/respiratory-care/wheezing" element={<RespiratoryCare />} />,
  <Route key="dry-wet-cough" path="/diseases-conditions/respiratory-care/dry-cough-wet-cough" element={<RespiratoryCare />} />,
  <Route key="copd-supportive" path="/diseases-conditions/respiratory-care/copd-supportive-care" element={<RespiratoryCare />} />,
  <Route key="breathlessness" path="/diseases-conditions/respiratory-care/breathlessness" element={<RespiratoryCare />} />,
  <Route key="recurrent-cold-cough" path="/diseases-conditions/respiratory-care/recurrent-cold-and-cough" element={<RespiratoryCare />} />,
  <Route key="nasal-block" path="/diseases-conditions/respiratory-care/nasal-block-deviated-septum-support" element={<RespiratoryCare />} />,

  // Skin Care Routes
  <Route key="acne-pimples" path="/diseases-conditions/skin-care/acne-pimples" element={<Acne />} />,
  <Route key="eczema-dermatitis" path="/diseases-conditions/skin-care/eczema-dermatitis" element={<EczemaPage />} />,
  <Route key="psoriasis-supportive" path="/diseases-conditions/skin-care/psoriasis-supportive-care" element={<SkinConditions />} />,
  <Route key="fungal-infections-skin" path="/diseases-conditions/skin-care/fungal-infections" element={<FungalInfections />} />,
  <Route key="skin-allergy-itching" path="/diseases-conditions/skin-care/skin-allergy-itching" element={<SkinConditions />} />,
  <Route key="urticaria" path="/diseases-conditions/skin-care/urticaria" element={<SkinConditions />} />,
  <Route key="warts" path="/diseases-conditions/skin-care/warts" element={<SkinConditions />} />,
  <Route key="pigmentation" path="/diseases-conditions/skin-care/pigmentation" element={<SkinCare />} />,
  <Route key="dry-skin" path="/diseases-conditions/skin-care/dry-skin" element={<SkinCare />} />,
  <Route key="corns-calluses" path="/diseases-conditions/skin-care/corns-calluses" element={<SkinCare />} />,

  // Tooth Care Routes
  <Route key="toothache" path="/diseases-conditions/tooth-care/toothache" element={<ToothCare />} />,
  <Route key="bleeding-gums" path="/diseases-conditions/tooth-care/bleeding-gums" element={<ToothCare />} />,
  <Route key="pyorrhoea" path="/diseases-conditions/tooth-care/pyorrhoea" element={<ToothCare />} />,
  <Route key="dental-abscess" path="/diseases-conditions/tooth-care/dental-abscess" element={<ToothCare />} />,
  <Route key="mouth-ulcers" path="/diseases-conditions/tooth-care/mouth-ulcers" element={<ToothCare />} />,
  <Route key="bad-breath" path="/diseases-conditions/tooth-care/bad-breath-halitosis" element={<ToothCare />} />,
  <Route key="sensitive-teeth" path="/diseases-conditions/tooth-care/sensitive-teeth" element={<ToothCare />} />,
  <Route key="teeth-grinding" path="/diseases-conditions/tooth-care/teeth-grinding-bruxism" element={<ToothCare />} />,

  // Urinary Care Routes
  <Route key="uti" path="/diseases-conditions/urinary-care/urinary-tract-infection-uti" element={<UrinaryTractInfections />} />,
  <Route key="bedwetting-urinary" path="/diseases-conditions/urinary-care/bedwetting" element={<UrologyCare />} />,
  <Route key="frequent-urination" path="/diseases-conditions/urinary-care/frequent-urination" element={<UrologyCare />} />,
  <Route key="burning-urination" path="/diseases-conditions/urinary-care/burning-urination" element={<UrologyCare />} />,
  <Route key="kidney-stone" path="/diseases-conditions/urinary-care/kidney-stone-support" element={<UrologyCare />} />,
  <Route key="bladder-spasms" path="/diseases-conditions/urinary-care/bladder-spasms" element={<UrologyCare />} />,
  <Route key="incontinence" path="/diseases-conditions/urinary-care/incontinence" element={<UrologyCare />} />,
  <Route key="prostate-enlargement" path="/diseases-conditions/urinary-care/prostate-enlargement-bph" element={<UrologyCare />} />,
  <Route key="cystitis" path="/diseases-conditions/urinary-care/cystitis" element={<UrologyCare />} />,
  <Route key="nephrotic-syndrome" path="/diseases-conditions/urinary-care/nephrotic-syndrome-supportive" element={<UrologyCare />} />
];
