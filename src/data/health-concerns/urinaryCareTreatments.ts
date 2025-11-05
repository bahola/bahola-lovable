import { SubConditionTreatment } from './types';

export const urinaryCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Bed-Wetting in Children (Nocturnal Enuresis)',
    remedies: [
      {
        name: 'Kreosotum',
        potency: '6CH',
        specificIndication: 'Deep sleep with involuntary urination',
        expectedResult: 'Better bladder control'
      },
      {
        name: 'Eupatorium purpureum',
        potency: '6CH',
        specificIndication: 'Frequent urge with weak bladder',
        expectedResult: 'Stronger bladder tone'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Sudden urination in sleep',
        expectedResult: 'Calmer reflex'
      },
      {
        name: 'Sepia',
        potency: '6CH',
        specificIndication: 'Involuntary urine in girls',
        expectedResult: 'Normal control returns'
      },
      {
        name: 'Equisetum hyemale',
        potency: '6CH',
        specificIndication: 'Dribbling urine at night',
        expectedResult: 'Reduced episodes'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 27 – Enuresis',
    baholaSpecialty: 'Enurace'
  },
  {
    subConditionName: 'Uric Acid / Gouty Urinary Conditions',
    remedies: [
      {
        name: 'Benzoic acid',
        potency: '6CH',
        specificIndication: 'High uric acid, strong urine odour',
        expectedResult: 'Balanced metabolism'
      },
      {
        name: 'Colchicum',
        potency: '6CH',
        specificIndication: 'Gouty pain in small joints',
        expectedResult: 'Pain & swelling reduce'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Crystals in urine, digestive link',
        expectedResult: 'Better uric acid clearance'
      },
      {
        name: 'Sarsaparilla',
        potency: '6CH',
        specificIndication: 'Burning at end of urination',
        expectedResult: 'Smooth flow, no discomfort'
      },
      {
        name: 'Berberis vulgaris',
        potency: 'Q',
        specificIndication: 'Backache from kidney congestion',
        expectedResult: 'Detox relief'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 1 – Uric Acid & Gout',
    baholaSpecialty: 'Uricainil'
  },
  {
    subConditionName: 'Kidney Stones / Renal Calculi',
    remedies: [
      {
        name: 'Berberis vulgaris',
        potency: 'Q',
        specificIndication: 'Sharp pain radiating to bladder',
        expectedResult: 'Stone expulsion, relief'
      },
      {
        name: 'Sarsaparilla',
        potency: '6CH',
        specificIndication: 'Pain at end of urination',
        expectedResult: 'Smooth urine passage'
      },
      {
        name: 'Hydrangea arborescens',
        potency: 'Q',
        specificIndication: 'Gravelly urine, stone tendency',
        expectedResult: 'Dissolves deposits'
      },
      {
        name: 'Cantharis',
        potency: '6CH',
        specificIndication: 'Burning before/during urination',
        expectedResult: 'Soothed bladder lining'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Kidney pain with gas',
        expectedResult: 'Improved flow'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 18 – Kidney & Bladder',
    baholaSpecialty: 'Renal D'
  },
  {
    subConditionName: 'Urinary Tract Infection (UTI) / Burning Urination',
    remedies: [
      {
        name: 'Cantharis',
        potency: '6CH',
        specificIndication: 'Severe burning before and after urination',
        expectedResult: 'Cooling comfort'
      },
      {
        name: 'Sarsaparilla',
        potency: '6CH',
        specificIndication: 'Pain at end of flow',
        expectedResult: 'Smooth urination'
      },
      {
        name: 'Apis mellifica',
        potency: '6CH',
        specificIndication: 'Stinging burning with scanty urine',
        expectedResult: 'Swelling reduces'
      },
      {
        name: 'Berberis vulgaris',
        potency: 'Q',
        specificIndication: 'Cutting pain in bladder region',
        expectedResult: 'Relief from discomfort'
      },
      {
        name: 'Eupatorium purpureum',
        potency: '6CH',
        specificIndication: 'Constant urge to urinate',
        expectedResult: 'Comfortable control'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 18 – Bladder & Kidneys',
    baholaSpecialty: 'Urelief'
  }
];
