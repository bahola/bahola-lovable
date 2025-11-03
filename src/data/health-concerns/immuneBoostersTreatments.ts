import { SubConditionTreatment } from './types';

export const immuneBoostersTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Low Immunity (General)',
    remedies: [
      {
        name: 'Echinacea angustifolia',
        potency: 'Q',
        specificIndication: 'Prone to infections',
        expectedResult: 'Strengthened defence'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Slow healing wounds',
        expectedResult: 'Better resistance'
      },
      {
        name: 'Calcarea phosphorica',
        potency: '6X',
        specificIndication: 'Weak recovery post illness',
        expectedResult: 'Revitalized strength'
      },
      {
        name: 'Kali phosphoricum',
        potency: '6X',
        specificIndication: 'Fatigue from study or stress',
        expectedResult: 'Renewed energy'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Exhaustion after viral flu',
        expectedResult: 'Restored vitality'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – Tonic',
    baholaSpecialty: 'Immunoplus'
  },
  {
    subConditionName: 'Recurrent Cold / Flu',
    remedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6X',
        specificIndication: 'Early stage of infection',
        expectedResult: 'Stops escalation'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Flu with dullness',
        expectedResult: 'Quick recovery'
      },
      {
        name: 'Eupatorium perfoliatum',
        potency: '6CH',
        specificIndication: 'Body ache during fever',
        expectedResult: 'Relief from pain'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Restless, weak after cold',
        expectedResult: 'Stronger immunity'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Dry cough with cold',
        expectedResult: 'Comfort and relief'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'Immunoplus / Rhinicare'
  },
  {
    subConditionName: 'Recovery after Illness',
    remedies: [
      {
        name: 'Alfalfa',
        potency: 'Q',
        specificIndication: 'Weakness and low appetite',
        expectedResult: 'Improved nutrition'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Fatigue after fever',
        expectedResult: 'Rebuilt strength'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '6X',
        specificIndication: 'Pallor and mild fever',
        expectedResult: 'Renewed stamina'
      },
      {
        name: 'Avena sativa',
        potency: 'Q',
        specificIndication: 'Sleep and energy restoration',
        expectedResult: 'Refreshing rest'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Post-viral weakness',
        expectedResult: 'Confidence and energy'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28',
    baholaSpecialty: 'Immunoplus / Calsinbala'
  },
  {
    subConditionName: 'Frequent Sore Throat / Infection',
    remedies: [
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Red sore throat, fever',
        expectedResult: 'Quick healing'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Sensitivity to cold air',
        expectedResult: 'Fewer relapses'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Pus tonsils',
        expectedResult: 'Clean throat'
      },
      {
        name: 'Phytolacca decandra',
        potency: '6CH',
        specificIndication: 'Deep throat pain',
        expectedResult: 'Pain relief'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Weakness during infection',
        expectedResult: 'Renewed strength'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 15 – Throat & Tonsils',
    baholaSpecialty: 'Tonsinil / Immunoplus'
  },
  {
    subConditionName: 'Vaccine / Drug Detox Support',
    remedies: [
      {
        name: 'Thuja occidentalis',
        potency: '6CH',
        specificIndication: 'After vaccination effects',
        expectedResult: 'Detox support'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Expels toxins gently',
        expectedResult: 'Health restoration'
      },
      {
        name: 'Echinacea',
        potency: 'Q',
        specificIndication: 'Boosts white blood cells',
        expectedResult: 'Enhanced protection'
      },
      {
        name: 'Natrum sulphuricum',
        potency: '6X',
        specificIndication: 'Liver detox aid',
        expectedResult: 'Clearer energy'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Cleanses body impurities',
        expectedResult: 'Renewed vitality'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28',
    baholaSpecialty: 'Immunoplus'
  }
];
