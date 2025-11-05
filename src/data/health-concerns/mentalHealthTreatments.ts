import { SubConditionTreatment } from './types';

export const mentalHealthTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Poor concentration / mental fatigue',
    remedies: [
      {
        name: 'Anacardium orientale',
        potency: '6CH',
        specificIndication: 'Absent-minded, forgetful',
        expectedResult: 'Sharper focus'
      },
      {
        name: 'Acidum phosphoricum',
        potency: '6CH',
        specificIndication: 'Brain fag after study',
        expectedResult: 'Mental energy returns'
      },
      {
        name: 'Coffea cruda',
        potency: '6CH',
        specificIndication: 'Racing thoughts',
        expectedResult: 'Quiet mind'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Heaviness, performance anxiety',
        expectedResult: 'Steadier nerves'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nervous exhaustion',
        expectedResult: 'Restful sleep, clarity'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24 – Brain & Nerves',
    baholaSpecialty: 'Focus Drops'
  },
  {
    subConditionName: 'Insomnia / restlessness',
    remedies: [
      {
        name: 'Passiflora',
        potency: '6CH',
        specificIndication: 'Sleepless from mental buzz',
        expectedResult: 'Deep natural sleep'
      },
      {
        name: 'Coffea cruda',
        potency: '6CH',
        specificIndication: 'Overexcited mind',
        expectedResult: 'Settles quickly'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Tired but sleepless',
        expectedResult: 'Restful nights'
      },
      {
        name: 'Valeriana',
        potency: '6CH',
        specificIndication: 'Fidgety, nervous',
        expectedResult: 'Calm relaxation'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Sleepy yet unrefreshed',
        expectedResult: 'Restores sleep quality'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'GoodNight Drops'
  },
  {
    subConditionName: 'Low mood / anxiety',
    remedies: [
      {
        name: 'Aurum metallicum',
        potency: '6CH',
        specificIndication: 'Hopeless, heavy mood',
        expectedResult: 'Emotional lift'
      },
      {
        name: 'Ignatia',
        potency: '6CH',
        specificIndication: 'Grief, sighing, lump-in-throat',
        expectedResult: 'Emotional release'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Silent sadness, withdrawn',
        expectedResult: 'Brighter mood'
      },
      {
        name: 'Phosphoric acid',
        potency: '6CH',
        specificIndication: 'Apathetic, drained',
        expectedResult: 'Interest returns'
      },
      {
        name: 'Coffea',
        potency: '6CH',
        specificIndication: 'Overthinking at night',
        expectedResult: 'Calmer sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'Happyness Drops'
  },
  {
    subConditionName: 'Nervous exhaustion / burnout',
    remedies: [
      {
        name: 'Kali phosphoricum',
        potency: '6CH',
        specificIndication: 'Brain & nerve fatigue',
        expectedResult: 'Clear head, steady energy'
      },
      {
        name: 'Acidum phosphoricum',
        potency: '6CH',
        specificIndication: 'Mental weariness',
        expectedResult: 'Gentle lift'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Trembly weakness',
        expectedResult: 'Composure'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Debility, poor sleep',
        expectedResult: 'Restorative rest'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Exhaustion after strain',
        expectedResult: 'Vitality rebounds'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC 28 – Tonic',
    baholaSpecialty: 'Recharge Drops'
  },
  {
    subConditionName: 'Bipolar mood swings / irritability (support)',
    remedies: [
      {
        name: 'Lachesis',
        potency: '6CH',
        specificIndication: 'Intense, talkative, hot',
        expectedResult: 'Smoother mood'
      },
      {
        name: 'Ignatia',
        potency: '6CH',
        specificIndication: 'Rapid mood shifts',
        expectedResult: 'Emotional balance'
      },
      {
        name: 'Coffea',
        potency: '6CH',
        specificIndication: 'Mental overdrive',
        expectedResult: 'Settled mind'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Tension with heaviness',
        expectedResult: 'Relaxed tone'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Highly sensitive, anxious',
        expectedResult: 'Steadier nerves'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'Sterico Drops'
  },
  {
    subConditionName: 'Restless legs / twitching',
    remedies: [
      {
        name: 'Zincum metallicum',
        potency: '6CH',
        specificIndication: 'Fidgety legs at night',
        expectedResult: 'Legs calm, better sleep'
      },
      {
        name: 'Cuprum metallicum',
        potency: '6CH',
        specificIndication: 'Cramps, sudden spasms',
        expectedResult: 'Spasm release'
      },
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'Stiff, better moving',
        expectedResult: 'Easier nights'
      },
      {
        name: 'Arsenicum',
        potency: '12CH',
        specificIndication: 'Restless & anxious',
        expectedResult: 'Settled body'
      },
      {
        name: 'Kali phosphoricum',
        potency: '6CH',
        specificIndication: 'Nerve tiredness',
        expectedResult: 'Quiet limbs'
      }
    ],
    biochemicRemedies: [
      { name: 'Magnesium phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19 – Muscles/Joints',
    baholaSpecialty: 'Restinglegs Drops'
  },
  {
    subConditionName: 'Insomnia from anger/stress',
    remedies: [
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Mind wired, irritable',
        expectedResult: 'Sleep onset improves'
      },
      {
        name: 'Ignatia',
        potency: '6CH',
        specificIndication: 'Grief or upset keeps awake',
        expectedResult: 'Emotional ease'
      },
      {
        name: 'Coffea',
        potency: '6CH',
        specificIndication: 'Hyperalert in bed',
        expectedResult: 'Mind unwinds'
      },
      {
        name: 'Passiflora',
        potency: '6CH',
        specificIndication: 'Light, broken sleep',
        expectedResult: 'Deeper sleep'
      },
      {
        name: 'Avena',
        potency: '6CH',
        specificIndication: 'Daytime fatigue',
        expectedResult: 'Restful nights'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'InsomniCare Drops'
  },
  {
    subConditionName: 'Fatigue + insomnia combo',
    remedies: [
      {
        name: 'Phosphoric acid',
        potency: '6CH',
        specificIndication: 'Tired but unrefreshed',
        expectedResult: 'Day energy returns'
      },
      {
        name: 'Avena sativa',
        potency: '6CH',
        specificIndication: 'Nerve-tired, sleepless',
        expectedResult: 'Better sleep quality'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Post-viral fatigue',
        expectedResult: 'Refreshed mornings'
      },
      {
        name: 'Coffea',
        potency: '6CH',
        specificIndication: 'Overthinking blocks sleep',
        expectedResult: 'Quieter mind'
      },
      {
        name: 'Passiflora',
        potency: '6CH',
        specificIndication: 'Fragmented sleep',
        expectedResult: 'Restored rhythm'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24/28',
    baholaSpecialty: 'Fatiguenil Drops'
  },
  {
    subConditionName: 'Flight anxiety / aerophobia',
    remedies: [
      {
        name: 'Aconitum',
        potency: '6CH',
        specificIndication: 'Panic before flying',
        expectedResult: 'Emotional steadiness'
      },
      {
        name: 'Argentum nitricum',
        potency: '6CH',
        specificIndication: 'Anticipation fear',
        expectedResult: 'Confidence for travel'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Shaky, heavy, drowsy',
        expectedResult: 'Calm composure'
      },
      {
        name: 'Coffea',
        potency: '6CH',
        specificIndication: 'Over-alert on flights',
        expectedResult: 'Relaxed rest'
      },
      {
        name: 'Passiflora',
        potency: '6CH',
        specificIndication: 'Sleep issues during trips',
        expectedResult: 'Natural sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'Aerophob Care Drops'
  },
  {
    subConditionName: 'Seizure management (adjuvant)',
    remedies: [
      {
        name: 'Cicuta virosa',
        potency: '6CH',
        specificIndication: 'Spasmodic tendency',
        expectedResult: 'Reduced frequency (support)'
      },
      {
        name: 'Cuprum metallicum',
        potency: '6CH',
        specificIndication: 'Violent spasms, cramps',
        expectedResult: 'Spasm control (support)'
      },
      {
        name: 'Zincum metallicum',
        potency: '6CH',
        specificIndication: 'Twitching, jerks',
        expectedResult: 'Calmer nerves'
      },
      {
        name: 'Agaricus muscarius',
        potency: '6CH',
        specificIndication: 'Clonic twitches',
        expectedResult: 'Settled movements'
      },
      {
        name: 'Passiflora',
        potency: '6CH',
        specificIndication: 'Restless sleep',
        expectedResult: 'Better rest'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24',
    baholaSpecialty: 'Epilepsy Care Drops'
  }
];
