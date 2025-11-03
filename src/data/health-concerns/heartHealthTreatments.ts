import { SubConditionTreatment } from './types';

export const heartHealthTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'High Blood Pressure',
    remedies: [
      {
        name: 'Rauvolfia serpentina',
        potency: 'Q',
        specificIndication: 'Nervous tension with sleeplessness',
        expectedResult: 'BP stabilises, mind calms'
      },
      {
        name: 'Veratrum viride',
        potency: '6CH',
        specificIndication: 'Sudden spikes with flushing',
        expectedResult: 'Controlled pressure rise'
      },
      {
        name: 'Belladonna',
        potency: '12CH',
        specificIndication: 'Throbbing temples and heat',
        expectedResult: 'Relief of pressure headache'
      },
      {
        name: 'Crataegus oxyacantha',
        potency: 'Q',
        specificIndication: 'Weak pulse, palpitations',
        expectedResult: 'Strengthened heart muscle'
      },
      {
        name: 'Avena sativa',
        potency: 'Q',
        specificIndication: 'Nervous overstrain',
        expectedResult: 'Relaxed nerves and sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 16 – Hypertension',
    baholaSpecialty: 'BP Care'
  },
  {
    subConditionName: 'High Cholesterol',
    remedies: [
      {
        name: 'Cholesterinum',
        potency: '3X',
        specificIndication: 'High lipids from fatty diet',
        expectedResult: 'Improved cholesterol ratio'
      },
      {
        name: 'Berberis vulgaris',
        potency: 'Q',
        specificIndication: 'Liver sluggishness',
        expectedResult: 'Better bile flow'
      },
      {
        name: 'Carduus marianus',
        potency: 'Q',
        specificIndication: 'Liver detox support',
        expectedResult: 'Fat metabolism balance'
      },
      {
        name: 'Curcuma longa',
        potency: '6CH',
        specificIndication: 'Arterial inflammation',
        expectedResult: 'Reduced stiffness'
      },
      {
        name: 'Natrum phosphoricum',
        potency: '6X',
        specificIndication: 'Fat digestion imbalance',
        expectedResult: 'Corrected metabolism'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 27 – Glands & Tissues',
    baholaSpecialty: 'Cholestronil'
  },
  {
    subConditionName: 'Heart Palpitations / Angina',
    remedies: [
      {
        name: 'Cactus grandiflorus',
        potency: 'Q',
        specificIndication: 'Constriction in chest',
        expectedResult: 'Relieved tightness & palpitation'
      },
      {
        name: 'Spongia tosta',
        potency: '3X',
        specificIndication: 'Pulse anxiety and dryness',
        expectedResult: 'Calmer heart rate'
      },
      {
        name: 'Crataegus oxyacantha',
        potency: 'Q',
        specificIndication: 'Weak myocardium',
        expectedResult: 'Improved circulation'
      },
      {
        name: 'Laurocerasus',
        potency: '6X',
        specificIndication: 'Cyanotic lips, dyspnoea',
        expectedResult: 'Oxygen improvement'
      },
      {
        name: 'Camphora',
        potency: '6X',
        specificIndication: 'Collapse or cold sweat',
        expectedResult: 'Restored vital tone'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 16',
    baholaSpecialty: 'Cardace'
  },
  {
    subConditionName: 'Poor Circulation / DVT Care',
    remedies: [
      {
        name: 'Hamamelis virginiana',
        potency: '12CH',
        specificIndication: 'Venous congestion, swelling',
        expectedResult: 'Reduced heaviness in legs'
      },
      {
        name: 'Ginkgo biloba',
        potency: '3X',
        specificIndication: 'Circulatory sluggishness',
        expectedResult: 'Better blood flow'
      },
      {
        name: 'Arnica montana',
        potency: '4CH',
        specificIndication: 'Vessel trauma or bruise',
        expectedResult: 'Faster recovery'
      },
      {
        name: 'Calcarea iodata',
        potency: '12CH',
        specificIndication: 'Hard nodes on veins',
        expectedResult: 'Reduced inflammation'
      },
      {
        name: 'Aspidosperma',
        potency: '6CH',
        specificIndication: 'Oxygen starvation symptoms',
        expectedResult: 'Improved breathing'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 15 – Varicose Veins',
    baholaSpecialty: 'DVT Care'
  },
  {
    subConditionName: 'High Triglycerides',
    remedies: [
      {
        name: 'Pulsatilla nigricans',
        potency: '6CH',
        specificIndication: 'Fatty food intolerance',
        expectedResult: 'Balanced lipids'
      },
      {
        name: 'Chelidonium majus',
        potency: 'Q',
        specificIndication: 'Sluggish liver',
        expectedResult: 'Enhanced detox'
      },
      {
        name: 'Sabal serrulata',
        potency: 'Q',
        specificIndication: 'Hormonal imbalance',
        expectedResult: 'Endocrine support'
      },
      {
        name: 'Cholesterinum',
        potency: '4CH',
        specificIndication: 'Fat metabolism fault',
        expectedResult: 'Lower LDL'
      },
      {
        name: 'Natrum sulphuricum',
        potency: '6X',
        specificIndication: 'Liver congestion & bile imbalance',
        expectedResult: 'Better digestion'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 25 – Liver & Stomach',
    baholaSpecialty: 'Triglynase'
  },
  {
    subConditionName: 'Cardiac Weakness after Illness',
    remedies: [
      {
        name: 'Crataegus oxyacantha',
        potency: 'Q',
        specificIndication: 'Post-illness fatigue',
        expectedResult: 'Renewed energy'
      },
      {
        name: 'Avena sativa',
        potency: 'Q',
        specificIndication: 'Sleeplessness from strain',
        expectedResult: 'Deep rest'
      },
      {
        name: 'Alfalfa',
        potency: 'Q',
        specificIndication: 'Weak appetite and weight loss',
        expectedResult: 'Nutritional gain'
      },
      {
        name: 'Phosphoricum acidum',
        potency: '6CH',
        specificIndication: 'Nervous prostration',
        expectedResult: 'Mental refreshment'
      },
      {
        name: 'Ferrum metallicum',
        potency: '6CH',
        specificIndication: 'Anaemic circulation',
        expectedResult: 'Healthy colour and tone'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28',
    baholaSpecialty: 'BP Care / Cardace'
  }
];
