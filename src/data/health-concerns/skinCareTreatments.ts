import { SubConditionTreatment } from './types';

export const skinCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Blood Purifier / Detox for Healthy Skin',
    remedies: [
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Chronic eruptions, boils, itching',
        expectedResult: 'Clear, fresh skin'
      },
      {
        name: 'Berberis aquifolium',
        potency: 'Q',
        specificIndication: 'Acne, dark spots, blotches',
        expectedResult: 'Clearer complexion'
      },
      {
        name: 'Echinacea',
        potency: 'Q',
        specificIndication: 'Recurrent boils, low immunity',
        expectedResult: 'Reduced breakouts'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Suppurating pimples',
        expectedResult: 'Quicker healing'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Sticky eruptions',
        expectedResult: 'Smooth complexion'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 20 – Skin Diseases',
    baholaSpecialty: 'Haematone'
  },
  {
    subConditionName: 'Acne / Pimples (Internal Purifier)',
    remedies: [
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Red, inflamed acne with itching',
        expectedResult: 'Clearer skin'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Painful, sensitive pimples',
        expectedResult: 'Rapid healing'
      },
      {
        name: 'Calcarea sulphurica',
        potency: '6CH',
        specificIndication: 'Pus-filled pimples',
        expectedResult: 'Drains quickly, less scarring'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Acne from stress, salt craving',
        expectedResult: 'Reduced oiliness'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Oozing eruptions',
        expectedResult: 'Smooth recovery'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 20 – Skin Diseases',
    baholaSpecialty: 'Acnil'
  },
  {
    subConditionName: 'Skin Brightening / Uneven Tone',
    remedies: [
      {
        name: 'Berberis aquifolium',
        potency: 'Q',
        specificIndication: 'Dull complexion, acne marks',
        expectedResult: 'Brighter, clearer skin'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Pigmentation & oily T-zone',
        expectedResult: 'Balanced tone'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Dark circles, patchy skin',
        expectedResult: 'Hydrated glow'
      },
      {
        name: 'Calcarea fluorica',
        potency: '6X',
        specificIndication: 'Rough, uneven surface',
        expectedResult: 'Smooth texture'
      },
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Sallow dull skin',
        expectedResult: 'Fresh radiant tone'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'SkinTone'
  },
  {
    subConditionName: 'Acne / Blemishes (Topical Repair)',
    remedies: [
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Red pimples with itching',
        expectedResult: 'Clear complexion'
      },
      {
        name: 'Calcarea sulphurica',
        potency: '6CH',
        specificIndication: 'Pustular acne',
        expectedResult: 'Heals without marks'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Painful inflamed acne',
        expectedResult: 'Quick resolution'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Oily forehead acne',
        expectedResult: 'Sebum balance'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Oozing eruptions',
        expectedResult: 'Smooth surface'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Skin Salve'
  },
  {
    subConditionName: 'Eczema / Itchy Skin',
    remedies: [
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Cracked, oozing patches',
        expectedResult: 'Smooth healing'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Burning itch at night',
        expectedResult: 'Calm skin'
      },
      {
        name: 'Mezereum',
        potency: '6CH',
        specificIndication: 'Thick crusts on scalp or face',
        expectedResult: 'Stops ooze'
      },
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'Itch after wet weather',
        expectedResult: 'Fewer flare-ups'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Secondary infection',
        expectedResult: 'Fast repair'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Eczemanil'
  },
  {
    subConditionName: 'Chronic Eczema / Lichenified Patches',
    remedies: [
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Thick, cracked, oozing skin',
        expectedResult: 'Softer, healed surface'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Night itching, dry burning skin',
        expectedResult: 'Calmer itch, clearer skin'
      },
      {
        name: 'Mezereum',
        potency: '6CH',
        specificIndication: 'Thick crusts on scalp/face',
        expectedResult: 'Ooze and crusts reduce'
      },
      {
        name: 'Petroleum',
        potency: '6CH',
        specificIndication: 'Winter cracks, very dry eczema',
        expectedResult: 'Restored moisture barrier'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Secondary infection tendency',
        expectedResult: 'Faster, cleaner healing'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC 20 – Skin Diseases',
    baholaSpecialty: 'Eczemace'
  },
  {
    subConditionName: 'Psoriasis / Dry Scaly Patches',
    remedies: [
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Dry burning scales',
        expectedResult: 'Softer skin'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Itchy dry eruption',
        expectedResult: 'Smooth texture'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Thick scales behind ears',
        expectedResult: 'Clean surface'
      },
      {
        name: 'Mezereum',
        potency: '6CH',
        specificIndication: 'Scalp crusts',
        expectedResult: 'Calm itch'
      },
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'Weather-flare psoriasis',
        expectedResult: 'Fewer episodes'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Psoriasis Drops'
  },
  {
    subConditionName: 'Sun Allergy / Redness',
    remedies: [
      {
        name: 'Apis mellifica',
        potency: '6CH',
        specificIndication: 'Red, itchy eruption after sun',
        expectedResult: 'Cooling relief'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Burning heat rash',
        expectedResult: 'Temperature normalises'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Heat worsens itch',
        expectedResult: 'Soothed skin'
      },
      {
        name: 'Urtica urens',
        potency: '6CH',
        specificIndication: 'Stinging eruption',
        expectedResult: 'Comfort returns'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Dry chapped skin',
        expectedResult: 'Hydrated surface'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Photosensnil'
  },
  {
    subConditionName: 'Leucoderma / Pigment Loss',
    remedies: [
      {
        name: 'Arsenicum sulphuratum flavum',
        potency: '6CH',
        specificIndication: 'White patches, loss of pigment',
        expectedResult: 'Pigment revival'
      },
      {
        name: 'Psorinum',
        potency: '6CH',
        specificIndication: 'Chronic skin tendency',
        expectedResult: 'Tone restored'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Dry scaly areas',
        expectedResult: 'Improved colour'
      },
      {
        name: 'Hydrocotyle asiatica',
        potency: '6CH',
        specificIndication: 'Rough discoloured skin',
        expectedResult: 'Even tone'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Loss from stress',
        expectedResult: 'Restored pigment'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Vitinil'
  },
  {
    subConditionName: 'Warts',
    remedies: [
      {
        name: 'Thuja occidentalis',
        potency: '6CH',
        specificIndication: 'Hard warty growths',
        expectedResult: 'Shrinks lesions'
      },
      {
        name: 'Antimonium crudum',
        potency: '6CH',
        specificIndication: 'Horny warts on hands/feet',
        expectedResult: 'Softens skin'
      },
      {
        name: 'Nitric acid',
        potency: '6CH',
        specificIndication: 'Painful corn-like warts',
        expectedResult: 'Pressure comfort'
      },
      {
        name: 'Causticum',
        potency: '6CH',
        specificIndication: 'Flat soft warts',
        expectedResult: 'Clear surface'
      },
      {
        name: 'Dulcamara',
        potency: '6CH',
        specificIndication: 'Moist warts',
        expectedResult: 'Dry skin'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Wartnil'
  },
  {
    subConditionName: 'Corn / Callus',
    remedies: [
      {
        name: 'Antimonium crudum',
        potency: '6CH',
        specificIndication: 'Thick horny corn on soles',
        expectedResult: 'Softened corn tissue'
      },
      {
        name: 'Nitric acid',
        potency: '6CH',
        specificIndication: 'Painful corns on toes',
        expectedResult: 'Easier walking'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Deep cracks with callus',
        expectedResult: 'Smooth surface'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Chronic corns, hardened tissue',
        expectedResult: 'Clear, healthy skin'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Recurring thickened skin',
        expectedResult: 'Reduced recurrence'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 20 – Corns',
    baholaSpecialty: 'Corn Paint'
  },
  {
    subConditionName: 'Antiseptic Dusting Powder (Bedsores / Burns)',
    remedies: [
      {
        name: 'Calendula',
        potency: '6CH',
        specificIndication: 'Ulcers, sores, burns',
        expectedResult: 'Gentle antisepsis'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Bruised or reddened area',
        expectedResult: 'Reduces soreness'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-end pain in ulcers',
        expectedResult: 'Comfort restored'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Slow-healing wounds',
        expectedResult: 'Healthy closure'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Red inflamed surface',
        expectedResult: 'Cooling relief'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC 17 – Inflammation',
    baholaSpecialty: 'Dermin'
  },
  {
    subConditionName: 'Antiseptic Cream / Minor Wounds',
    remedies: [
      {
        name: 'Calendula',
        potency: 'Q',
        specificIndication: 'Cuts, abrasions, rashes',
        expectedResult: 'Rapid healing'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve pain after minor injury',
        expectedResult: 'Soothed tissue'
      },
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Bruising & soreness',
        expectedResult: 'Comfort & recovery'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Chronic wound tendency',
        expectedResult: 'Skin renewal'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Deep muscle tenderness',
        expectedResult: 'Relief & softness'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC 17',
    baholaSpecialty: 'Calendula Cream'
  }
];
