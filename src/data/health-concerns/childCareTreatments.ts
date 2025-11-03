import { SubConditionTreatment } from './types';

export const childCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'ADHD / Hyperactivity',
    remedies: [
      {
        name: 'Aethusa cynapium',
        potency: 'Q',
        specificIndication: 'Inattention, restless movements, confusion during study',
        expectedResult: 'Improved focus and learning interest'
      },
      {
        name: 'Coffea cruda',
        potency: '4CH',
        specificIndication: 'Sleeplessness from mental overactivity',
        expectedResult: 'Deep restful sleep'
      },
      {
        name: 'Stramonium',
        potency: '9CH',
        specificIndication: 'Sudden excitement, fear or talkativeness',
        expectedResult: 'Calmer emotions and less agitation'
      },
      {
        name: 'Hyoscyamus niger',
        potency: '9CH',
        specificIndication: 'Impulsive, mischievous behaviour',
        expectedResult: 'Balanced attention span'
      },
      {
        name: 'Veratrum album',
        potency: '6CH',
        specificIndication: 'Overactive child with restlessness',
        expectedResult: 'Settled temperament'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 24 – Brain & Nerves',
    baholaSpecialty: 'ADHD Care'
  },
  {
    subConditionName: 'Learning Difficulty / Memory Weakness',
    remedies: [
      {
        name: 'Anacardium orientale',
        potency: '6X',
        specificIndication: 'Forgetfulness, absent-mindedness',
        expectedResult: 'Sharper recall and confidence'
      },
      {
        name: 'Acidum phosphoricum',
        potency: '6X',
        specificIndication: 'Brain fatigue after study',
        expectedResult: 'Improved concentration'
      },
      {
        name: 'Cocculus indicus',
        potency: '30X',
        specificIndication: 'Poor memory after sleeplessness',
        expectedResult: 'Better alertness'
      },
      {
        name: 'Kali phosphoricum',
        potency: '8X',
        specificIndication: 'Weak memory due to stress',
        expectedResult: 'Mental vitality returns'
      },
      {
        name: 'Alfalfa',
        potency: 'Q',
        specificIndication: 'Weak nutrition and stamina',
        expectedResult: 'Growth and cognitive energy'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Hi-Marcs'
  },
  {
    subConditionName: 'Delayed Teething',
    remedies: [
      {
        name: 'Calcarea carbonica',
        potency: '6X',
        specificIndication: 'Slow or painful tooth eruption',
        expectedResult: 'Timely teething, less discomfort'
      },
      {
        name: 'Calcarea phosphorica',
        potency: '6X',
        specificIndication: 'Weak bone formation',
        expectedResult: 'Strong teeth and bones'
      },
      {
        name: 'Chamomilla',
        potency: '6CH',
        specificIndication: 'Irritability and crying during teething',
        expectedResult: 'Calmness and pain relief'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Feverish teething with red cheeks',
        expectedResult: 'Normal temperature and ease'
      },
      {
        name: 'Silicea',
        potency: '6CH',
        specificIndication: 'Delayed teeth cutting',
        expectedResult: 'Faster, smoother eruption'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 21 – Teething',
    baholaSpecialty: 'Teething Drops'
  },
  {
    subConditionName: 'Poor Appetite / Growth',
    remedies: [
      {
        name: 'Alfalfa',
        potency: 'Q',
        specificIndication: 'Poor appetite and underweight',
        expectedResult: 'Better hunger and weight gain'
      },
      {
        name: 'Hydrastis',
        potency: 'Q',
        specificIndication: 'Weak digestion, sluggish bowel',
        expectedResult: 'Steadier digestion'
      },
      {
        name: 'Carica papaya',
        potency: 'Q',
        specificIndication: 'Incomplete digestion, flatulence',
        expectedResult: 'Healthy gut and nutrient use'
      },
      {
        name: 'Ferrum muriaticum',
        potency: 'Q',
        specificIndication: 'Pale child with poor appetite',
        expectedResult: 'Improved red cell strength'
      },
      {
        name: 'Passiflora',
        potency: 'Q',
        specificIndication: 'Restlessness reducing appetite',
        expectedResult: 'Relaxed mood and eating pattern'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Kiddy Forte'
  },
  {
    subConditionName: 'Infant Colic',
    remedies: [
      {
        name: 'Chamomilla',
        potency: '2X',
        specificIndication: 'Crying and restlessness after feed',
        expectedResult: 'Soothing relief'
      },
      {
        name: 'Embelia ribes',
        potency: 'Q',
        specificIndication: 'Gas and abdominal discomfort',
        expectedResult: 'Calmer stomach'
      },
      {
        name: 'Zingiber officinalis',
        potency: 'Q',
        specificIndication: 'Indigestion with burping',
        expectedResult: 'Comfort and digestion restored'
      },
      {
        name: 'Natrum carbonicum',
        potency: '1X',
        specificIndication: 'Milk intolerance',
        expectedResult: 'Reduced bloating'
      },
      {
        name: 'Calcarea phosphorica',
        potency: '6X',
        specificIndication: 'Weak digestion from teething',
        expectedResult: 'Normal appetite'
      }
    ],
    biochemicRemedies: [
      { name: 'Magnesium phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 10 – Stomach Pain',
    baholaSpecialty: 'Infant Mixture'
  },
  {
    subConditionName: 'Fever in Children',
    remedies: [
      {
        name: 'Arsenicum album',
        potency: '3C',
        specificIndication: 'Fever with restlessness and thirst',
        expectedResult: 'Controlled temperature'
      },
      {
        name: 'Belladonna',
        potency: '3X',
        specificIndication: 'Sudden fever with flushed face',
        expectedResult: 'Quick relief and calm'
      },
      {
        name: 'Bryonia',
        potency: '3X',
        specificIndication: 'Fever with body ache and thirst',
        expectedResult: 'Ease of movement and sleep'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '30C',
        specificIndication: 'Early fever stage',
        expectedResult: 'Stops further rise'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Fever with dullness and weakness',
        expectedResult: 'Relaxed muscles and rest'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 11 – Fever',
    baholaSpecialty: 'Q3 Syrup'
  },
  {
    subConditionName: 'Autism Support',
    remedies: [
      {
        name: 'Aethusa cynapium',
        potency: '6CH',
        specificIndication: 'Lack of attention and comprehension',
        expectedResult: 'Better interaction'
      },
      {
        name: 'Baryta carbonica',
        potency: '6CH',
        specificIndication: 'Shyness and delayed development',
        expectedResult: 'Improved social contact'
      },
      {
        name: 'Hyoscyamus niger',
        potency: '12CH',
        specificIndication: 'Hyperactivity, impulsive acts',
        expectedResult: 'Calmer behaviour'
      },
      {
        name: 'Tarentula cubensis',
        potency: '30CH',
        specificIndication: 'Restlessness and anxiety',
        expectedResult: 'Emotional stability'
      },
      {
        name: 'Ginkgo biloba',
        potency: '3X',
        specificIndication: 'Poor memory and mental dullness',
        expectedResult: 'Enhanced cognitive response'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 24 – Brain & Nerves',
    baholaSpecialty: 'Autism Care'
  },
  {
    subConditionName: 'Weak Bones / Teeth',
    remedies: [
      {
        name: 'Calcarea fluorica',
        potency: '3X',
        specificIndication: 'Brittle bones, weak enamel',
        expectedResult: 'Stronger structure'
      },
      {
        name: 'Calcarea phosphorica',
        potency: '3X',
        specificIndication: 'Soft bones and slow growth',
        expectedResult: 'Rapid strengthening'
      },
      {
        name: 'Lecithin',
        potency: '3X',
        specificIndication: 'Brain and bone weakness',
        expectedResult: 'Growth and vitality'
      },
      {
        name: 'Silicea',
        potency: '3X',
        specificIndication: 'Fragile nails and teeth',
        expectedResult: 'Better mineral absorption'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '3X',
        specificIndication: 'Anaemic child with fatigue',
        expectedResult: 'Improved energy'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Calsinbala'
  },
  {
    subConditionName: 'Sleep Disturbance / Restlessness',
    remedies: [
      {
        name: 'Coffea cruda',
        potency: '6CH',
        specificIndication: 'Excited mind and sleeplessness',
        expectedResult: 'Peaceful sleep'
      },
      {
        name: 'Chamomilla',
        potency: '6CH',
        specificIndication: 'Crying from teething pain',
        expectedResult: 'Calm and rested'
      },
      {
        name: 'Passiflora',
        potency: 'Q',
        specificIndication: 'Anxiety and irritability',
        expectedResult: 'Deep relaxation'
      },
      {
        name: 'Valeriana officinalis',
        potency: 'Q',
        specificIndication: 'Wakefulness with overexcitement',
        expectedResult: 'Calmer nights'
      },
      {
        name: 'Avena sativa',
        potency: 'Q',
        specificIndication: 'Nervous exhaustion',
        expectedResult: 'Refreshing rest'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 24 – Brain & Nerves',
    baholaSpecialty: 'Kiddy Forte'
  },
  {
    subConditionName: 'Recurrent Colds in Children',
    remedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6X',
        specificIndication: 'Frequent mild fevers',
        expectedResult: 'Fewer infections'
      },
      {
        name: 'Kali muriaticum',
        potency: '6X',
        specificIndication: 'Thick mucus, ear congestion',
        expectedResult: 'Easy breathing'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Weakness in damp weather',
        expectedResult: 'Stronger immunity'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Sneezing and watery discharge',
        expectedResult: 'Fewer colds'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Early cold stages with chill',
        expectedResult: 'Quick recovery'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'Kiddy Forte / Immunoplus'
  }
];
