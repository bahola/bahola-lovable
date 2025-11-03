import { SubConditionTreatment } from './types';

export const entCareTreatments: SubConditionTreatment[] = [
  {
    subConditionName: 'Tinnitus (Ringing in Ears)',
    remedies: [
      {
        name: 'Chininum sulphuricum',
        potency: '6CH',
        specificIndication: 'Buzzing or ringing with dizziness',
        expectedResult: 'Reduced noise and clearer hearing'
      },
      {
        name: 'Graphites',
        potency: '6CH',
        specificIndication: 'Crackling and blocked sensation',
        expectedResult: 'Improved ear tone'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6CH',
        specificIndication: 'Humming noises with fatigue',
        expectedResult: 'Balanced hearing'
      },
      {
        name: 'Acidum salicylicum',
        potency: '6CH',
        specificIndication: 'Ringing after noise exposure',
        expectedResult: 'Quieter ears'
      },
      {
        name: 'Coffea cruda',
        potency: '4CH',
        specificIndication: 'Over-sensitivity to sounds',
        expectedResult: 'Calmer hearing response'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 28 – General Tonic',
    baholaSpecialty: 'Tinnitus Drops'
  },
  {
    subConditionName: 'Ear Infection (Otitis Media)',
    remedies: [
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Throbbing pain with pus',
        expectedResult: 'Pain reduction and drainage'
      },
      {
        name: 'Chamomilla',
        potency: '6X',
        specificIndication: 'Irritability and crying from pain',
        expectedResult: 'Comfort and rest'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Ear pain with discharge',
        expectedResult: 'Quick healing'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Sudden ear pain with fever',
        expectedResult: 'Reduced fever and ache'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '6X',
        specificIndication: 'Initial stage of infection',
        expectedResult: 'Prevents pus formation'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC No. 17 – Inflammation',
    baholaSpecialty: 'Otitiscare'
  },
  {
    subConditionName: 'Nasal Polyps',
    remedies: [
      {
        name: 'Teucrium marum verum',
        potency: '6CH',
        specificIndication: 'Obstruction with constant catarrh',
        expectedResult: 'Shrinking of polyps'
      },
      {
        name: 'Lemna minor',
        potency: '6CH',
        specificIndication: 'Nasal blockage with foul smell',
        expectedResult: 'Open breathing'
      },
      {
        name: 'Sanguinaria',
        potency: '6CH',
        specificIndication: 'Post-nasal drip, congestion',
        expectedResult: 'Clearer sinuses'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Blocked nose with yellow mucus',
        expectedResult: 'Freer airways'
      },
      {
        name: 'Calcarea carbonica',
        potency: '6X',
        specificIndication: 'Growth tendency in mucosa',
        expectedResult: 'Reduced recurrence'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 5 – Sinus & Catarrh',
    baholaSpecialty: 'Nasopolypnil'
  },
  {
    subConditionName: 'Hoarseness / Voice Fatigue',
    remedies: [
      {
        name: 'Causticum',
        potency: '12CH',
        specificIndication: 'Hoarseness after talking',
        expectedResult: 'Smooth voice'
      },
      {
        name: 'Arum triphyllum',
        potency: '12CH',
        specificIndication: 'Raw throat from overuse',
        expectedResult: 'Less irritation'
      },
      {
        name: 'Phosphorus',
        potency: '12CH',
        specificIndication: 'Loss of tone in singers',
        expectedResult: 'Clear, strong voice'
      },
      {
        name: 'Borax',
        potency: '12CH',
        specificIndication: 'Dry tickle throat',
        expectedResult: 'Relief of dryness'
      },
      {
        name: 'Stannum',
        potency: '6CH',
        specificIndication: 'Weak laryngeal muscles',
        expectedResult: 'Stronger voice'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'Voicecare'
  },
  {
    subConditionName: 'Tonsillitis',
    remedies: [
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Sore red throat with fever',
        expectedResult: 'Pain and fever subside'
      },
      {
        name: 'Lachesis',
        potency: '12CH',
        specificIndication: 'Left-sided swelling, cannot swallow',
        expectedResult: 'Reduces inflammation'
      },
      {
        name: 'Hepar sulphur',
        potency: '12CH',
        specificIndication: 'Suppurating tonsils',
        expectedResult: 'Drains pus quickly'
      },
      {
        name: 'Phytolacca decandra',
        potency: '6CH',
        specificIndication: 'Dark red throat with pain',
        expectedResult: 'Heals inflammation'
      },
      {
        name: 'Mercurius solubilis',
        potency: '12CH',
        specificIndication: 'Pain with salivation',
        expectedResult: 'Relieves infection'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 15 – Throat & Tonsils',
    baholaSpecialty: 'Tonsinil / Tonsilo'
  },
  {
    subConditionName: 'Chronic Sinusitis',
    remedies: [
      {
        name: 'Kali bichromicum',
        potency: '12X',
        specificIndication: 'Thick nasal discharge',
        expectedResult: 'Opens sinuses'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Blocked nose at night',
        expectedResult: 'Easy breathing'
      },
      {
        name: 'Arsenicum album',
        potency: '12CH',
        specificIndication: 'Burning nasal mucus',
        expectedResult: 'Relief from irritation'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Offensive post-nasal drip',
        expectedResult: 'Less congestion'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Pain on cold exposure',
        expectedResult: 'Calmer sinuses'
      }
    ],
    biochemicRemedies: [
      { name: 'Silicea', potency: '6X' }
    ],
    bioCombination: 'BC No. 5 – Sinus & Catarrh',
    baholaSpecialty: 'Sinaril'
  },
  {
    subConditionName: 'Earache (Children)',
    remedies: [
      {
        name: 'Chamomilla',
        potency: '6X',
        specificIndication: 'Pain and crying at night',
        expectedResult: 'Calmer child'
      },
      {
        name: 'Belladonna',
        potency: '6CH',
        specificIndication: 'Sudden stabbing earache',
        expectedResult: 'Quick comfort'
      },
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Ear pain with discharge',
        expectedResult: 'Clears infection'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Ear sensitive to touch',
        expectedResult: 'Less soreness'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Ear pain with salivation',
        expectedResult: 'Soothing relief'
      }
    ],
    biochemicRemedies: [
      { name: 'Ferrum phosphoricum', potency: '6X' }
    ],
    bioCombination: 'BC No. 15 – Throat & Tonsils',
    baholaSpecialty: 'Mullein Essence / Earsol'
  },
  {
    subConditionName: 'Voice Strain (Teachers / Singers)',
    remedies: [
      {
        name: 'Phosphorus',
        potency: '12CH',
        specificIndication: 'Raw throat after talking',
        expectedResult: 'Eased irritation'
      },
      {
        name: 'Causticum',
        potency: '12CH',
        specificIndication: 'Weak voice, worse mornings',
        expectedResult: 'Smooth tone returns'
      },
      {
        name: 'Borax',
        potency: '12CH',
        specificIndication: 'Dry throat, voice cracks',
        expectedResult: 'Less dryness'
      },
      {
        name: 'Arum triphyllum',
        potency: '12CH',
        specificIndication: 'Burning throat from overuse',
        expectedResult: 'Comfort and voice clarity'
      },
      {
        name: 'Argentum metallicum',
        potency: '6CH',
        specificIndication: 'Voice weakness with fatigue',
        expectedResult: 'Stronger projection'
      }
    ],
    biochemicRemedies: [
      { name: 'Kali muriaticum', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'Voicecare'
  },
  {
    subConditionName: 'Blocked Ears from Cold',
    remedies: [
      {
        name: 'Pulsatilla',
        potency: '6CH',
        specificIndication: 'Fullness and buzzing',
        expectedResult: 'Open hearing'
      },
      {
        name: 'Chamomilla',
        potency: '6CH',
        specificIndication: 'Earache with crying',
        expectedResult: 'Quick comfort'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Blocked ear with sensitivity',
        expectedResult: 'Clear canal'
      },
      {
        name: 'Sulphur',
        potency: '6CH',
        specificIndication: 'Chronic ear irritation',
        expectedResult: 'Soothing relief'
      },
      {
        name: 'Mercurius solubilis',
        potency: '6CH',
        specificIndication: 'Thick discharge from cold',
        expectedResult: 'Stops blockage'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea sulphurica', potency: '6X' }
    ],
    bioCombination: 'BC No. 5',
    baholaSpecialty: 'Earsol'
  },
  {
    subConditionName: 'Recurrent Cold & Throat Infection',
    remedies: [
      {
        name: 'Allium cepa',
        potency: '6CH',
        specificIndication: 'Watery discharge, sneezing',
        expectedResult: 'Reduced frequency'
      },
      {
        name: 'Ferrum phosphoricum',
        potency: '6X',
        specificIndication: 'Initial cold stage',
        expectedResult: 'Stops escalation'
      },
      {
        name: 'Gelsemium',
        potency: '6CH',
        specificIndication: 'Dullness and muscle ache',
        expectedResult: 'Rested feeling'
      },
      {
        name: 'Natrum muriaticum',
        potency: '6X',
        specificIndication: 'Morning sneezing, congestion',
        expectedResult: 'Freer breathing'
      },
      {
        name: 'Hepar sulphur',
        potency: '6CH',
        specificIndication: 'Cold from exposure',
        expectedResult: 'Faster recovery'
      }
    ],
    biochemicRemedies: [
      { name: 'Calcarea phosphorica', potency: '6X' }
    ],
    bioCombination: 'BC No. 6 – Colds & Catarrh',
    baholaSpecialty: 'Rhinicare / Tonsinil'
  }
];
