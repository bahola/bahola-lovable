import { SubConditionTreatment } from './types';

export const nutritiveTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Nourishment, weight & energy',
    remedies: [
      {
        name: 'Alfalfa',
        potency: '6CH',
        specificIndication: 'Low weight, poor appetite',
        expectedResult: 'Healthy appetite & vigor'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nerve tiredness',
        expectedResult: 'Calm strength'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Weakness after illness',
        expectedResult: 'Vitality returns'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '6CH',
        specificIndication: 'Mild anaemic tendency',
        expectedResult: 'Better stamina'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Post-viral languor',
        expectedResult: 'Refreshed energy'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC 28 – General Tonic',
    baholaSpecialty: 'Alfalfa Tonic'
  },
  {
    subConditionName: 'Appetite & vitality syrup',
    remedies: [
      {
        name: 'Alfalfa',
        potency: '6CH',
        specificIndication: 'Thin, undernourished',
        expectedResult: 'Weight & appetite improve'
      },
      {
        name: 'Gentiana lutea',
        potency: '6CH',
        specificIndication: 'Poor appetite',
        expectedResult: 'Digestive spark'
      },
      {
        name: 'Hydrastis',
        potency: '6CH',
        specificIndication: 'Weak mucosa, poor absorption',
        expectedResult: 'Better assimilation'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nervous fatigue',
        expectedResult: 'Sound sleep'
      },
      {
        name: 'Calcarea phosphorica',
        potency: '6CH',
        specificIndication: 'Slow growth',
        expectedResult: 'Healthy build'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 28',
    baholaSpecialty: 'Alfaforte Syrup'
  },
  {
    subConditionName: 'Anaemia / iron support',
    remedies: [
      {
        name: 'Ferrum metallicum',
        potency: '6CH',
        specificIndication: 'Pallor, breathlessness',
        expectedResult: 'Energy & colour improve'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'After blood loss',
        expectedResult: 'Strength returns'
      },
      {
        name: 'Kali phosphoricum',
        potency: '6CH',
        specificIndication: 'Mental fatigue with low iron',
        expectedResult: 'Clearer head'
      },
      {
        name: 'Calcarea phosphorica',
        potency: '6CH',
        specificIndication: 'Thin, weak bones',
        expectedResult: 'Robust build'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6CH',
        specificIndication: 'Low appetite, salt desire',
        expectedResult: 'Better intake'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 1 – Anaemia',
    baholaSpecialty: 'Alfiron Tonic'
  },
  {
    subConditionName: 'Blood oxygenation / RBC health',
    remedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6CH',
        specificIndication: 'Low stamina, low Hb trend',
        expectedResult: 'Improved oxygen carriage'
      },
      {
        name: 'Alfalfa',
        potency: '6CH',
        specificIndication: 'Nutritional weakness',
        expectedResult: 'Nourished body'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Post-illness debility',
        expectedResult: 'Restored vitality'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nervous exhaustion',
        expectedResult: 'Better sleep, tone'
      },
      {
        name: 'Kali phosphoricum',
        potency: '6CH',
        specificIndication: 'Brain fatigue',
        expectedResult: 'Mental energy'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 1',
    baholaSpecialty: 'Ferolac Tablets'
  }
];
