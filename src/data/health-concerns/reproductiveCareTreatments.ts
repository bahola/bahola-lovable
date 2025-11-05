import { SubConditionTreatment } from './types';

export const reproductiveCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Male Vitality / Erectile Weakness',
    remedies: [
      {
        name: 'Agnus castus',
        potency: '6CH',
        specificIndication: 'Loss of desire & fatigue',
        expectedResult: 'Restored confidence'
      },
      {
        name: 'Damiana',
        potency: 'Q',
        specificIndication: 'Nervous weakness',
        expectedResult: 'Better endurance'
      },
      {
        name: 'Yohimbinum',
        potency: '6CH',
        specificIndication: 'Performance anxiety',
        expectedResult: 'Improved stamina'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Mental and physical exhaustion',
        expectedResult: 'Renewed energy'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nerve tiredness',
        expectedResult: 'Relaxed strength'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 28 – Vital Tonic',
    baholaSpecialty: 'Extacy'
  },
  {
    subConditionName: 'Menstrual Irregularity / Recurrent Miscarriage',
    remedies: [
      {
        name: 'Sepia',
        potency: '6CH',
        specificIndication: 'Hormonal imbalance',
        expectedResult: 'Balanced cycle'
      },
      {
        name: 'Cimicifuga',
        potency: '6CH',
        specificIndication: 'Backache with cramps',
        expectedResult: 'Muscular relief'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Scanty late menses',
        expectedResult: 'Normal flow'
      },
      {
        name: 'Lachesis',
        potency: '6CH',
        specificIndication: 'Hot flush & irritability',
        expectedResult: 'Calm mood'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Weakness after bleeding',
        expectedResult: 'Strength returns'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC 15 – Menstrual Disorders',
    baholaSpecialty: 'Rececaul'
  },
  {
    subConditionName: 'Hormonal Balance / Fertility Support',
    remedies: [
      {
        name: 'Sepia',
        potency: '6CH',
        specificIndication: 'Low libido & fatigue',
        expectedResult: 'Hormonal equilibrium'
      },
      {
        name: 'Lachesis',
        potency: '6CH',
        specificIndication: 'Irregular menses & heat',
        expectedResult: 'Balanced cycles'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Mood swings & flow changes',
        expectedResult: 'Emotional ease'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Headache before periods',
        expectedResult: 'Relief of tension'
      },
      {
        name: 'Cimicifuga',
        potency: '6CH',
        specificIndication: 'Muscular tension',
        expectedResult: 'Relaxed body'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 15',
    baholaSpecialty: 'Woman Plus'
  }
];
