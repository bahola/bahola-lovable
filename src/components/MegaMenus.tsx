
import React from 'react';
import { 
  Bug, Heart, Baby, Ear, Eye, Wheat, 
  BadgePlus, Flower, BugPlay, Dumbbell, 
  Brain, Apple, Pill, Stethoscope, Wind, 
  Banana, Smile, Droplets
} from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Utility function for concern icons
const getConcernIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'Allergies': <Bug size={24} />,
    'Cancer': <Pill size={24} />,
    'Heart Health': <Heart size={24} />,
    'Child Care': <Baby size={24} />,
    'Ear Nose Throat': <Ear size={24} />,
    'Eye Care': <Eye size={24} />,
    'Gut Health': <Wheat size={24} />,
    'Womens Care': <BadgePlus size={24} />,
    'Hair Care': <Flower size={24} />,
    'Immune boosters': <BadgePlus size={24} />,
    'Infection': <BugPlay size={24} />,
    'Lifestyle': <BadgePlus size={24} />,
    'Muscle & Joint Care': <Dumbbell size={24} />,
    'Mental health': <Brain size={24} />,
    'Nutritive': <Apple size={24} />,
    'Pain Care': <Pill size={24} />,
    'Reproductive care': <BadgePlus size={24} />,
    'Respiratory Care': <Wind size={24} />,
    'Skin Care': <Banana size={24} />,
    'Tooth Care': <Smile size={24} />,
    'Urinary care': <Droplets size={24} />
  };
  
  return iconMap[name] || <Pill size={24} />;
};

// Shop by Concern Mega Menu
export const MegaMenuConcern: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const concerns = [
    'Allergies', 'Cancer', 'Heart Health', 'Child Care', 
    'Ear Nose Throat', 'Eye Care', 'Gut Health', 'Womens Care',
    'Hair Care', 'Immune boosters', 'Infection', 'Lifestyle',
    'Muscle & Joint Care', 'Mental health', 'Nutritive', 'Pain Care',
    'Reproductive care', 'Respiratory Care', 'Skin Care', 'Tooth Care',
    'Urinary care'
  ];

  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-8">
        <h2 className="text-xl font-bold mb-6 text-bahola-neutral-800">Shop by Health Concern</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {concerns.map((concern) => (
            <a 
              key={concern} 
              href={`/concern/${concern.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center p-3 hover:bg-bahola-blue-50 rounded-lg transition-colors duration-200"
            >
              <div className="mr-3 text-bahola-blue-500">
                {getConcernIcon(concern)}
              </div>
              <span className="text-bahola-neutral-700 hover:text-bahola-blue-600">{concern}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

// Shop by Category Mega Menu
export const MegaMenuCategory: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <a href="/category/mother-tinctures" className="block text-lg font-semibold mb-4 text-bahola-blue-600 hover:text-bahola-blue-800">
              Mother tinctures
            </a>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {alphabet.map((letter) => (
                <a 
                  key={letter} 
                  href={`/category/mother-tinctures/${letter.toLowerCase()}`}
                  className="px-2 py-1 text-center border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200"
                >
                  {letter}
                </a>
              ))}
            </div>
            
            <a href="/category/dilutions" className="block text-lg font-semibold mt-6 mb-4 text-bahola-blue-600 hover:text-bahola-blue-800">
              Dilutions
            </a>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {alphabet.map((letter) => (
                <a 
                  key={letter} 
                  href={`/category/dilutions/${letter.toLowerCase()}`}
                  className="px-2 py-1 text-center border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <a href="/category/lm-potencies" className="block text-lg font-semibold mb-4 text-bahola-blue-600 hover:text-bahola-blue-800">
              LM Potencies
            </a>
            <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
              {alphabet.map((letter) => (
                <a 
                  key={letter} 
                  href={`/category/lm-potencies/${letter.toLowerCase()}`}
                  className="px-2 py-1 text-center border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200"
                >
                  {letter}
                </a>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-1 gap-3">
              <a href="/category/bio-chemics" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                Bio Chemics
              </a>
              <a href="/category/bio-combinations" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                Bio Combinations
              </a>
              <a href="/category/triturations" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                Triturations
              </a>
              <a href="/category/single-remedies" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                Single Remedies
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// For Doctors Mega Menu
export const MegaMenuDoctor: React.FC<MegaMenuProps> = ({ isOpen }) => {
  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-bahola-neutral-800">Professional Account</h3>
            <div className="bg-bahola-blue-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-3 text-bahola-blue-800">Sign up for a Professional account</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Exclusive professional discounts</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Special pricing for certificate courses</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Priority access to mentorship programs</span>
                </li>
                <li className="flex items-start">
                  <span className="h-5 w-5 rounded-full bg-bahola-blue-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
                  <span>Exclusive webinars and conference discounts</span>
                </li>
              </ul>
              <button className="btn-bahola w-full">Sign Up Now</button>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-bahola-neutral-800">Professional Resources</h3>
            <div className="space-y-4">
              <a href="/professional/materia-medica" className="block p-4 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors">
                <div className="flex items-center">
                  <div className="mr-4 text-bahola-blue-500">
                    <Stethoscope size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-bahola-neutral-800">Comparative Materia Medica</h4>
                    <p className="text-sm text-bahola-neutral-600">Access detailed comparative studies of homeopathic remedies</p>
                  </div>
                </div>
              </a>
              
              <a href="/professional/remedy-deep-dive" className="block p-4 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors">
                <div className="flex items-center">
                  <div className="mr-4 text-bahola-blue-500">
                    <Pill size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-bahola-neutral-800">Deep Dive into a Remedy</h4>
                    <p className="text-sm text-bahola-neutral-600">Explore in-depth analysis of specific remedies</p>
                  </div>
                </div>
              </a>
              
              <a href="/professional/case-studies" className="block p-4 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors">
                <div className="flex items-center">
                  <div className="mr-4 text-bahola-blue-500">
                    <BadgePlus size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-bahola-neutral-800">Case Studies</h4>
                    <p className="text-sm text-bahola-neutral-600">Review real-world clinical cases and treatment approaches</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
