export interface HealthConcern {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  image: string;
  searchVolume: number;
  commonRemedies: string[];
  keywords: string[];
  lastUpdated: string;
  trending?: boolean;
}

export const healthConcernsData: HealthConcern[] = [
  // Allergies - Updated with all sub-conditions
  {
    id: 'seasonal-allergies',
    name: 'Seasonal Allergies (Hay Fever)',
    description: 'Natural relief for seasonal allergies and hay fever symptoms.',
    category: 'allergies',
    icon: '🌸',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 35000,
    commonRemedies: ['Allium Cepa', 'Sabadilla', 'Natrum Muriaticum', 'Euphrasia'],
    keywords: ['seasonal allergies', 'hay fever', 'pollen', 'runny nose', 'sneezing'],
    lastUpdated: '2024-01-08',
    trending: true,
  },
  {
    id: 'dust-allergy',
    name: 'Dust Allergy',
    description: 'Homeopathic treatment for dust mite and dust allergies.',
    category: 'allergies',
    icon: '🌪️',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 28000,
    commonRemedies: ['Arsenicum Album', 'Natrum Sulph', 'Sulphur'],
    keywords: ['dust allergy', 'dust mites', 'sneezing', 'nasal congestion'],
    lastUpdated: '2024-01-08',
  },
  {
    id: 'food-allergies',
    name: 'Food Allergies (Milk, Gluten, Nuts)',
    description: 'Natural support for various food allergies and intolerances.',
    category: 'allergies',
    icon: '🥛',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 32000,
    commonRemedies: ['Natrum Muriaticum', 'Lycopodium', 'Carbo Vegetabilis'],
    keywords: ['food allergies', 'milk allergy', 'gluten', 'nut allergies'],
    lastUpdated: '2024-01-08',
  },
  {
    id: 'drug-allergies',
    name: 'Drug Allergies',
    description: 'Homeopathic approach to managing drug allergy reactions and sensitivities.',
    category: 'allergies',
    icon: '💊',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 18000,
    commonRemedies: ['Apis Mellifica', 'Urtica Urens', 'Sulphur'],
    keywords: ['drug allergies', 'medication allergy', 'pharmaceutical sensitivity'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'skin-allergies',
    name: 'Skin Allergies (Hives, Eczema, Urticaria)',
    description: 'Natural treatment for skin allergic reactions including hives and urticaria.',
    category: 'allergies',
    icon: '🔴',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 30000,
    commonRemedies: ['Apis Mellifica', 'Urtica Urens', 'Graphites', 'Sulphur'],
    keywords: ['skin allergies', 'hives', 'urticaria', 'eczema', 'skin rash'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'allergic-rhinitis',
    name: 'Allergic Rhinitis',
    description: 'Comprehensive treatment for allergic rhinitis and nasal congestion.',
    category: 'allergies',
    icon: '👃',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 25000,
    commonRemedies: ['Allium Cepa', 'Arsenicum Album', 'Euphrasia'],
    keywords: ['allergic rhinitis', 'nasal allergy', 'runny nose', 'congestion'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'pet-dander-allergy',
    name: 'Pet Dander Allergy',
    description: 'Natural relief from pet dander and animal hair allergies.',
    category: 'allergies',
    icon: '🐕',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 22000,
    commonRemedies: ['Arsenicum Album', 'Histaminum', 'Natrum Muriaticum'],
    keywords: ['pet allergy', 'dander allergy', 'animal hair allergy', 'cat allergy', 'dog allergy'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'mold-allergy',
    name: 'Mold Allergy',
    description: 'Homeopathic treatment for mold and fungal allergies.',
    category: 'allergies',
    icon: '🍄',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 15000,
    commonRemedies: ['Arsenicum Album', 'Sulphur', 'Thuja'],
    keywords: ['mold allergy', 'fungal allergy', 'dampness allergy'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'latex-allergy',
    name: 'Latex Allergy',
    description: 'Natural approach to latex sensitivity and allergic reactions.',
    category: 'allergies',
    icon: '🧤',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 12000,
    commonRemedies: ['Apis Mellifica', 'Urtica Urens', 'Rhus Toxicodendron'],
    keywords: ['latex allergy', 'rubber allergy', 'contact allergy'],
    lastUpdated: '2024-01-15',
  },
  {
    id: 'sinus-allergy',
    name: 'Sinus Allergy',
    description: 'Comprehensive care for sinus allergies and chronic sinusitis.',
    category: 'allergies',
    icon: '😤',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=300&fit=crop',
    searchVolume: 28000,
    commonRemedies: ['Kali Bichromicum', 'Silicea', 'Pulsatilla'],
    keywords: ['sinus allergy', 'chronic sinusitis', 'sinus congestion'],
    lastUpdated: '2024-01-15',
  },

  // Cancer Support
  {
    id: 'chemotherapy-side-effects',
    name: 'Chemotherapy Side Effects',
    description: 'Supportive care for nausea, fatigue and other side effects.',
    category: 'cancer',
    icon: '💊',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    searchVolume: 15000,
    commonRemedies: ['Ipecacuanha', 'Arsenicum Album', 'Nux Vomica'],
    keywords: ['chemotherapy', 'nausea', 'fatigue', 'side effects'],
    lastUpdated: '2024-01-10',
  },

  // Heart Health
  {
    id: 'high-blood-pressure',
    name: 'High Blood Pressure (Hypertension)',
    description: 'Natural support for managing blood pressure and cardiovascular health.',
    category: 'heart-health',
    icon: '❤️',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    searchVolume: 32000,
    commonRemedies: ['Crataegus', 'Viscum Album', 'Baryta Carbonica', 'Natrum Muriaticum'],
    keywords: ['high blood pressure', 'hypertension', 'cardiovascular health'],
    lastUpdated: '2024-01-02',
    trending: true,
  },
  {
    id: 'palpitations',
    name: 'Palpitations',
    description: 'Natural remedies for heart palpitations and irregular heartbeat.',
    category: 'heart-health',
    icon: '💓',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    searchVolume: 18000,
    commonRemedies: ['Digitalis', 'Cactus', 'Spigelia'],
    keywords: ['palpitations', 'irregular heartbeat', 'heart rhythm'],
    lastUpdated: '2024-01-02',
  },

  // Child Care
  {
    id: 'teething-troubles',
    name: 'Teething Troubles',
    description: 'Gentle relief for teething pain and discomfort in babies.',
    category: 'child-care',
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 22000,
    commonRemedies: ['Chamomilla', 'Calcarea Carbonica', 'Belladonna'],
    keywords: ['teething', 'baby teeth', 'infant pain', 'tooth pain'],
    lastUpdated: '2024-01-06',
  },
  {
    id: 'colic',
    name: 'Colic',
    description: 'Natural remedies for infant colic and digestive discomfort.',
    category: 'child-care',
    icon: '👶',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 20000,
    commonRemedies: ['Chamomilla', 'Colocynthis', 'Lycopodium'],
    keywords: ['colic', 'infant colic', 'baby digestive issues'],
    lastUpdated: '2024-01-06',
  },

  // ENT
  {
    id: 'earache',
    name: 'Earache / Otitis Media',
    description: 'Natural treatment for ear pain and ear infections.',
    category: 'ent',
    icon: '👂',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 25000,
    commonRemedies: ['Belladonna', 'Pulsatilla', 'Hepar Sulph'],
    keywords: ['earache', 'ear infection', 'otitis media'],
    lastUpdated: '2024-01-12',
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    description: 'Relief from sinus congestion and inflammation.',
    category: 'ent',
    icon: '👃',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 30000,
    commonRemedies: ['Kali Bichromicum', 'Silicea', 'Pulsatilla'],
    keywords: ['sinusitis', 'sinus infection', 'nasal congestion'],
    lastUpdated: '2024-01-12',
  },

  // Eye Care
  {
    id: 'eye-strain',
    name: 'Eye Strain / Digital Eye Fatigue',
    description: 'Relief from digital eye strain and computer vision syndrome.',
    category: 'eye-care',
    icon: '👁️',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    searchVolume: 18000,
    commonRemedies: ['Ruta Graveolens', 'Euphrasia', 'Natrum Muriaticum'],
    keywords: ['eye strain', 'digital fatigue', 'computer vision'],
    lastUpdated: '2024-01-03',
  },
  {
    id: 'dry-eyes',
    name: 'Dry Eyes',
    description: 'Natural treatment for dry eye syndrome and tear deficiency.',
    category: 'eye-care',
    icon: '👁️',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    searchVolume: 16000,
    commonRemedies: ['Alumina', 'Belladonna', 'Zincum'],
    keywords: ['dry eyes', 'tear deficiency', 'eye dryness'],
    lastUpdated: '2024-01-03',
  },

  // Gut Health
  {
    id: 'acidity-gerd',
    name: 'Acidity / GERD',
    description: 'Natural relief from acid reflux and gastroesophageal reflux disease.',
    category: 'gut-health',
    icon: '🔥',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 42000,
    commonRemedies: ['Nux Vomica', 'Robinia', 'Natrum Phosphoricum'],
    keywords: ['acidity', 'GERD', 'acid reflux', 'heartburn'],
    lastUpdated: '2024-01-10',
    trending: true,
  },
  {
    id: 'constipation',
    name: 'Constipation',
    description: 'Gentle remedies for chronic constipation and irregular bowel movements.',
    category: 'gut-health',
    icon: '🍃',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 38000,
    commonRemedies: ['Nux Vomica', 'Bryonia', 'Alumina'],
    keywords: ['constipation', 'irregular bowel', 'digestive issues'],
    lastUpdated: '2024-01-10',
  },
  {
    id: 'ibs',
    name: 'IBS (Irritable Bowel Syndrome)',
    description: 'Comprehensive care for IBS symptoms including bloating and cramping.',
    category: 'gut-health',
    icon: '🍽️',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 35000,
    commonRemedies: ['Lycopodium', 'Colocynthis', 'Carbo Vegetabilis'],
    keywords: ['IBS', 'irritable bowel', 'bloating', 'cramping'],
    lastUpdated: '2024-01-10',
  },

  // Mental Health
  {
    id: 'anxiety-stress',
    name: 'Anxiety & Stress',
    description: 'Natural remedies for managing anxiety, stress, and nervous tension.',
    category: 'mental-health',
    icon: '🧠',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
    searchVolume: 45000,
    commonRemedies: ['Ignatia', 'Arsenicum Album', 'Aconite', 'Gelsemium'],
    keywords: ['anxiety', 'stress', 'panic attacks', 'nervous tension', 'worry'],
    lastUpdated: '2024-01-15',
    trending: true,
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'Gentle support for depression and mood disorders.',
    category: 'mental-health',
    icon: '💙',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
    searchVolume: 30000,
    commonRemedies: ['Aurum Metallicum', 'Ignatia', 'Natrum Muriaticum'],
    keywords: ['depression', 'mood disorders', 'sadness'],
    lastUpdated: '2024-01-05',
  },
  {
    id: 'insomnia-sleep-disorders',
    name: 'Sleep Disorders (Insomnia)',
    description: 'Gentle solutions for sleep problems including insomnia and restless sleep.',
    category: 'mental-health',
    icon: '😴',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
    searchVolume: 38000,
    commonRemedies: ['Coffea Cruda', 'Nux Vomica', 'Passiflora', 'Chamomilla'],
    keywords: ['insomnia', 'sleep problems', 'restless sleep', 'nightmares'],
    lastUpdated: '2024-01-12',
  },

  // Women's Care
  {
    id: 'irregular-periods',
    name: 'Irregular Periods (Menstrual Irregularities)',
    description: 'Natural support for menstrual cycle irregularities.',
    category: 'womens-care',
    icon: '🌺',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
    searchVolume: 25000,
    commonRemedies: ['Sepia', 'Pulsatilla', 'Calcarea Carbonica'],
    keywords: ['irregular periods', 'menstrual cycle', 'hormones'],
    lastUpdated: '2024-01-07',
  },
  {
    id: 'pcos-pcod',
    name: 'PCOS/PCOD',
    description: 'Supportive care for polycystic ovary syndrome.',
    category: 'womens-care',
    icon: '🌺',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
    searchVolume: 28000,
    commonRemedies: ['Sepia', 'Calcarea Carbonica', 'Thuja'],
    keywords: ['PCOS', 'PCOD', 'ovarian cysts', 'hormonal imbalance'],
    lastUpdated: '2024-01-07',
  },

  // Pain Care
  {
    id: 'headaches-migraines',
    name: 'Headaches & Migraines',
    description: 'Effective treatment for various types of headaches including migraines.',
    category: 'pain-care',
    icon: '🤕',
    image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
    searchVolume: 40000,
    commonRemedies: ['Belladonna', 'Bryonia', 'Iris Versicolor', 'Spigelia'],
    keywords: ['headache', 'migraine', 'tension headache', 'head pain'],
    lastUpdated: '2024-01-14',
  },
  {
    id: 'joint-pain-arthritis',
    name: 'Joint Pain & Arthritis',
    description: 'Relief from joint pain, arthritis, and inflammatory conditions.',
    category: 'pain-care',
    icon: '🦴',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop',
    searchVolume: 28000,
    commonRemedies: ['Rhus Toxicodendron', 'Bryonia', 'Arnica', 'Calcarea Carbonica'],
    keywords: ['joint pain', 'arthritis', 'rheumatism', 'stiffness'],
    lastUpdated: '2024-01-09',
  },

  // Skin Care
  {
    id: 'acne-pimples',
    name: 'Acne / Pimples',
    description: 'Natural treatment for acne, pimples, and oily skin.',
    category: 'skin-care',
    icon: '🧴',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    searchVolume: 33000,
    commonRemedies: ['Sulphur', 'Hepar Sulph', 'Kali Bromatum'],
    keywords: ['acne', 'pimples', 'oily skin', 'blackheads'],
    lastUpdated: '2024-01-11',
  },
  {
    id: 'eczema-dermatitis',
    name: 'Eczema / Dermatitis',
    description: 'Gentle treatment for eczema and various forms of dermatitis.',
    category: 'skin-care',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop',
    searchVolume: 30000,
    commonRemedies: ['Graphites', 'Sulphur', 'Arsenicum Album'],
    keywords: ['eczema', 'dermatitis', 'skin rash', 'itching'],
    lastUpdated: '2024-01-11',
  },

  // Respiratory Care
  {
    id: 'asthma',
    name: 'Asthma',
    description: 'Natural support for asthma and breathing difficulties.',
    category: 'respiratory-care',
    icon: '🫁',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    searchVolume: 35000,
    commonRemedies: ['Arsenicum Album', 'Ipecacuanha', 'Natrum Sulph'],
    keywords: ['asthma', 'breathing difficulty', 'wheezing'],
    lastUpdated: '2024-01-13',
  },
  {
    id: 'chronic-bronchitis',
    name: 'Chronic Bronchitis',
    description: 'Treatment for chronic bronchitis and persistent cough.',
    category: 'respiratory-care',
    icon: '🫁',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
    searchVolume: 22000,
    commonRemedies: ['Hepar Sulph', 'Spongia', 'Drosera'],
    keywords: ['chronic bronchitis', 'persistent cough', 'chest congestion'],
    lastUpdated: '2024-01-13',
  },
];

export const categoryInfo = {
  'allergies': {
    name: '🧬 Allergies',
    description: 'Natural allergy relief and immune system support'
  },
  'cancer': {
    name: '🎗️ Cancer Support',
    description: 'Supportive care focus only, compliant with regulations'
  },
  'heart-health': {
    name: '❤️ Heart Health',
    description: 'Cardiovascular health and circulation support'
  },
  'child-care': {
    name: '👶 Child Care',
    description: 'Safe and gentle remedies for children'
  },
  'ent': {
    name: '👂👃👄 Ear, Nose, Throat (ENT)',
    description: 'Natural treatment for ENT conditions'
  },
  'eye-care': {
    name: '👁️ Eye Care',
    description: 'Gentle care for eye health and vision support'
  },
  'gut-health': {
    name: '🍽️ Gut Health',
    description: 'Digestive health and gastrointestinal wellness'
  },
  'womens-care': {
    name: '👩 Women\'s Care',
    description: 'Specialized care for women\'s health concerns'
  },
  'hair-care': {
    name: '💇 Hair Care',
    description: 'Natural solutions for hair and scalp health'
  },
  'immune-boosters': {
    name: '🛡️ Immune Boosters',
    description: 'Strengthen immunity and overall wellness'
  },
  'infection': {
    name: '🦠 Infection',
    description: 'Natural support for various infections'
  },
  'lifestyle': {
    name: '🌿 Lifestyle',
    description: 'Holistic wellness and lifestyle support'
  },
  'muscle-joint-care': {
    name: '💪 Muscle & Joint Care',
    description: 'Mobility and musculoskeletal health'
  },
  'mental-health': {
    name: '🧠 Mental Health',
    description: 'Emotional wellness and mental health support'
  },
  'nutritive': {
    name: '🥗 Nutritive',
    description: 'Nutritional support and general wellness'
  },
  'pain-care': {
    name: '⚡ Pain Care',
    description: 'Natural pain relief and management'
  },
  'reproductive-care': {
    name: '🧬 Reproductive Care',
    description: 'Reproductive health and fertility support'
  },
  'respiratory-care': {
    name: '🌬️ Respiratory Care',
    description: 'Breathing and respiratory system health'
  },
  'skin-care': {
    name: '🧴 Skin Care',
    description: 'Natural skincare and dermatological health'
  },
  'tooth-care': {
    name: '🦷 Tooth Care',
    description: 'Dental health and oral care'
  },
  'urinary-care': {
    name: '💧 Urinary Care',
    description: 'Urinary system and kidney health'
  }
};
