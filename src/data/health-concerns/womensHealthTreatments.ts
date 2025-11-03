import { SubConditionTreatment } from './types';

export const womensHealthTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Menstrual Cramps (Dysmenorrhoea)',
    remedies: [
      {
        name: 'Magnesium phosphoricum',
        potency: '6X',
        specificIndication: 'Cramping relieved by warmth',
        expectedResult: 'Pain eased'
      },
      {
        name: 'Cimicifuga',
        potency: '6CH',
        specificIndication: 'Pain radiating to back',
        expectedResult: 'Relaxed muscles'
      },
      {
        name: 'Colocynthis',
        potency: '6CH',
        specificIndication: 'Cutting lower-abdomen pain',
        expectedResult: 'Quick relief'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Irregular, changeable flow',
        expectedResult: 'Normalized periods'
      },
      {
        name: 'Chamomilla',
        potency: '6CH',
        specificIndication: 'Cranky during pain',
        expectedResult: 'Calmer mood'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 15 – Menstrual Disorders',
    baholaSpecialty: 'Woman Plus'
  },
  {
    subConditionName: 'Premenstrual Syndrome',
    remedies: [
      {
        name: 'Lachesis',
        potency: '6CH',
        specificIndication: 'Mood swings, irritability',
        expectedResult: 'Balanced emotions'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Weepy before menses',
        expectedResult: 'Emotional stability'
      },
      {
        name: 'Sepia',
        potency: '6CH',
        specificIndication: 'Low energy, pelvic heaviness',
        expectedResult: 'Energized feeling'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Headache with menses',
        expectedResult: 'Relief from tension'
      },
      {
        name: 'Cimicifuga',
        potency: '6CH',
        specificIndication: 'Muscular soreness',
        expectedResult: 'Relaxed back'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 15',
    baholaSpecialty: 'Woman Plus'
  },
  {
    subConditionName: 'Menopause Symptoms',
    remedies: [
      {
        name: 'Lachesis',
        potency: '12CH',
        specificIndication: 'Hot flushes, irritability',
        expectedResult: 'Comfort and sleep'
      },
      {
        name: 'Sepia',
        potency: '12CH',
        specificIndication: 'Low libido, fatigue',
        expectedResult: 'Hormonal balance'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Heat and sweating at night',
        expectedResult: 'Cool relaxation'
      },
      {
        name: 'Sanguinaria',
        potency: '6CH',
        specificIndication: 'Hot flush with redness',
        expectedResult: 'Steady temperature'
      },
      {
        name: 'Cimicifuga',
        potency: '6CH',
        specificIndication: 'Nervous irritability',
        expectedResult: 'Mental calmness'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 15',
    baholaSpecialty: 'MenoPride'
  },
  {
    subConditionName: 'Leucorrhoea (White Discharge)',
    remedies: [
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Thick discharge, weakness',
        expectedResult: 'Healthy vaginal flora'
      },
      {
        name: 'Borax',
        potency: '6CH',
        specificIndication: 'Sticky discharge with itching',
        expectedResult: 'Comfort and hygiene'
      },
      {
        name: 'Sepia',
        potency: '6CH',
        specificIndication: 'Yellow discharge, dragging pain',
        expectedResult: 'Balanced uterus'
      },
      {
        name: 'Kreosotum',
        potency: '6CH',
        specificIndication: 'Offensive discharge',
        expectedResult: 'Odour free confidence'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Thick mild discharge',
        expectedResult: 'Natural balance'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 13 – Leucorrhoea',
    baholaSpecialty: 'Woman Plus'
  },
  {
    subConditionName: 'Polycystic Ovary Syndrome (PCOS)',
    remedies: [
      {
        name: 'Lachesis',
        potency: '6CH',
        specificIndication: 'Hormonal imbalance',
        expectedResult: 'Regular cycles'
      },
      {
        name: 'Sepia',
        potency: '6CH',
        specificIndication: 'Weight gain, irritability',
        expectedResult: 'Balanced mood'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Late, scanty periods',
        expectedResult: 'Normalized flow'
      },
      {
        name: 'Apis mellifica',
        potency: '6CH',
        specificIndication: 'Ovarian pain, swelling',
        expectedResult: 'Comfort and regulation'
      },
      {
        name: 'Thuja occidentalis',
        potency: '6CH',
        specificIndication: 'Hormonal acne',
        expectedResult: 'Clearer skin'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – Tonic',
    baholaSpecialty: 'Woman Plus'
  }
];
