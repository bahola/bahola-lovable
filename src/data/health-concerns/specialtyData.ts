import { HealthConcern } from './types';

export const specialtyData: HealthConcern[] = [
  // Pain Care
  {
    id: 'headaches-migraines',
    name: 'Headaches & Migraines',
    description: 'Natural relief from headaches, migraines, and tension-related head pain using targeted homeopathic remedies.',
    category: 'Pain Care',
    icon: '🤕',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 51000,
    commonRemedies: ['Belladonna', 'Bryonia', 'Nux Vomica', 'Spigelia'],
    keywords: ['headaches', 'migraines', 'tension headaches', 'head pain', 'cluster headaches'],
    lastUpdated: '2024-01-15',
    trending: true
  },
  {
    id: 'joint-pain-arthritis',
    name: 'Joint Pain & Arthritis',
    description: 'Comprehensive homeopathic treatment for arthritis, joint pain, stiffness, and mobility issues.',
    category: 'Pain Care',
    icon: '🦴',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 46000,
    commonRemedies: ['Rhus Toxicodendron', 'Bryonia', 'Arnica', 'Ruta Graveolens'],
    keywords: ['joint pain', 'arthritis', 'stiffness', 'rheumatism', 'mobility', 'inflammation'],
    lastUpdated: '2024-01-12'
  },

  // Muscle & Joint Care
  {
    id: 'muscle-pain',
    name: 'Muscle Pain',
    description: 'Natural remedies for muscle pain, strains, cramps, and sports injuries.',
    category: 'Muscle & Joint Care',
    icon: '💪',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 39000,
    commonRemedies: ['Arnica', 'Rhus Toxicodendron', 'Ruta Graveolens', 'Magnesia Phosphorica'],
    keywords: ['muscle pain', 'muscle cramps', 'sports injuries', 'muscle strain', 'exercise recovery'],
    lastUpdated: '2024-01-10'
  },

  // Skin Care
  {
    id: 'skin-conditions',
    name: 'Skin Conditions',
    description: 'Holistic treatment for various skin conditions including eczema, psoriasis, acne, and dermatitis.',
    category: 'Skin Care',
    icon: '🧴',
    image: '/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png',
    searchVolume: 49000,
    commonRemedies: ['Sulphur', 'Graphites', 'Arsenicum Album', 'Hepar Sulphuris'],
    keywords: ['skin conditions', 'eczema', 'psoriasis', 'acne', 'dermatitis', 'skin health'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'acne-pimples',
    name: 'Acne & Pimples',
    description: 'Natural homeopathic treatment for acne, pimples, and teenage skin problems.',
    category: 'Skin Care',
    icon: '😔',
    image: '/lovable-uploads/ee08c806-593a-4759-b27e-d41be5af04a8.png',
    searchVolume: 42000,
    commonRemedies: ['Hepar Sulphuris', 'Kali Bromatum', 'Antimonium Crudum', 'Sulphur'],
    keywords: ['acne', 'pimples', 'teenage skin', 'skin eruptions', 'facial acne'],
    lastUpdated: '2024-01-12'
  },

  // Eye Care
  {
    id: 'eye-problems',
    name: 'Eye Problems',
    description: 'Gentle homeopathic care for various eye conditions, vision problems, and eye strain.',
    category: 'Eye Care',
    icon: '👁️',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 34000,
    commonRemedies: ['Euphrasia', 'Ruta Graveolens', 'Conium', 'Phosphorus'],
    keywords: ['eye problems', 'vision problems', 'eye strain', 'conjunctivitis', 'dry eyes'],
    lastUpdated: '2024-01-10'
  },

  // Ear Nose Throat
  {
    id: 'ear-sinus-infections',
    name: 'Ear & Sinus Infections',
    description: 'Natural relief for ear and sinus infections, reducing pain and inflammation while supporting natural healing.',
    category: 'Ear Nose Throat',
    icon: '👂',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 37000,
    commonRemedies: ['Belladonna', 'Hepar Sulph', 'Pulsatilla', 'Mercurius'],
    keywords: ['ear infections', 'sinus infections', 'otitis media', 'sinusitis', 'ear pain'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sore-throat',
    name: 'Sore Throat',
    description: 'Effective homeopathic remedies for sore throat, tonsillitis, and throat infections.',
    category: 'Ear Nose Throat',
    icon: '🤒',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 43000,
    commonRemedies: ['Belladonna', 'Mercurius', 'Hepar Sulphuris', 'Lachesis'],
    keywords: ['sore throat', 'throat pain', 'tonsillitis', 'throat infection', 'laryngitis'],
    lastUpdated: '2024-01-12'
  },

  // Urinary care
  {
    id: 'urinary-tract-infections',
    name: 'Urinary Tract Infections',
    description: 'Natural UTI treatment and prevention with effective homeopathic remedies for urinary health.',
    category: 'Urinary care',
    icon: '🚿',
    image: '/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png',
    searchVolume: 36000,
    commonRemedies: ['Cantharis', 'Apis Mellifica', 'Berberis', 'Equisetum'],
    keywords: ['UTI', 'urinary tract infection', 'bladder infection', 'burning urination', 'cystitis'],
    lastUpdated: '2024-01-10'
  },

  // Weight Management
  {
    id: 'weight-management',
    name: 'Weight Management',
    description: 'Natural support for healthy weight management, metabolism, and appetite control.',
    category: 'Lifestyle',
    icon: '⚖️',
    image: '/lovable-uploads/ee08c806-593a-4759-b27e-d41be5af04a8.png',
    searchVolume: 45000,
    commonRemedies: ['Calcarea Carbonica', 'Phytolacca', 'Fucus Vesiculosus', 'Graphites'],
    keywords: ['weight management', 'weight loss', 'metabolism', 'appetite control', 'obesity'],
    lastUpdated: '2024-01-15'
  },

  // Diabetes Support
  {
    id: 'diabetes-support',
    name: 'Diabetes Support',
    description: 'Complementary homeopathic support for diabetes management and blood sugar regulation.',
    category: 'Lifestyle',
    icon: '🩸',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 33000,
    commonRemedies: ['Syzygium Jambolanum', 'Uranium Nitricum', 'Phosphoric Acid', 'Cephalandra Indica'],
    keywords: ['diabetes', 'blood sugar', 'glucose control', 'diabetic support', 'insulin resistance'],
    lastUpdated: '2024-01-12'
  },

  // Infection category concerns
  {
    id: 'bacterial-infections',
    name: 'Bacterial Infections',
    description: 'Natural treatment for bacterial infections by strengthening the body\'s natural defense mechanisms.',
    category: 'Infection',
    icon: '🦠',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 31000,
    commonRemedies: ['Hepar Sulph', 'Silicea', 'Mercurius', 'Arsenicum Album'],
    keywords: ['bacterial infections', 'boils', 'abscesses', 'infected wounds', 'cellulitis'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'viral-infections',
    name: 'Viral Infections',
    description: 'Comprehensive support for various viral infections by boosting immunity and natural healing.',
    category: 'Infection',
    icon: '🦠',
    image: '/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png',
    searchVolume: 29000,
    commonRemedies: ['Oscillococcinum', 'Thuja', 'Rhus Tox', 'Natrum Muriaticum'],
    keywords: ['viral infections', 'flu', 'warts', 'cold sores', 'herpes', 'viral fever'],
    lastUpdated: '2024-01-12'
  },
  {
    id: 'fungal-infections',
    name: 'Fungal Infections',
    description: 'Gentle yet effective treatment for fungal infections by addressing underlying susceptibility.',
    category: 'Infection',
    icon: '🦠',
    image: '/lovable-uploads/e10be5fd-868f-4ce3-8e97-f9c2aac6e207.png',
    searchVolume: 27000,
    commonRemedies: ['Sepia', 'Borax', 'Graphites', 'Sulphur'],
    keywords: ['fungal infections', 'ringworm', 'candidiasis', 'athlete\'s foot', 'nail fungus'],
    lastUpdated: '2024-01-10'
  },
  {
    id: 'skin-infections',
    name: 'Skin Infections',
    description: 'Holistic treatment for skin infections, addressing both infection and underlying susceptibility.',
    category: 'Infection',
    icon: '🦠',
    image: '/lovable-uploads/ee08c806-593a-4759-b27e-d41be5af04a8.png',
    searchVolume: 25000,
    commonRemedies: ['Hepar Sulph', 'Graphites', 'Arsenicum Album', 'Mercurius'],
    keywords: ['skin infections', 'infected eczema', 'infected wounds', 'cellulitis', 'pustular conditions'],
    lastUpdated: '2024-01-08'
  },
  {
    id: 'recurrent-fevers',
    name: 'Recurrent Fevers',
    description: 'Address underlying causes of recurrent fevers and strengthen immune system response.',
    category: 'Infection',
    icon: '🌡️',
    image: '/lovable-uploads/0108ad38-606a-475c-a72b-c841b9ba5dae.png',
    searchVolume: 23000,
    commonRemedies: ['China', 'Arsenicum Album', 'Sulphur', 'Phosphorus'],
    keywords: ['recurrent fevers', 'periodic fever', 'fever patterns', 'chronic fever'],
    lastUpdated: '2024-01-06'
  },
  {
    id: 'fever-with-chills',
    name: 'Fever with Chills',
    description: 'Natural treatment for fever with chills by addressing underlying causes and supporting healing.',
    category: 'Infection',
    icon: '🥶',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 21000,
    commonRemedies: ['Aconitum', 'Belladonna', 'Bryonia', 'Gelsemium'],
    keywords: ['fever with chills', 'shivering', 'alternating fever', 'acute fever', 'viral fever'],
    lastUpdated: '2024-01-04'
  },

  // Tooth Care
  {
    id: 'dental-problems',
    name: 'Dental Problems',
    description: 'Natural homeopathic support for dental issues, tooth pain, and oral health.',
    category: 'Tooth Care',
    icon: '🦷',
    image: '/lovable-uploads/730d1598-271f-4c89-b882-c14cbc238a19.png',
    searchVolume: 28000,
    commonRemedies: ['Mercurius', 'Hepar Sulphuris', 'Chamomilla', 'Plantago'],
    keywords: ['dental problems', 'tooth pain', 'gum problems', 'oral health', 'toothache'],
    lastUpdated: '2024-01-08'
  }
];
