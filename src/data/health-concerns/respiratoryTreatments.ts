import { SubConditionTreatment } from './types';

export const respiratoryTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Allergic Asthma / Wheezing',
    remedies: [
      {
        name: 'Blatta orientalis',
        potency: '6CH',
        specificIndication: 'Wheezing with mucus rattle',
        expectedResult: 'Easy breathing'
      },
      {
        name: 'Ipecacuanha',
        potency: '6CH',
        specificIndication: 'Rattling cough, nausea',
        expectedResult: 'Airway clears'
      },
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Breathless after midnight',
        expectedResult: 'Calm respiration'
      },
      {
        name: 'Grindelia robusta',
        potency: '6CH',
        specificIndication: 'Sticky phlegm',
        expectedResult: 'Better expectoration'
      },
      {
        name: 'Natrum sulphuricum',
        potency: '6X',
        specificIndication: 'Damp-weather trigger',
        expectedResult: 'Fewer attacks'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Natrum sulphuricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 2 – Asthma',
    baholaSpecialty: 'Asmagen'
  },
  {
    subConditionName: 'Chronic / Mucus-Laden Asthma',
    remedies: [
      {
        name: 'Blatta orientalis',
        potency: '6CH',
        specificIndication: 'Asthma with thick mucus and chest tightness',
        expectedResult: 'Freer breathing'
      },
      {
        name: 'Grindelia robusta',
        potency: '6CH',
        specificIndication: 'Cough with difficult expectoration',
        expectedResult: 'Chest clears'
      },
      {
        name: 'Ipecacuanha',
        potency: '6CH',
        specificIndication: 'Wheeze with retching or nausea',
        expectedResult: 'Relief from congestion'
      },
      {
        name: 'Senega',
        potency: '6CH',
        specificIndication: 'Old, tenacious phlegm',
        expectedResult: 'Easier expectoration'
      },
      {
        name: 'Antimonium tartaricum',
        potency: '6CH',
        specificIndication: 'Rattling mucus, breathlessness',
        expectedResult: 'Looser chest, relaxed breathing'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 2 – Asthma',
    baholaSpecialty: 'Goldrops'
  },
  {
    subConditionName: 'Dry Cough / Throat Irritation',
    remedies: [
      {
        name: 'Rumex crispus',
        potency: '6CH',
        specificIndication: 'Dry tickle in throat',
        expectedResult: 'Stops cough fits'
      },
      {
        name: 'Drosera',
        potency: '6CH',
        specificIndication: 'Deep barking cough',
        expectedResult: 'Calmer throat'
      },
      {
        name: 'Spongia tosta',
        potency: '6CH',
        specificIndication: 'Dry cough with hoarseness',
        expectedResult: 'Smooth voice'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Chest pain on motion',
        expectedResult: 'Breathing comfort'
      },
      {
        name: 'Ipecacuanha',
        potency: '6CH',
        specificIndication: 'Spasmodic cough with mucus',
        expectedResult: 'Airways clear'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 6 – Cough & Cold',
    baholaSpecialty: 'Cof-Y'
  },
  {
    subConditionName: 'Productive Cough / Chest Congestion',
    remedies: [
      {
        name: 'Antimonium tartaricum',
        potency: '6CH',
        specificIndication: 'Rattling mucus in chest',
        expectedResult: 'Phlegm loosens'
      },
      {
        name: 'Senega',
        potency: '6CH',
        specificIndication: 'Difficult expectoration',
        expectedResult: 'Chest lightens'
      },
      {
        name: 'Blatta orientalis',
        potency: '6CH',
        specificIndication: 'Asthmatic cough',
        expectedResult: 'Easy breathing'
      },
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Anxiety with burning throat',
        expectedResult: 'Calm respiration'
      },
      {
        name: 'Grindelia robusta',
        potency: '6CH',
        specificIndication: 'Wheezing when lying down',
        expectedResult: 'Clear lungs'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Kali muriaticum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 6',
    baholaSpecialty: 'Cof-X'
  },
  {
    subConditionName: 'Mixed Cough / Bronchitis',
    remedies: [
      {
        name: 'Drosera',
        potency: '6CH',
        specificIndication: 'Dry bark turning productive',
        expectedResult: 'Balanced relief'
      },
      {
        name: 'Ipecacuanha',
        potency: '6CH',
        specificIndication: 'Spasmodic cough',
        expectedResult: 'Relaxed airways'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Chest pain on motion',
        expectedResult: 'Calm breath'
      },
      {
        name: 'Spongia tosta',
        potency: '6CH',
        specificIndication: 'Hoarseness & tickle',
        expectedResult: 'Smooth voice'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Irritated air tubes',
        expectedResult: 'Clearer breath'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 6',
    baholaSpecialty: 'Cof-Z'
  }
];
