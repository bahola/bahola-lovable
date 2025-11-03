import { SubConditionTreatment } from './types';

export const cancerTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Post-Radiation Recovery',
    remedies: [
      {
        name: 'Echinacea angustifolia',
        potency: 'Q',
        specificIndication: 'Weakness and slow tissue repair after radiation',
        expectedResult: 'Faster healing and renewed energy'
      },
      {
        name: 'Acidum phosphoricum',
        potency: '1X',
        specificIndication: 'Mental fatigue and exhaustion',
        expectedResult: 'Mental clarity and vitality return'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Delayed wound healing',
        expectedResult: 'Better tissue regeneration'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Burning sensations and fatigue',
        expectedResult: 'Balanced energy'
      },
      {
        name: 'China officinalis',
        potency: '6CH',
        specificIndication: 'Weakness after loss of fluids or blood',
        expectedResult: 'Strength and appetite restored'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Cancercare'
  },
  {
    subConditionName: 'Chemotherapy Support & Fatigue',
    remedies: [
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Weakness with heaviness and dull mind',
        expectedResult: 'Steadier nerves and focus'
      },
      {
        name: 'Alfalfa',
        potency: 'Q',
        specificIndication: 'Nutritional loss, poor weight',
        expectedResult: 'Weight and vitality improve'
      },
      {
        name: 'Kali phosphoricum',
        potency: '6X',
        specificIndication: 'Nervous exhaustion',
        expectedResult: 'Better sleep and calm mind'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Restlessness, anxiety',
        expectedResult: 'Calm and reassurance'
      },
      {
        name: 'Avena sativa',
        potency: 'Q',
        specificIndication: 'Sleeplessness from strain',
        expectedResult: 'Restful sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28',
    baholaSpecialty: 'Cancercare'
  },
  {
    subConditionName: 'Breast Cancer Recovery Adjuvant',
    remedies: [
      {
        name: 'Aethusa cynapium',
        potency: '6CH',
        specificIndication: 'Weak digestion, mental confusion',
        expectedResult: 'Improved clarity and digestion'
      },
      {
        name: 'Baryta carbonica',
        potency: '6CH',
        specificIndication: 'Hard glandular swellings',
        expectedResult: 'Softening of glands'
      },
      {
        name: 'Tarentula cubensis',
        potency: '30CH',
        specificIndication: 'Nerve pain with restlessness',
        expectedResult: 'Pain relief and calm'
      },
      {
        name: 'Rheum',
        potency: '12CH',
        specificIndication: 'Digestive disturbance post-therapy',
        expectedResult: 'Appetite restored'
      },
      {
        name: 'Ginkgo biloba',
        potency: '3X',
        specificIndication: 'Brain fog and circulatory weakness',
        expectedResult: 'Sharper focus and alertness'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 27 – Glands & Tissues',
    baholaSpecialty: 'BC Care'
  },
  {
    subConditionName: 'Immune Weakness During Therapy',
    remedies: [
      {
        name: 'Echinacea purpurea',
        potency: 'Q',
        specificIndication: 'Low resistance to infection',
        expectedResult: 'Stronger immunity'
      },
      {
        name: 'Thuja occidentalis',
        potency: '6CH',
        specificIndication: 'After-vaccination or drug effects',
        expectedResult: 'Detox support'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Slow recovery from illness',
        expectedResult: 'Improved stamina'
      },
      {
        name: 'Arsenicum iodatum',
        potency: '6CH',
        specificIndication: 'Chronic weakness with emaciation',
        expectedResult: 'Strength gain'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Weak digestion, bloating',
        expectedResult: 'Better assimilation'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28',
    baholaSpecialty: 'Cancercare'
  },
  {
    subConditionName: 'Digestive & Liver Support Post-Therapy',
    remedies: [
      {
        name: 'Chelidonium majus',
        potency: 'Q',
        specificIndication: 'Liver congestion and jaundice tendency',
        expectedResult: 'Clearer liver function'
      },
      {
        name: 'Carduus marianus',
        potency: 'Q',
        specificIndication: 'Fatty liver, toxicity',
        expectedResult: 'Detox support'
      },
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Indigestion from medications',
        expectedResult: 'Restored appetite'
      },
      {
        name: 'Hydrastis canadensis',
        potency: 'Q',
        specificIndication: 'Weak mucosa and poor assimilation',
        expectedResult: 'Better nutrition'
      },
      {
        name: 'Lycopodium',
        potency: '12CH',
        specificIndication: 'Bloating, flatulence after food',
        expectedResult: 'Digestive comfort'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 25 – Liver & Stomach',
    baholaSpecialty: 'Cancercare / BC Care'
  }
];
