
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

interface MegaMenuProps {
  isOpen: boolean;
}

// Shop by Category Mega Menu
export const MegaMenuCategory: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  const categories = [
    {
      id: "mother-tinctures",
      name: "Mother Tinctures",
      subcategories: alphabet.map(letter => ({ 
        id: letter.toLowerCase(), 
        name: letter,
        textColor: "text-green-700" // Green text color for the letters
      })),
      colorClass: "text-green-600 hover:text-green-800", // Light green color
      subColorClass: "hover:bg-green-50 hover:border-green-200" // Light green highlight
    },
    {
      id: "dilutions",
      name: "Dilutions",
      subcategories: alphabet.map(letter => ({ id: letter.toLowerCase(), name: letter })),
      colorClass: "text-bahola-blue-600 hover:text-bahola-blue-800", // Same blue color
      subColorClass: "hover:bg-bahola-blue-50 hover:border-bahola-blue-200" // Same blue highlight
    },
    {
      id: "lm-potencies",
      name: "LM Potencies",
      subcategories: alphabet.map(letter => ({ id: letter.toLowerCase(), name: letter })),
      colorClass: "text-blue-800 hover:text-blue-900", // Darker blue color
      subColorClass: "hover:bg-blue-100 hover:border-blue-300" // Darker blue highlight
    },
    { 
      id: "bio-chemics", 
      name: "Bio Chemics", 
      subcategories: [],
      colorClass: "text-bahola-blue-600 hover:text-bahola-blue-800"
    },
    { 
      id: "bio-combinations", 
      name: "Bio Combinations", 
      subcategories: [],
      colorClass: "text-bahola-blue-600 hover:text-bahola-blue-800"
    },
    { 
      id: "triturations", 
      name: "Triturations", 
      subcategories: [],
      colorClass: "text-bahola-blue-600 hover:text-bahola-blue-800"
    },
    { 
      id: "single-remedies", 
      name: "Single Remedies", 
      subcategories: [],
      colorClass: "text-bahola-blue-600 hover:text-bahola-blue-800"
    }
  ];
  
  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {categories.slice(0, 2).map((category, index) => (
              <div key={category.id} className={index > 0 ? "mt-6" : ""}>
                <Link 
                  to={`/category/${category.id}`} 
                  className={`block text-lg font-semibold mb-4 ${category.colorClass || "text-bahola-blue-600 hover:text-bahola-blue-800"}`}
                >
                  {category.name}
                </Link>
                {category.subcategories.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/category/${category.id}/${subcategory.id}`}
                        className={`px-2 py-1 text-center border border-bahola-neutral-200 rounded bg-white/70 ${category.subColorClass || "hover:bg-bahola-blue-50 hover:border-bahola-blue-200"} ${subcategory.textColor || ""} shadow-sm transition-colors`}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div>
            {categories.slice(2, 3).map((category, index) => (
              <div key={category.id} className={index > 0 ? "mt-6" : ""}>
                <Link 
                  to={`/category/${category.id}`} 
                  className={`block text-lg font-semibold mb-4 ${category.colorClass || "text-bahola-blue-600 hover:text-bahola-blue-800"}`}
                >
                  {category.name}
                </Link>
                {category.subcategories.length > 0 && (
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/category/${category.id}/${subcategory.id}`}
                        className={`px-2 py-1 text-center border border-bahola-neutral-200 rounded bg-white/70 ${category.subColorClass || "hover:bg-bahola-blue-50 hover:border-bahola-blue-200"} ${subcategory.textColor || ""} shadow-sm transition-colors`}
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="mt-6 grid grid-cols-1 gap-3">
              {categories.slice(3).map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`text-lg font-semibold ${category.colorClass || "text-bahola-blue-600 hover:text-bahola-blue-800"} transition-colors`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-4" />
        
        <div className="text-center">
          <Link
            to="/categories"
            className="inline-flex items-center text-bahola-blue-600 hover:text-bahola-blue-800 font-medium transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuCategory;
