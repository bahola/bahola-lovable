import { SubConditionTreatment } from './types';

export const infectiousDiseasesTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Viral Fever / Influenza (support)',
    remedies: [
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Fever with dullness, heavy limbs',
        expectedResult: 'Comfortable rest, fever eases'
      },
      {
        name: 'Eupatorium perfoliatum',
        potency: '6CH',
        specificIndication: '"Bone-breaking" body ache with fever',
        expectedResult: 'Aches reduce, mobility improves'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Head/body pain worse on movement',
        expectedResult: 'Calmer body, better sleep'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Restless, burning thirst, anxiety',
        expectedResult: 'Settled stomach and nerves'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Sudden high temperature, flushed face',
        expectedResult: 'Temperature steadies'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 11 – Fever',
    baholaSpecialty: 'Flunil Drops'
  },
  {
    subConditionName: 'Dengue-like fever & weakness (support)',
    remedies: [
      {
        name: 'Eupatorium perfoliatum',
        potency: '6CH',
        specificIndication: 'Severe body ache, chill',
        expectedResult: 'Pain relief, better comfort'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Weakness after fever, dehydration',
        expectedResult: 'Strength returns'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Drowsy fatigue, headache',
        expectedResult: 'Lighter body, clearer head'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Thirsty, irritable, motion aggravates',
        expectedResult: 'Ease and rest'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Post-viral fatigue, low appetite',
        expectedResult: 'Steadier energy'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 11',
    baholaSpecialty: 'Denguenil Drops'
  },
  {
    subConditionName: 'Measles early stage (support)',
    remedies: [
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Hot, flushed, throbbing head',
        expectedResult: 'Fever settles'
      },
      {
        name: 'Aconitum napellus',
        potency: '6CH',
        specificIndication: 'Sudden fever, fear, chill',
        expectedResult: 'Calmer pulse & mind'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Bland catarrh, clingy child',
        expectedResult: 'Easier breathing'
      },
      {
        name: 'Euphrasia',
        potency: '6CH',
        specificIndication: 'Watery, burning eyes',
        expectedResult: 'Eye comfort'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Sleepy, heavy, mild fever',
        expectedResult: 'Restorative sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC 11',
    baholaSpecialty: 'Measlescare Drops'
  },
  {
    subConditionName: 'Post-operative recovery / infection prevention',
    remedies: [
      {
        name: 'Calendula',
        potency: '6CH',
        specificIndication: 'Clean wound healing, antiseptic support',
        expectedResult: 'Faster, healthy granulation'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Bruise-like pain post procedure',
        expectedResult: 'Swelling & soreness reduce'
      },
      {
        name: 'Staphysagria',
        potency: '6CH',
        specificIndication: 'Incisional pain, stinging',
        expectedResult: 'Edge pain soothes'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Threat of suppuration',
        expectedResult: 'Limits pus formation'
      },
      {
        name: 'Silicea',
        potency: '6CH',
        specificIndication: 'Slow repair, low vitality',
        expectedResult: 'Stronger tissue repair'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC 17 – Inflammation',
    baholaSpecialty: 'Postopcare Drops'
  },
  {
    subConditionName: 'Early fever / inflammatory state',
    remedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6CH',
        specificIndication: 'First stage fever, pink cheeks',
        expectedResult: 'Stops escalation'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Feverish dullness',
        expectedResult: 'Relief & rest'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Pain on motion, thirsty',
        expectedResult: 'Calmer recovery'
      },
      {
        name: 'Eupatorium perfoliatum',
        potency: '6CH',
        specificIndication: 'Deep bone ache',
        expectedResult: 'Pain subsides'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Weakness, burning sensations',
        expectedResult: 'Vitality improves'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC 11',
    baholaSpecialty: 'Q3 Tablets'
  }
];
