import { SubConditionTreatment } from './types';

export const toothCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Toothache / Decay / Bleeding Gums',
    remedies: [
      {
        name: 'Chamomilla',
        potency: '6CH',
        specificIndication: 'Sharp shooting pain, worse at night',
        expectedResult: 'Calm and comforted nerves'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Bleeding, spongy gums with foul breath',
        expectedResult: 'Healthier gums'
      },
      {
        name: 'Plantago major',
        potency: 'Q',
        specificIndication: 'Neuralgic tooth pain, sensitive to touch',
        expectedResult: 'Rapid pain relief'
      },
      {
        name: 'Hepar sulphuris',
        potency: '6CH',
        specificIndication: 'Toothache from cold air',
        expectedResult: 'Quick recovery'
      },
      {
        name: 'Kreosotum',
        potency: '6CH',
        specificIndication: 'Caries with offensive odour',
        expectedResult: 'Prevents decay spread'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Calcarea fluorica',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 1 – Toothache & Gums',
    baholaSpecialty: 'Bahola Tooth Drops'
  },
  {
    subConditionName: 'Post-Procedure / Root-Canal Pain',
    remedies: [
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Soreness and bruised gums after dental work',
        expectedResult: 'Less swelling and tenderness'
      },
      {
        name: 'Hypericum perforatum',
        potency: '6CH',
        specificIndication: 'Nerve injury pain after extraction',
        expectedResult: 'Nerve comfort restored'
      },
      {
        name: 'Calendula',
        potency: 'Q',
        specificIndication: 'Healing socket and gums',
        expectedResult: 'Faster tissue repair'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Deep muscular soreness in jaw',
        expectedResult: 'Relaxed jaw muscles'
      },
      {
        name: 'Staphysagria',
        potency: '6CH',
        specificIndication: 'Stinging surgical pain',
        expectedResult: 'Calm wound edges'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Ferrum phosphoricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 19 – Inflammation & Pain',
    baholaSpecialty: 'Dolodent'
  },
  {
    subConditionName: 'Dental Anxiety / Post-Operative Healing',
    remedies: [
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Trembling from fear of dentist',
        expectedResult: 'Confidence and calm'
      },
      {
        name: 'Argentum nitricum',
        potency: '6CH',
        specificIndication: 'Anticipatory anxiety before dental work',
        expectedResult: 'Relaxed mind'
      },
      {
        name: 'Aconitum napellus',
        potency: '6CH',
        specificIndication: 'Panic during procedure',
        expectedResult: 'Steady breathing'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Bruised tissues post-treatment',
        expectedResult: 'Quick recovery'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Tingling gums post-anesthetic',
        expectedResult: 'Restful mouth feel'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Kali phosphoricum',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 24 – Brain & Nerves',
    baholaSpecialty: 'Dentacare'
  },
  {
    subConditionName: 'Mouth Ulcers / Oral Thrush / Cracked Lips',
    remedies: [
      {
        name: 'Borax',
        potency: '6CH',
        specificIndication: 'Aphthae that bleed easily',
        expectedResult: 'Pain-free eating'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Offensive saliva, tongue ulcers',
        expectedResult: 'Fresh mouth feel'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Cracked corners of lips',
        expectedResult: 'Soft, healed lips'
      },
      {
        name: 'Kali chloricum',
        potency: '6X',
        specificIndication: 'Sore tongue, ulcer patches',
        expectedResult: 'Smooth surface'
      },
      {
        name: 'Arsenicum album',
        potency: '6CH',
        specificIndication: 'Burning mouth ulcers',
        expectedResult: 'Cooling comfort'
      }
    ],
    biochemicRemedies: [
      {
        name: 'Calcarea phosphorica',
        potency: '6X'
      }
    ],
    bioCombination: 'BC 12 – Mouth & Tongue',
    baholaSpecialty: 'CankerSore'
  }
];
