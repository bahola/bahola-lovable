import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets, X
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
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

// Shop by Concern Mega Menu - Mayo Clinic inspired design
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const concernCategories = [
    {
      title: "Common Health Issues",
      concerns: [
        { name: 'Allergies', route: '/category/allergies' },
        { name: 'Heart Health', route: '/category/heart-health' },
        { name: 'Gut Health', route: '/category/gut-health' },
        { name: 'Pain Care', route: '/category/pain-care' },
        { name: 'Respiratory Care', route: '/category/respiratory-care' },
        { name: 'Mental health', route: '/category/mental-health' },
        { name: 'Skin Care', route: '/category/skin-care' }
      ]
    },
    {
      title: "Specialized Care",
      concerns: [
        { name: 'Cancer', route: '/category/cancer-support' },
        { name: 'Child Care', route: '/category/child-care' },
        { name: 'Womens Care', route: '/category/womens-health' },
        { name: 'Reproductive care', route: '/category/reproductive-care' },
        { name: 'Eye Care', route: '/category/eye-care' },
        { name: 'Ear Nose Throat', route: '/category/ent-care' },
        { name: 'Urinary care', route: '/category/urology-care' }
      ]
    },
    {
      title: "Wellness & Prevention",
      concerns: [
        { name: 'Immune boosters', route: '/category/immune-boosters' },
        { name: 'Nutritive', route: '/category/nutritive-care' },
        { name: 'Lifestyle', route: '/category/lifestyle-care' },
        { name: 'Hair Care', route: '/category/hair-care' },
        { name: 'Tooth Care', route: '/category/tooth-care' },
        { name: 'Muscle & Joint Care', route: '/category/muscle-care' },
        { name: 'Infection', route: '/category/infection-care' }
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="mega-menu mega-menu-full mega-menu-open">
      <div className="mega-menu-content">
        {/* Header with close button */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Health Concerns & Natural Solutions</h2>
            <p className="text-blue-100 text-sm mt-1">Find remedies tailored to your specific health needs</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-blue-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {concernCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {category.title}
                </h3>
                <div className="space-y-2">
                  {category.concerns.map((concern) => (
                    <Link 
                      key={concern.name} 
                      to={concern.route}
                      onClick={onClose}
                      className="flex items-center p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-gray-700 hover:text-blue-700 group"
                    >
                      <div className="mr-3 text-blue-600 group-hover:text-blue-700 flex-shrink-0">
                        {getConcernIcon(concern.name)}
                      </div>
                      <span className="text-sm font-medium">
                        {concern.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer CTA */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <Link 
              to="/health-concerns" 
              onClick={onClose}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View All Health Concerns
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuConcern;
