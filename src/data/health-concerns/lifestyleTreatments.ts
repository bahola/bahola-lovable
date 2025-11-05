import { SubConditionTreatment } from './types';

export const lifestyleTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Alcohol hangover / liver stress',
    remedies: [
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Headache, nausea, irritability',
        expectedResult: 'Clear head, calm stomach'
      },
      {
        name: 'Carduus marianus',
        potency: '6CH',
        specificIndication: 'Liver tenderness, bitter taste',
        expectedResult: 'Detox support'
      },
      {
        name: 'Chelidonium',
        potency: '6CH',
        specificIndication: 'Right-sided liver pain',
        expectedResult: 'Better bile flow'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Exhaustion after excess',
        expectedResult: 'Renewed vigor'
      },
      {
        name: 'Phosphoric acid',
        potency: '6CH',
        specificIndication: 'Brain fog, low motivation',
        expectedResult: 'Mental clarity'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 25 – Acidity & Liver',
    baholaSpecialty: 'Afterparty Drops'
  },
  {
    subConditionName: 'Weight management / slow metabolism',
    remedies: [
      {
        name: 'Phytolacca berry',
        potency: '6CH',
        specificIndication: 'Craving sweets, stubborn fat',
        expectedResult: 'Leaner feel, appetite balance'
      },
      {
        name: 'Fucus vesiculosus',
        potency: '6CH',
        specificIndication: 'Thyroid-linked sluggishness',
        expectedResult: 'Metabolic pick-up'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Easy weight gain, chilliness',
        expectedResult: 'Steadier metabolism'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Gas, sweet craving, evening hunger',
        expectedResult: 'Lighter digestion'
      },
      {
        name: 'Antimonium crudum',
        potency: '6CH',
        specificIndication: 'Overeating, heavy stomach',
        expectedResult: 'Settled digestion'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 28 – Tonic',
    baholaSpecialty: 'Slimace Drops'
  },
  {
    subConditionName: 'Smoking withdrawal & cravings',
    remedies: [
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Irritable, craving, cough',
        expectedResult: 'Calmer nerves'
      },
      {
        name: 'Ignatia amara',
        potency: '6CH',
        specificIndication: 'Mood swings, sighing, grief',
        expectedResult: 'Emotional balance'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nerve support, sleep',
        expectedResult: 'Restful nights'
      },
      {
        name: 'Lobelia inflata',
        potency: '6CH',
        specificIndication: 'Chest tightness after quitting',
        expectedResult: 'Easier breathing'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Tickly chest, sensitivity',
        expectedResult: 'Chest comfort'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24 – Brain & Nerves',
    baholaSpecialty: 'Smokenil Drops'
  },
  {
    subConditionName: 'Nervous tension / anxiety',
    remedies: [
      {
        name: 'Aconitum napellus',
        potency: '6CH',
        specificIndication: 'Sudden fear, palpitations',
        expectedResult: 'Emotional calm'
      },
      {
        name: 'Argentum nitricum',
        potency: '6CH',
        specificIndication: 'Anticipatory anxiety',
        expectedResult: 'Confidence for events'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Stage fright, heavy eyelids',
        expectedResult: 'Relaxed performance'
      },
      {
        name: 'Ignatia amara',
        potency: '6CH',
        specificIndication: 'Upset from grief or shock',
        expectedResult: 'Inner steadiness'
      },
      {
        name: 'Passiflora',
        potency: '6CH',
        specificIndication: "Mind won't switch off at night",
        expectedResult: 'Natural sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'Calms Drops'
  },
  {
    subConditionName: 'Travel fatigue / jet lag',
    remedies: [
      {
        name: 'Cocculus indicus',
        potency: '6CH',
        specificIndication: 'Motion sickness, vertigo',
        expectedResult: 'Settled stomach'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Body ache after long travel',
        expectedResult: 'Relaxed muscles'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Drowsy fatigue',
        expectedResult: 'Alertness restored'
      },
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Irregular food, acidity',
        expectedResult: 'Digestive ease'
      },
      {
        name: 'Kali phosphoricum',
        potency: '6X',
        specificIndication: 'Mental strain, time-zone stress',
        expectedResult: 'Clearer head'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'No-Jetlag Drops'
  }
];
