import { SubConditionTreatment } from './types';

export const skinCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Blood Purifier / Acne Support',
    remedies: [
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Chronic skin eruptions, itching',
        expectedResult: 'Clear, glowing skin'
      },
      {
        name: 'Berberis aquifolium',
        potency: 'Q',
        specificIndication: 'Pimples, dark spots',
        expectedResult: 'Clearer complexion'
      },
      {
        name: 'Echinacea angustifolia',
        potency: 'Q',
        specificIndication: 'Recurrent boils, low immunity',
        expectedResult: 'Reduced breakouts'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Suppurating acne',
        expectedResult: 'Faster healing'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Oozing eruptions',
        expectedResult: 'Smooth skin'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Kali sulphuricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 20 – Skin Diseases',
    baholaSpecialty: 'Haematone'
  },
  {
    subConditionName: 'Acne / Blemishes',
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
        specificIndication: 'Pustular eruption',
        expectedResult: 'Healing without marks'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Painful acne',
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
        specificIndication: 'Sticky oozing eruption',
        expectedResult: 'Smooth skin'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Kali sulphuricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'SkinTone / Skin Salve'
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
        expectedResult: 'Clear skin'
      },
      {
        name: 'Mezereum',
        potency: '6CH',
        specificIndication: 'Thick crusts on scalp or face',
        expectedResult: 'Stops ooze'
      },
      {
        name: 'Rhus toxicodendron',
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
      {
        name: 'Calcarea sulphurica',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Eczemanil'
  },
  {
    subConditionName: 'Psoriasis / Dry Scaly Patches',
    remedies: [
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Dry burning scales',
        expectedResult: 'Smooth texture'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Itchy dry eruption',
        expectedResult: 'Softer skin'
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
        specificIndication: 'Weather flare psoriasis',
        expectedResult: 'Fewer episodes'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Natrum sulphuricum',
        potency: '6X'
      }
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
        expectedResult: 'Temperature normalizes'
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
      {
        name: 'Kali muriaticum',
        potency: '6X'
      }
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
        specificIndication: 'White spots on skin',
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
      {
        name: 'Calcarea fluorica',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Vitinil'
  },
  {
    subConditionName: 'Corn / Warts',
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
        specificIndication: 'Thick hard corns',
        expectedResult: 'Softened skin'
      },
      {
        name: 'Nitric acid',
        potency: '6CH',
        specificIndication: 'Painful corn edges',
        expectedResult: 'Relief on pressure'
      },
      {
        name: 'Causticum',
        potency: '6CH',
        specificIndication: 'Soft flat warts',
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
      {
        name: 'Calcarea fluorica',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 20',
    baholaSpecialty: 'Wartnil / Corn Paint'
  },
  {
    subConditionName: 'Antiseptic / Wound Care',
    remedies: [
      {
        name: 'Calendula',
        potency: '6CH',
        specificIndication: 'Cuts & rashes',
        expectedResult: 'Gentle healing'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve pain in wounds',
        expectedResult: 'Calm sensation'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Bruised tissue',
        expectedResult: 'Soreness subsides'
      },
      {
        name: 'Silicea',
        potency: '6X',
        specificIndication: 'Slow healing ulcers',
        expectedResult: 'Healthy closure'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Inflammation with redness',
        expectedResult: 'Cooling comfort'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Calcarea sulphurica',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 17 – Inflammation',
    baholaSpecialty: 'Dermin / Calendula Cream'
  }
];
