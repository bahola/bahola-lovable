
import React from 'react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  isOpen: boolean;
}

// Shop by Category Mega Menu - Mayo Clinic inspired design
export const MegaMenuCategory: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  
  const categoryGroups = [
    {
      title: "Homeopathic Medicines",
      categories: [
        {
          id: "mother-tinctures",
          name: "Mother Tinctures",
          description: "Concentrated liquid extracts",
          subcategories: alphabet.slice(0, 13).map(letter => ({ 
            id: letter.toLowerCase(), 
            name: letter 
          }))
        },
        {
          id: "dilutions",
          name: "Dilutions",
          description: "Various potencies available",
          subcategories: alphabet.slice(13).map(letter => ({ 
            id: letter.toLowerCase(), 
            name: letter 
          }))
        }
      ]
    },
    {
      title: "Specialized Formulations",
      categories: [
        {
          id: "lm-potencies",
          name: "LM Potencies",
          description: "50 Millesimal potencies",
          subcategories: alphabet.slice(0, 13).map(letter => ({ 
            id: letter.toLowerCase(), 
            name: letter 
          }))
        },
        {
          id: "bio-chemics",
          name: "Bio Chemics",
          description: "Tissue salts and minerals",
          subcategories: []
        }
      ]
    },
    {
      title: "Combination Remedies",
      categories: [
        {
          id: "bio-combinations",
          name: "Bio Combinations",
          description: "Synergistic formulas",
          subcategories: []
        },
        {
          id: "triturations",
          name: "Triturations",
          description: "Powdered preparations",
          subcategories: []
        }
      ]
    }
  ];
  
  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="bg-white shadow-xl border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4">
          <h2 className="text-xl font-semibold">Shop by Category</h2>
          <p className="text-green-100 text-sm mt-1">Browse our complete range of homeopathic medicines</p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categoryGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {group.title}
                </h3>
                <div className="space-y-4">
                  {group.categories.map((category) => (
                    <div key={category.id}>
                      <Link 
                        to={`/category/${category.id}`} 
                        className="block group"
                      >
                        <h4 className="font-semibold text-green-700 hover:text-green-800 transition-colors duration-200 mb-1">
                          {category.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-3">{category.description}</p>
                      </Link>
                      
                      {category.subcategories.length > 0 && (
                        <div className="grid grid-cols-4 gap-1 mb-2">
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory.id}
                              to={`/category/${category.id}/${subcategory.id}`}
                              className="px-2 py-1 text-center text-xs border border-gray-200 rounded hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors duration-200 bg-gray-50"
                            >
                              {subcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Single Remedies Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <Link
                to="/category/single-remedies"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 mr-4"
              >
                Single Remedies
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition-colors duration-200"
              >
                View All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuCategory;
