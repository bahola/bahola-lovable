import { SubConditionTreatment } from './types';

export const allergyTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Allergic Rhinitis',
    remedies: [
      {
        name: 'Allium cepa',
        potency: '6CH',
        specificIndication: 'Watery nasal discharge, burning nose',
        expectedResult: 'Stops sneezing & runny nose'
      },
      {
        name: 'Sabadilla',
        potency: '6CH',
        specificIndication: 'Violent sneezing, itching of nose',
        expectedResult: 'Reduced sneezing & nasal itch'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Burning discharge, restlessness',
        expectedResult: 'Relief of irritation & fatigue'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Morning sneezing, blocked nose',
        expectedResult: 'Opens nasal passages'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '6X',
        specificIndication: 'Early cold stage with mild fever',
        expectedResult: 'Fewer recurrences'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'Rhinicare'
  },
  {
    subConditionName: 'Sinusitis / Nasal Congestion',
    remedies: [
      {
        name: 'Kali bichromicum',
        potency: '6CH',
        specificIndication: 'Thick stringy yellow mucus',
        expectedResult: 'Clears sinus blockage'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Pain from cold air, pus discharge',
        expectedResult: 'Reduced inflammation'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Offensive discharge & metallic taste',
        expectedResult: 'Less mucus & pressure'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Thick yellow-green mucus warm room',
        expectedResult: 'Freer breathing'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Burning drip & restlessness',
        expectedResult: 'Comfort & energy return'
      }
    ],
    biochemicRemedies: [
      { name: 'Silicea', potency: '6X' }
    ],
    bioCombination: 'BC No. 5 – Sinus & Catarrh',
    baholaSpecialty: 'Sinaril'
  },
  {
    subConditionName: 'Dust Allergy / Sneezing Fits',
    remedies: [
      {
        name: 'Allium cepa',
        potency: '6CH',
        specificIndication: 'Sneezing from draft air',
        expectedResult: 'Stops repetitive sneezing'
      },
      {
        name: 'Nux vomica',
        potency: '6CH',
        specificIndication: 'Blocked nose at night, runny by day',
        expectedResult: 'Restful sleep'
      },
      {
        name: 'Histaminum',
        potency: '6CH',
        specificIndication: 'General allergic reaction',
        expectedResult: 'Rapid relief'
      },
      {
        name: 'Luffa operculata',
        potency: '6CH',
        specificIndication: 'Dry blocked nose without mucus',
        expectedResult: 'Opens passage'
      },
      {
        name: 'Bryonia alba',
        potency: '6CH',
        specificIndication: 'Dry coryza with headache',
        expectedResult: 'Clears stuffy nose'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6',
    baholaSpecialty: 'Rhinicare'
  },
  {
    subConditionName: 'Skin Allergy / Hives',
    remedies: [
      {
        name: 'Apis mellifica',
        potency: '6CH',
        specificIndication: 'Red itchy wheals worse by heat',
        expectedResult: 'Soothes itch & swelling'
      },
      {
        name: 'Urtica urens',
        potency: '6CH',
        specificIndication: 'Burning itch after seafood or heat',
        expectedResult: 'Rash subsides'
      },
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Rash with blisters in wet weather',
        expectedResult: 'Eases burning & dryness'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Itchy eruptions on warmth',
        expectedResult: 'Clears recurrence'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Oozing eczema-like skin',
        expectedResult: 'Heals cracks & scaling'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 20 – Skin Diseases',
    baholaSpecialty: '—'
  },
  {
    subConditionName: 'Eye Allergy / Conjunctivitis',
    remedies: [
      {
        name: 'Euphrasia',
        potency: '6CH',
        specificIndication: 'Watery burning eyes',
        expectedResult: 'Clear vision & comfort'
      },
      {
        name: 'Apis mellifica',
        potency: '6X',
        specificIndication: 'Puffy eyelids & itching',
        expectedResult: 'Swelling subsides'
      },
      {
        name: 'Argentum nitricum',
        potency: '6CH',
        specificIndication: 'Red irritated eyes',
        expectedResult: 'Less grittiness'
      },
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Eye strain & dryness',
        expectedResult: 'Eye relaxation'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Burning eyes at night',
        expectedResult: 'Calmer sleep'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6',
    baholaSpecialty: 'AllerEye / Eyecare'
  },
  {
    subConditionName: 'Asthma from Allergy',
    remedies: [
      {
        name: 'Blatta orientalis',
        potency: '6CH',
        specificIndication: 'Wheezing with mucus rattle',
        expectedResult: 'Easier breathing'
      },
      {
        name: 'Ipecacuanha',
        potency: '6CH',
        specificIndication: 'Spasmodic cough with nausea',
        expectedResult: 'Less mucus'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Breathlessness after midnight',
        expectedResult: 'Better oxygen intake'
      },
      {
        name: 'Natrum sulphuricum',
        potency: '6X',
        specificIndication: 'Aggravated by damp weather',
        expectedResult: 'Reduced wheezing'
      },
      {
        name: 'Grindelia robusta',
        potency: '6CH',
        specificIndication: 'Difficult expectoration',
        expectedResult: 'Clear lungs'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC No. 2 – Asthma',
    baholaSpecialty: 'Asmagen'
  },
  {
    subConditionName: 'Sinus Headache',
    remedies: [
      {
        name: 'Sanguinaria canadensis',
        potency: '6CH',
        specificIndication: 'Pain right side to head',
        expectedResult: 'Relieves pressure'
      },
      {
        name: 'Kali bichromicum',
        potency: '6CH',
        specificIndication: 'Pain root of nose',
        expectedResult: 'Eases block'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Sudden throbbing head pain',
        expectedResult: 'Cool comfort'
      },
      {
        name: 'Spigelia',
        potency: '6CH',
        specificIndication: 'Sharp eye & forehead pain',
        expectedResult: 'Calmer nerves'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Pain worse by movement',
        expectedResult: 'Steady relief'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 25 – Headache',
    baholaSpecialty: 'Sinaril'
  },
  {
    subConditionName: 'Eczema (Allergic)',
    remedies: [
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Oozing eczema with cracks',
        expectedResult: 'Smooth skin healing'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Dry itchy patches worse by heat',
        expectedResult: 'Clear skin'
      },
      {
        name: 'Mezereum',
        potency: '6CH',
        specificIndication: 'Thick crusts on scalp or face',
        expectedResult: 'Stops oozing'
      },
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Itching from damp weather',
        expectedResult: 'Reduced flare-ups'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Infected eczema',
        expectedResult: 'Heals faster'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC No. 20',
    baholaSpecialty: 'Eczemace / Haematone'
  },
  {
    subConditionName: 'Allergic Cough / Throat Irritation',
    remedies: [
      {
        name: 'Rumex crispus',
        potency: '6CH',
        specificIndication: 'Dry tickle in throat',
        expectedResult: 'Stops cough spasms'
      },
      {
        name: 'Drosera',
        potency: '6CH',
        specificIndication: 'Deep dry barking cough',
        expectedResult: 'Reduced fits'
      },
      {
        name: 'Spongia tosta',
        potency: '6CH',
        specificIndication: 'Dry hoarse cough',
        expectedResult: 'Smooth breathing'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Cough worse on motion',
        expectedResult: 'Calmer chest'
      },
      {
        name: 'Ipecacuanha',
        potency: '6CH',
        specificIndication: 'Mucus with nausea',
        expectedResult: 'Cleared airways'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6',
    baholaSpecialty: 'Cof-Y / Cof-Z'
  },
  {
    subConditionName: 'Chronic Allergic Cold',
    remedies: [
      {
        name: 'Natrum muriaticum',
        potency: '12X',
        specificIndication: 'Recurrent cold with sneezing',
        expectedResult: 'Stronger resistance'
      },
      {
        name: 'Sulphur',
        potency: '12CH',
        specificIndication: 'Catches cold easily',
        expectedResult: 'Fewer episodes'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Damp sensitivity & sweats',
        expectedResult: 'Improved immunity'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Thick yellow mucus',
        expectedResult: 'Clear sinuses'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Early cold with sore throat',
        expectedResult: 'Quick recovery'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 6',
    baholaSpecialty: 'Rhinicare / Sinaril'
  }
];
