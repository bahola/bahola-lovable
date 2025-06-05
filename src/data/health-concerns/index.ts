
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

// Combine all health concerns data
export const healthConcernsData = [
  ...allergyData,
  ...anxietyData,
  ...digestiveData,
  ...respiratoryData,
  ...womensHealthData,
  ...hairCareData,
  ...immuneBoostersData,
  ...cardiovascularData,
  ...cancerSupportData,
  ...pediatricData,
  ...specialtyData
];

// Export individual category data for specific use cases
export {
  allergyData,
  anxietyData,
  digestiveData,
  respiratoryData,
  womensHealthData,
  hairCareData,
  immuneBoostersData,
  cardiovascularData,
  cancerSupportData,
  pediatricData,
  specialtyData
};
