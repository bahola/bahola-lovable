
import { allergyData } from './allergyData';
import { anxietyData } from './anxietyData';
import { digestiveData } from './digestiveData';
import { respiratoryData } from './respiratoryData';
import { womensHealthData } from './womensHealthData';
import { hairCareData } from './hairCareData';
import { immuneBoostersData } from './immuneBoostersData';
import { cardiovascularData } from './cardiovascularData';
import { cancerSupportData } from './cancerSupportData';
import { pediatricData } from './pediatricData';
import { specialtyData } from './specialtyData';
import { infectionData } from './infectionData';
import { lifestyleData } from './lifestyle';
import { entData } from './entData';
import { gutHealthData } from './gutHealthData';
import { reproductiveData } from './reproductiveData';
import { eyeCareData } from './eyeCareData';
import { skinCareData } from './skinCareData';
import { muscleCareData } from './muscleCareData';
import { mentalHealthData } from './mentalHealthData';
import { nutritiveData } from './nutritiveData';
import { painCareData } from './painCareData';
import { toothCareData } from './toothCareData';
import { urologyCareData } from './urologyCareData';

// Combine all health concerns data
export const healthConcernsData = [
  ...allergyData,
  ...anxietyData,
  ...digestiveData,
  ...gutHealthData,
  ...respiratoryData,
  ...womensHealthData,
  ...reproductiveData,
  ...hairCareData,
  ...immuneBoostersData,
  ...cardiovascularData,
  ...cancerSupportData,
  ...pediatricData,
  ...specialtyData,
  ...infectionData,
  ...lifestyleData,
  ...entData,
  ...eyeCareData,
  ...skinCareData,
  ...muscleCareData,
  ...mentalHealthData,
  ...nutritiveData,
  ...painCareData,
  ...toothCareData,
  ...urologyCareData
];

// Export individual category data for specific use cases
export {
  allergyData,
  anxietyData,
  digestiveData,
  gutHealthData,
  respiratoryData,
  womensHealthData,
  reproductiveData,
  hairCareData,
  immuneBoostersData,
  cardiovascularData,
  cancerSupportData,
  pediatricData,
  specialtyData,
  infectionData,
  lifestyleData,
  entData,
  eyeCareData,
  skinCareData,
  muscleCareData,
  mentalHealthData,
  nutritiveData,
  painCareData,
  toothCareData,
  urologyCareData
};
