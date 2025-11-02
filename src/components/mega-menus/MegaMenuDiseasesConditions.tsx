import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets, Book
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Utility function for concern icons
const getConcernIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Allergies': <Bug size={20} />,
    'Cancer': <Pill size={20} />,
    'Heart Health': <Heart size={20} />,
    'Child Care': <Baby size={20} />,
    'Ear Nose Throat': <Ear size={20} />,
    'Eye Care': <Eye size={20} />,
    'Gut Health': <Wheat size={20} />,
    'Womens Care': <BadgePlus size={20} />,
    'Hair Care': <Flower size={20} />,
    'Immune boosters': <BadgePlus size={20} />,
    'Infection': <BugPlay size={20} />,
    'Lifestyle': <BadgePlus size={20} />,
    'Muscle & Joint Care': <Dumbbell size={20} />,
    'Mental health': <Brain size={20} />,
    'Nutritive': <Apple size={20} />,
    'Pain Care': <Pill size={20} />,
    'Reproductive care': <BadgePlus size={20} />,
    'Respiratory Care': <Wind size={20} />,
    'Skin Care': <Banana size={20} />,
    'Tooth Care': <Smile size={20} />,
    'Urinary care': <Droplets size={20} />
  };
  
  return iconMap[name] || <Pill size={20} />;
};

export const MegaMenuDiseasesConditions: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const conditions = [
    { name: 'Allergies', route: '/diseases-conditions/allergies' },
    { name: 'Cancer', route: '/diseases-conditions/cancer-support' },
    { name: 'Heart Health', route: '/diseases-conditions/heart-health' },
    { name: 'Child Care', route: '/diseases-conditions/child-care' },
    { name: 'Ear Nose Throat', route: '/diseases-conditions/ent-care' },
    { name: 'Eye Care', route: '/diseases-conditions/eye-care' },
    { name: 'Gut Health', route: '/diseases-conditions/gut-health' },
    { name: 'Womens Care', route: '/diseases-conditions/womens-health' },
    { name: 'Hair Care', route: '/diseases-conditions/hair-care' },
    { name: 'Immune boosters', route: '/diseases-conditions/immune-boosters' },
    { name: 'Infection', route: '/diseases-conditions/infection-care' },
    { name: 'Lifestyle', route: '/diseases-conditions/lifestyle-care' },
    { name: 'Muscle & Joint Care', route: '/diseases-conditions/muscle-care' },
    { name: 'Mental health', route: '/diseases-conditions/mental-health' },
    { name: 'Nutritive', route: '/diseases-conditions/nutritive-care' },
    { name: 'Pain Care', route: '/diseases-conditions/pain-care' },
    { name: 'Reproductive care', route: '/diseases-conditions/reproductive-care' },
    { name: 'Respiratory Care', route: '/diseases-conditions/respiratory-care' },
    { name: 'Skin Care', route: '/diseases-conditions/skin-care' },
    { name: 'Tooth Care', route: '/diseases-conditions/tooth-care' },
    { name: 'Urinary care', route: '/diseases-conditions/urology-care' }
  ];

  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Book size={24} className="text-blue-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-blue-800">Explore Health Conditions</h3>
              <p className="text-sm text-blue-600">Discover causes, symptoms, and natural treatment approaches</p>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {conditions.map((condition) => (
              <a 
                key={condition.name}
                href={condition.route}
                className="flex items-center p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-800 hover:text-blue-900 border border-blue-200 hover:border-blue-300"
              >
                <div className="mr-2 text-blue-600 flex-shrink-0">
                  {getConcernIcon(condition.name)}
                </div>
                <span className="text-xs font-medium">
                  {condition.name}
                </span>
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-blue-100">
            <a 
              href="/diseases-conditions" 
              className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900"
            >
              View All Conditions →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuDiseasesConditions;
