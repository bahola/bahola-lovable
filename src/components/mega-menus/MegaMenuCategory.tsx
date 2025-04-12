
import React from 'react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Shop by Category Mega Menu
export const MegaMenuCategory: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-6">
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

export default MegaMenuCategory;
