
import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets
} from 'lucide-react';
import { healthConcernsData } from '@/data/healthConcernsData';

interface MegaMenuProps {
  isOpen: boolean;
}

// Utility function for concern icons
const getConcernIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Anxiety & Stress': <Brain size={24} />,
    'Insomnia & Sleep Disorders': <Pill size={24} />,
    'Digestive Issues': <Wheat size={24} />,
    'Allergies & Hay Fever': <Bug size={24} />,
    'Headaches & Migraines': <Pill size={24} />,
    'Skin Conditions': <Banana size={24} />,
    'Cold & Flu': <Heart size={24} />,
    'Joint Pain & Arthritis': <Dumbbell size={24} />,
    'Women\'s Health': <BadgePlus size={24} />,
    'Children\'s Health': <Baby size={24} />,
    'Depression & Mood Disorders': <Brain size={24} />,
    'Weight Management': <Apple size={24} />,
    'Eye Problems': <Eye size={24} />,
    'High Blood Pressure': <Heart size={24} />,
    'Diabetes Support': <Pill size={24} />
  };
  
  return iconMap[name] || <Pill size={24} />;
};

// Shop by Concern Mega Menu
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg border-t-4 border-blue-500">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Shop by Health Concern</h2>
        <div className="grid grid-cols-3 gap-4 max-w-6xl">
          {healthConcernsData.map((concern) => (
            <a 
              key={concern.id} 
              href={`/concern/${concern.id}`}
              className="flex items-center p-3 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-gray-700 hover:text-blue-600 min-w-0 bg-white/70 hover:bg-blue-100 shadow-sm"
            >
              <div className="mr-3 text-blue-500 flex-shrink-0">
                {getConcernIcon(concern.name)}
              </div>
              <span className="text-sm font-medium truncate">
                {concern.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
