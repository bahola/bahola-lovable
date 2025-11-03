import { SubConditionTreatment } from './types';

export const hairCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Hair Fall / Thinning',
    remedies: [
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Hair fall after illness or stress',
        expectedResult: 'Promotes new growth and shine'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Thinning at temples, premature balding',
        expectedResult: 'Fuller and stronger hair'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Brittle hair, weak roots',
        expectedResult: 'Strengthens roots and texture'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Hair fall from grief or tension',
        expectedResult: 'Emotional balance, less shedding'
      },
      {
        name: 'Fluoric acid',
        potency: '6CH',
        specificIndication: 'Chronic hair loss, rough hair',
        expectedResult: 'Revitalized follicles'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Alopec Drops'
  },
  {
    subConditionName: 'Dandruff / Scalp Scaling',
    remedies: [
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Dry, itchy scalp with flakes',
        expectedResult: 'Clears dandruff, soothes scalp'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Sticky, crusty scalp flakes',
        expectedResult: 'Healthy scalp surface'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Burning, irritated scalp',
        expectedResult: 'Cooling relief'
      },
      {
        name: 'Mezereum',
        potency: '6CH',
        specificIndication: 'Thick scabs, oozing spots',
        expectedResult: 'Cleanses and heals scalp'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Flaky scalp after emotional stress',
        expectedResult: 'Smooth, refreshed scalp'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 20 – Skin Diseases',
    baholaSpecialty: 'Dandruff-Nil'
  },
  {
    subConditionName: 'Hair Growth / Scalp Nourishment',
    remedies: [
      {
        name: 'Arnica montana',
        potency: 'Q',
        specificIndication: 'Weak roots, dull lifeless hair',
        expectedResult: 'Stimulates growth and shine'
      },
      {
        name: 'Jaborandi',
        potency: 'Q',
        specificIndication: 'Dry scalp with hair fall',
        expectedResult: 'Deep scalp nourishment'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Hair fall after illness',
        expectedResult: 'Encourages new growth'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Hormonal thinning',
        expectedResult: 'Thickens hair naturally'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Slow-growing, weak hair',
        expectedResult: 'Adds strength and volume'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – Tonic',
    baholaSpecialty: 'Arnicated Oil'
  },
  {
    subConditionName: 'Alopecia Areata (Patchy Hair Loss)',
    remedies: [
      {
        name: 'Fluoric acid',
        potency: '6CH',
        specificIndication: 'Round bald patches',
        expectedResult: 'New hair regrowth'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Patchy loss with scaling',
        expectedResult: 'Clearer scalp, improved density'
      },
      {
        name: 'Phosphorus',
        potency: '6CH',
        specificIndication: 'Hair fall after fever or illness',
        expectedResult: 'Quick regrowth'
      },
      {
        name: 'Thuja occidentalis',
        potency: '6CH',
        specificIndication: 'Hair loss after vaccination or drugs',
        expectedResult: 'Strengthened follicles'
      },
      {
        name: 'Lycopodium',
        potency: '6CH',
        specificIndication: 'Hormonal hair loss',
        expectedResult: 'Denser texture'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – Tonic',
    baholaSpecialty: 'Alopec Drops'
  },
  {
    subConditionName: 'Lice Infestation / Itchy Scalp',
    remedies: [
      {
        name: 'Staphysagria',
        potency: '6CH',
        specificIndication: 'Lice irritation, scalp itching',
        expectedResult: 'Relieved itching and calm scalp'
      },
      {
        name: 'Cocculus indicus',
        potency: 'Q',
        specificIndication: 'Natural anti-parasitic',
        expectedResult: 'Kills lice effectively'
      },
      {
        name: 'Cina',
        potency: '6CH',
        specificIndication: 'Persistent scalp irritation',
        expectedResult: 'Calmer scalp'
      },
      {
        name: 'Eucalyptus globulus',
        potency: 'Q',
        specificIndication: 'Disinfectant, anti-lice',
        expectedResult: 'Hygienic scalp'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Chronic scalp irritation',
        expectedResult: 'Restored scalp comfort'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 20 – Skin Diseases',
    baholaSpecialty: 'NoLice'
  }
];
