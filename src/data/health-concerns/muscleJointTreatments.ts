import { SubConditionTreatment } from './types';

export const muscleJointTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Fracture recovery / delayed union',
    remedies: [
      {
        name: 'Symphytum',
        potency: '6CH',
        specificIndication: 'Bone knitting after fracture',
        expectedResult: 'Faster union, less ache'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Deep bruise soreness',
        expectedResult: 'Swelling subsides'
      },
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Periosteal/tendon strain',
        expectedResult: 'Tendon comfort'
      },
      {
        name: 'Calcarea fluorica',
        potency: '6X',
        specificIndication: 'Hard callus, elasticity',
        expectedResult: 'Better resilience'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-ending pain',
        expectedResult: 'Tingling calms'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC 28 – Tonic',
    baholaSpecialty: 'Fractheel Drops'
  },
  {
    subConditionName: 'Carpal tunnel syndrome',
    remedies: [
      {
        name: 'Ruta graveolens',
        potency: '6CH',
        specificIndication: 'Overuse tendon pain',
        expectedResult: 'Easier wrist movement'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Shooting nerve pain',
        expectedResult: 'Nerve comfort'
      },
      {
        name: 'Arnica montana',
        potency: '6CH',
        specificIndication: 'Sore, overworked muscles',
        expectedResult: 'Soreness reduces'
      },
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Stiff on starting movement',
        expectedResult: 'Flexibility returns'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Worse with motion, better rest',
        expectedResult: 'Calm wrist'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 24 – Nerves',
    baholaSpecialty: 'Carpal Tunnel Drops'
  },
  {
    subConditionName: 'Gout / high uric acid',
    remedies: [
      {
        name: 'Colchicum',
        potency: '6CH',
        specificIndication: 'Swollen hot toe joints',
        expectedResult: 'Pain & swelling drop'
      },
      {
        name: 'Ledum palustre',
        potency: '6CH',
        specificIndication: 'Cold yet painful joints',
        expectedResult: 'Ease on movement'
      },
      {
        name: 'Benzoic acid',
        potency: '6CH',
        specificIndication: 'Strong urine odour, sore joints',
        expectedResult: 'Detox support'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Stitching pains on motion',
        expectedResult: 'Rest comfort'
      },
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Bruised tenderness',
        expectedResult: 'Relief & mobility'
      }
    ],
    biochemicRemedies: [
      { name: 'Natrum sulphuricum', potency: '6X' }
    ],
    bioCombination: 'BC 19 – Joints',
    baholaSpecialty: 'Gout Drops'
  },
  {
    subConditionName: 'Arthritis / shifting pains',
    remedies: [
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Stiff after rest, better moving',
        expectedResult: 'Looser joints'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Pain worse movement',
        expectedResult: 'Relief with rest'
      },
      {
        name: 'Causticum',
        potency: '6CH',
        specificIndication: 'Contractures, cramps',
        expectedResult: 'Better stretch'
      },
      {
        name: 'Kalmia latifolia',
        potency: '6CH',
        specificIndication: 'Pains shoot downward',
        expectedResult: 'Pain control'
      },
      {
        name: 'Ledum',
        potency: '6CH',
        specificIndication: 'Cold, puffy joints',
        expectedResult: 'Less stiffness'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Rheumace Drops'
  },
  {
    subConditionName: 'Hip osteoarthritis',
    remedies: [
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Start-up pain, morning stiffness',
        expectedResult: 'Smoother gait'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Hip pain on movement',
        expectedResult: 'Comfort with rest'
      },
      {
        name: 'Colocynthis',
        potency: '6CH',
        specificIndication: 'Crampy hip pain',
        expectedResult: 'Pain release'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Deep muscle soreness',
        expectedResult: 'Relaxed stride'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Heavy, weak joints',
        expectedResult: 'Supportive strength'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'CoxArthritis Drops'
  },
  {
    subConditionName: 'Cervical / lumbar spondylosis',
    remedies: [
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Stiff neck/back on waking',
        expectedResult: 'Flexible spine'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Stab pain with motion',
        expectedResult: 'Relief in stillness'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Weak neck muscles',
        expectedResult: 'Better head hold'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-root tingling',
        expectedResult: 'Nerve comfort'
      },
      {
        name: 'Cimicifuga',
        potency: '6CH',
        specificIndication: 'Muscular tension',
        expectedResult: 'Eased spasm'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Spondilace Drops'
  },
  {
    subConditionName: 'Inflammatory spondylitis',
    remedies: [
      {
        name: 'Kalmia',
        potency: '6CH',
        specificIndication: 'Pain radiates to arms/legs',
        expectedResult: 'Lighter limbs'
      },
      {
        name: 'Rhus toxicodendron',
        potency: '6CH',
        specificIndication: 'Better with motion',
        expectedResult: 'Ease through day'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Worse with movement',
        expectedResult: 'Settled spine'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-line pain',
        expectedResult: 'Calm nerves'
      },
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Residual soreness',
        expectedResult: 'Comfort returns'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Spondynil Drops'
  },
  {
    subConditionName: 'Sprain / strain',
    remedies: [
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Swelling, bruise pain',
        expectedResult: 'Quick recovery'
      },
      {
        name: 'Ruta',
        potency: '6CH',
        specificIndication: 'Tendon/ligament pull',
        expectedResult: 'Stronger support'
      },
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'First-movement pain',
        expectedResult: 'Freer range'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Deep muscle strain',
        expectedResult: 'Soreness eases'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-ending injury',
        expectedResult: 'Tingling settles'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Sprainil Drops'
  },
  {
    subConditionName: 'Tendonitis / tendinopathy',
    remedies: [
      {
        name: 'Ruta',
        potency: '6CH',
        specificIndication: 'Overuse tendon pain',
        expectedResult: 'Easier movement'
      },
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'Stiff on starting',
        expectedResult: 'Warm-up relief'
      },
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Sore, over-worked',
        expectedResult: 'Recovery support'
      },
      {
        name: 'Bryonia',
        potency: '6CH',
        specificIndication: 'Worse with movement',
        expectedResult: 'Pain control'
      },
      {
        name: 'Hypericum',
        potency: '6CH',
        specificIndication: 'Nerve-tendon irritation',
        expectedResult: 'Calmer nerves'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'TendonCare Drops'
  },
  {
    subConditionName: 'Muscle cramps & spasms',
    remedies: [
      {
        name: 'Magnesium phosphoricum',
        potency: '6CH',
        specificIndication: 'Cramp relieved by warmth',
        expectedResult: 'Spasm releases'
      },
      {
        name: 'Cuprum metallicum',
        potency: '6CH',
        specificIndication: 'Sudden violent cramps',
        expectedResult: 'Quick relaxation'
      },
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'Night cramps, stiff',
        expectedResult: 'Easier mornings'
      },
      {
        name: 'Zincum metallicum',
        potency: '6CH',
        specificIndication: 'Twitching, restlessness',
        expectedResult: 'Calmer legs'
      },
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Overuse soreness',
        expectedResult: 'Faster recovery'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Crampnil Drops'
  },
  {
    subConditionName: 'Plantar fasciitis / heel pain',
    remedies: [
      {
        name: 'Rhus tox',
        potency: '6CH',
        specificIndication: 'First-step pain',
        expectedResult: 'Pain-free steps'
      },
      {
        name: 'Arnica',
        potency: '6CH',
        specificIndication: 'Bruised heel',
        expectedResult: 'Tenderness reduces'
      },
      {
        name: 'Ruta',
        potency: '6CH',
        specificIndication: 'Strained plantar fascia',
        expectedResult: 'Tendon comfort'
      },
      {
        name: 'Bellis perennis',
        potency: '6CH',
        specificIndication: 'Deep tissue ache',
        expectedResult: 'Relief on standing'
      },
      {
        name: 'Calcarea fluorica',
        potency: '6X',
        specificIndication: 'Spur, rigidity',
        expectedResult: 'Better elasticity'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea fluorica', potency: '6X' }
    ],
    bioCombination: 'BC 19',
    baholaSpecialty: 'Plantar Fasciitis Drops'
  }
];
