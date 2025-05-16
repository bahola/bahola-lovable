
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface MegaMenuProps {
  isOpen: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

// Shop by Category Mega Menu
export const MegaMenuCategory: React.FC<MegaMenuProps> = ({ isOpen }) => {
  const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('id, name, slug')
          .order('name');
          
        if (error) throw error;
        
        if (data) {
          setCategories(data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);
  
  return (
    <div className={`mega-menu mega-menu-full ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {categories.length > 0 && (
              <>
                <Link to={`/category/${categories[0]?.slug || 'mother-tinctures'}`} className="block text-lg font-semibold mb-4 text-bahola-blue-600 hover:text-bahola-blue-800">
                  {categories[0]?.name || 'Mother tinctures'}
                </Link>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {alphabet.map((letter) => (
                    <Link 
                      key={letter} 
                      to={`/subcategory/${(categories[0]?.slug || 'mother-tinctures')}-${letter.toLowerCase()}`}
                      className="px-2 py-1 text-center border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200"
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
              </>
            )}
            
            {categories.length > 1 && (
              <>
                <Link to={`/category/${categories[1]?.slug || 'dilutions'}`} className="block text-lg font-semibold mt-6 mb-4 text-bahola-blue-600 hover:text-bahola-blue-800">
                  {categories[1]?.name || 'Dilutions'}
                </Link>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {alphabet.map((letter) => (
                    <Link 
                      key={letter} 
                      to={`/subcategory/${(categories[1]?.slug || 'dilutions')}-${letter.toLowerCase()}`}
                      className="px-2 py-1 text-center border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200"
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div>
            {categories.length > 2 && (
              <>
                <Link to={`/category/${categories[2]?.slug || 'lm-potencies'}`} className="block text-lg font-semibold mb-4 text-bahola-blue-600 hover:text-bahola-blue-800">
                  {categories[2]?.name || 'LM Potencies'}
                </Link>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {alphabet.map((letter) => (
                    <Link 
                      key={letter} 
                      to={`/subcategory/${(categories[2]?.slug || 'lm-potencies')}-${letter.toLowerCase()}`}
                      className="px-2 py-1 text-center border border-bahola-neutral-200 rounded hover:bg-bahola-blue-50 hover:border-bahola-blue-200"
                    >
                      {letter}
                    </Link>
                  ))}
                </div>
              </>
            )}
            
            <div className="mt-6 grid grid-cols-1 gap-3">
              {categories.slice(3).map((category) => (
                <Link 
                  key={category.id}
                  to={`/category/${category.slug}`} 
                  className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800"
                >
                  {category.name}
                </Link>
              ))}
              {categories.length <= 3 && (
                <>
                  <Link to="/category/bio-chemics" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                    Bio Chemics
                  </Link>
                  <Link to="/category/bio-combinations" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                    Bio Combinations
                  </Link>
                  <Link to="/category/triturations" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                    Triturations
                  </Link>
                  <Link to="/category/single-remedies" className="text-lg font-semibold text-bahola-blue-600 hover:text-bahola-blue-800">
                    Single Remedies
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-bahola-neutral-200 text-center">
          <Link to="/subcategories" className="inline-block px-4 py-2 bg-bahola-blue-100 text-bahola-blue-600 hover:bg-bahola-blue-200 rounded-md font-medium transition-colors">
            View All Categories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuCategory;
