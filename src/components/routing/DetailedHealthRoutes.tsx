
import React from 'react';
import { Route } from 'react-router-dom';

import {
  ChildCare,
  ENTCare,
  EyeCare,
  GutHealth,
  WomensHealth,
  HairCare,
  ImmuneBoosters,
  InfectionCare,
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
  BacterialInfections,
  ViralInfections,
  FungalInfections,
  UrinaryTractInfections,
  SkinInfections,
  EarSinusInfections,
  RecurrentFevers,
  FeverWithChills,
  Teething,
  ChronicRhinitis,
  Diarrhoea,
  Gastritis,
  BreastTenderness,
  FibroidsSupportive,
  GeneralWeakness,
  ConvalescenceRemedies,
  AsthmaPage,
  AllergiesHayFever,
  ColdFlu,
  InsomniaPage,
  JointPainArthritis,
  HeadachesMigraines,
  IBSPage,
  PanicDisorderPage,
  GeneralizedAnxietyPage,
  EczemaPage,
  FungalInfections as FungalInfectionsSkin,
  AnxietyStress,
  DepressionMood,
  WeightManagement,
  DigestiveIssues,
  EyeProblems
} from './HealthConcernImports';

export const DetailedHealthRoutes = () => (
  <>
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
  </>
);
