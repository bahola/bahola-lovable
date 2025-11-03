import { SubConditionTreatment } from './types';

export const gutHealthTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Acidity / Indigestion',
    remedies: [
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Heartburn after rich food',
        expectedResult: 'Comforted digestion'
      },
      {
        name: 'Carbo vegetabilis',
        potency: '6CH',
        specificIndication: 'Bloating after meals',
        expectedResult: 'Relieved fullness'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Indigestion after oily food',
        expectedResult: 'Easy digestion'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Gas and distention',
        expectedResult: 'Flatness and appetite return'
      },
      {
        name: 'Iris versicolor',
        potency: '6CH',
        specificIndication: 'Burning sour reflux',
        expectedResult: 'Calmer stomach'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 25 – Acidity & Indigestion',
    baholaSpecialty: 'Acinil / Gastritis Drops'
  },
  {
    subConditionName: 'Constipation',
    remedies: [
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Dry hard stools',
        expectedResult: 'Regular soft motion'
      },
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Ineffectual urge',
        expectedResult: 'Normal bowel rhythm'
      },
      {
        name: 'Alumina',
        potency: '6CH',
        specificIndication: 'No desire for stool',
        expectedResult: 'Natural urge restored'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Bloating and gas',
        expectedResult: 'Lightness in abdomen'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Chronic constipation',
        expectedResult: 'Regular elimination'
      }
    ],
    biochemicRemedies: [
      { name: 'Silicea', potency: '6X' }
    ],
    bioCombination: 'BC No. 4 – Constipation',
    baholaSpecialty: 'Laxaril / Coloncare'
  },
  {
    subConditionName: 'Diarrhoea',
    remedies: [
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Burning stool, anxiety',
        expectedResult: 'Hydration and strength'
      },
      {
        name: 'Podophyllum',
        potency: '6CH',
        specificIndication: 'Watery stool morning',
        expectedResult: 'Normal pattern restored'
      },
      {
        name: 'Veratrum album',
        potency: '6CH',
        specificIndication: 'Weakness with vomiting',
        expectedResult: 'Relief from cramps'
      },
      {
        name: 'Chamomilla',
        potency: '6CH',
        specificIndication: 'Green stool in infants',
        expectedResult: 'Comforted baby'
      },
      {
        name: 'China',
        potency: '6CH',
        specificIndication: 'Exhaustion from fluid loss',
        expectedResult: 'Energy recovery'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 8 – Diarrhoea',
    baholaSpecialty: 'Diaril / Enterocare'
  },
  {
    subConditionName: 'Liver Congestion / Fatty Liver',
    remedies: [
      {
        name: 'Chelidonium majus',
        potency: 'Q',
        specificIndication: 'Pain under right ribs',
        expectedResult: 'Improved bile flow'
      },
      {
        name: 'Carduus marianus',
        potency: 'Q',
        specificIndication: 'Fatty degeneration',
        expectedResult: 'Detox and liver tone'
      },
      {
        name: 'Chionanthus',
        potency: 'Q',
        specificIndication: 'Jaundice with headache',
        expectedResult: 'Clear complexion'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Gas and heaviness after food',
        expectedResult: 'Easier digestion'
      },
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Alcohol-related issues',
        expectedResult: 'Renewed vitality'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 25',
    baholaSpecialty: 'Livace'
  },
  {
    subConditionName: 'Irritable Bowel Syndrome',
    remedies: [
      {
        name: 'Colocynthis',
        potency: '6CH',
        specificIndication: 'Crampy pain, better by pressure',
        expectedResult: 'Relief from spasm'
      },
      {
        name: 'Aloe',
        potency: '6CH',
        specificIndication: 'Urgent stool, rumbling',
        expectedResult: 'Regulated motion'
      },
      {
        name: 'Argentum nitricum',
        potency: '6CH',
        specificIndication: 'Nervous diarrhoea',
        expectedResult: 'Calm digestion'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Alternating constipation/diarrhoea',
        expectedResult: 'Balanced bowel'
      },
      {
        name: 'Natrum phosphoricum',
        potency: '6X',
        specificIndication: 'Gas and sour stomach',
        expectedResult: 'Reduced acidity'
      }
    ],
    biochemicRemedies: [
      { name: 'Magnesium phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 10 – Stomach Pain',
    baholaSpecialty: 'Gastrocare'
  }
];
