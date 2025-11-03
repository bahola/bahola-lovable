import { SubConditionTreatment } from './types';

export const eyeCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Eye Strain / Fatigue',
    remedies: [
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Eye pain after reading or screen use',
        expectedResult: 'Relaxed and refreshed eyes'
      },
      {
        name: 'Physostigma venenosum',
        potency: '6CH',
        specificIndication: 'Blurred vision from near work',
        expectedResult: 'Clearer focus'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Tired eyes after crying or light',
        expectedResult: 'Calm eye strain'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Burning eyes with redness',
        expectedResult: 'Relief from heat and redness'
      },
      {
        name: 'Euphrasia',
        potency: '6CH',
        specificIndication: 'Watery, irritated eyes',
        expectedResult: 'Bright comfortable vision'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 24 – Brain & Nerves',
    baholaSpecialty: 'Eyecare'
  },
  {
    subConditionName: 'Allergic Conjunctivitis',
    remedies: [
      {
        name: 'Euphrasia',
        potency: '6CH',
        specificIndication: 'Watery discharge with burning',
        expectedResult: 'Less tearing and itch'
      },
      {
        name: 'Apis mellifica',
        potency: '6CH',
        specificIndication: 'Puffy eyelids and stinging',
        expectedResult: 'Reduced swelling'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Itchy eyelids and redness',
        expectedResult: 'Clean healthy eyes'
      },
      {
        name: 'Argentum nitricum',
        potency: '6CH',
        specificIndication: 'Red, irritated eyes',
        expectedResult: 'Cooling comfort'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Thick bland eye mucus',
        expectedResult: 'Clearer eyes'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'AllerEye / Eyecare'
  },
  {
    subConditionName: 'Dry Eyes',
    remedies: [
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Gritty sensation',
        expectedResult: 'Moist, soothed eyes'
      },
      {
        name: 'Euphrasia',
        potency: '6CH',
        specificIndication: 'Smarting in dry wind',
        expectedResult: 'Lubricated surface'
      },
      {
        name: 'Alumina',
        potency: '6CH',
        specificIndication: 'Dryness with heaviness',
        expectedResult: 'Ease and brightness'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Burning and itching',
        expectedResult: 'Comfort restored'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Red congested eyes',
        expectedResult: 'Relaxed muscles'
      }
    ],
    biochemicRemedies: [
      { name: 'Silicea', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Eyecare'
  },
  {
    subConditionName: 'Stye / Eyelid Inflammation',
    remedies: [
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Painful boil on eyelid',
        expectedResult: 'Faster resolution'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Mild discharge, relief in open air',
        expectedResult: 'Calmer eyelid'
      },
      {
        name: 'Staphysagria',
        potency: '6CH',
        specificIndication: 'Recurrent styes',
        expectedResult: 'Prevents recurrence'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Slow healing abscess',
        expectedResult: 'Quick drainage'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Throbbing redness',
        expectedResult: 'Pain relief'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC No. 17 – Inflammation',
    baholaSpecialty: 'Eyetone / Eyecare'
  },
  {
    subConditionName: 'Photophobia / Light Sensitivity',
    remedies: [
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Dilated pupils, bright light pain',
        expectedResult: 'Easier light tolerance'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Spots or glare before eyes',
        expectedResult: 'Clearer sight'
      },
      {
        name: 'Euphrasia',
        potency: '6CH',
        specificIndication: 'Burning tears in sunlight',
        expectedResult: 'Eye calmness'
      },
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Eye fatigue from glare',
        expectedResult: 'Reduced strain'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Heavy eyelids in light',
        expectedResult: 'Relaxed vision'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6',
    baholaSpecialty: 'Eyecare'
  }
];
