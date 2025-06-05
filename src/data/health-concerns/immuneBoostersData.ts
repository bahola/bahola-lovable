
import { HealthConcern } from './types';
import { recurrentColdsCoughData } from './immune-boosters/recurrentColdsCough';
import { frequentInfectionsData } from './immune-boosters/frequentInfections';
import { lowEnergyLevelsData } from './immune-boosters/lowEnergyLevels';
import { postIllnessRecoveryData } from './immune-boosters/postIllnessRecovery';
import { generalWeaknessData } from './immune-boosters/generalWeakness';
import { convalescenceRemediesData } from './immune-boosters/convalescenceRemedies';
import { childrensImmunityDropsData } from './immune-boosters/childrensImmunityDrops';
import { elderlyImmuneSupportData } from './immune-boosters/elderlyImmuneSupport';

export const immuneBoostersData: HealthConcern[] = [
  recurrentColdsCoughData,
  frequentInfectionsData,
  lowEnergyLevelsData,
  postIllnessRecoveryData,
  generalWeaknessData,
  convalescenceRemediesData,
  childrensImmunityDropsData,
  elderlyImmuneSupportData
];
