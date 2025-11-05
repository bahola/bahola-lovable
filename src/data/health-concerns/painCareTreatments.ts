import { SubConditionTreatment } from './types';

export const painCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Acute Pain / Body Ache / Fever Pain',
    remedies: [
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Throbbing head & body heat',
        expectedResult: 'Fever and ache settle'
      },
      {
        name: 'Aconitum napellus',
        potency: '6CH',
        specificIndication: 'Sudden sharp pains after chill',
        expectedResult: 'Calm pulse & relief'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Pain worse on movement',
        expectedResult: 'Muscles relax'
      },
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Stiff pain better on motion',
        expectedResult: 'Freedom of movement'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Bruised soreness',
        expectedResult: 'Soreness subsides'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 11 – Fever & Pain',
    baholaSpecialty: 'Alpain'
  },
  {
    subConditionName: 'Muscular & Joint Pain (Balm/Gel Support)',
    remedies: [
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Muscular fatigue and bruise',
        expectedResult: 'Quick comfort'
      },
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Morning stiffness',
        expectedResult: 'Easy flexibility'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Pain on motion / swelling',
        expectedResult: 'Swelling eases'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Deep muscle ache',
        expectedResult: 'Relief after strain'
      },
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Tendon sprain',
        expectedResult: 'Ligament comfort'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19 – Joints & Muscles',
    baholaSpecialty: 'Bahola Pain Relief Gel'
  },
  {
    subConditionName: 'Sprain / Cramps / Minor Injury',
    remedies: [
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Swelling after twist',
        expectedResult: 'Faster healing'
      },
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Ligament strain',
        expectedResult: 'Support restored'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-ending pain',
        expectedResult: 'Tingling relief'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Over-exertion ache',
        expectedResult: 'Muscular ease'
      },
      {
        name: 'Cuprum metallicum',
        potency: '6CH',
        specificIndication: 'Sudden cramps',
        expectedResult: 'Spasm releases'
      }
    ],
    biochemicRemedies: [
      { name: 'Magnesium phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Bahola Balm'
  },
  {
    subConditionName: 'Rheumatic / Arthritic Pain',
    remedies: [
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Stiff after rest',
        expectedResult: 'Flexible joints'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Pain worse with motion',
        expectedResult: 'Rest comfort'
      },
      {
        name: 'Causticum',
        potency: '6CH',
        specificIndication: 'Contracted joints & cramps',
        expectedResult: 'Relief of tightness'
      },
      {
        name: 'Colchicum',
        potency: '6CH',
        specificIndication: 'Gouty pains with swelling',
        expectedResult: 'Reduced inflammation'
      },
      {
        name: 'Ledum palustre',
        potency: '6CH',
        specificIndication: 'Cold joints, numb pain',
        expectedResult: 'Warmer comfort'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Rheumoleo Oil / Cream'
  }
];
