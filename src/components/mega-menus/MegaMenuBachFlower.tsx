
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Flower, ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
}

// Bach Flower Mega Menu
export const MegaMenuBachFlower: React.FC<MegaMenuProps> = ({ isOpen }) => {
  return (
    <div className={`mega-menu ${isOpen ? 'mega-menu-open' : ''}`}>
      <div className="container mx-auto p-6 bg-gradient-to-br from-blue-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-bahola-neutral-800">Bach Flower Remedies</h3>
            <p className="mb-6 text-bahola-neutral-600">
              Bach flower remedies are a system of 38 flower remedies developed by Dr. Edward Bach, each prepared from the flowers of wild plants, trees, and bushes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                to="/bach-flower-concerns" 
                className="flex flex-col items-center p-6 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors bg-white/70 shadow-sm"
              >
                <div className="mb-3 text-bahola-blue-500">
                  <Heart size={32} />
                </div>
                <h4 className="font-semibold text-bahola-neutral-800 mb-2">Shop By Concern</h4>
                <p className="text-sm text-center text-bahola-neutral-600">Find remedies for specific emotional states and concerns</p>
              </Link>
              
              <Link 
                to="/category/bach-flower" 
                className="flex flex-col items-center p-6 border border-bahola-neutral-200 rounded-lg hover:border-bahola-blue-300 hover:bg-bahola-blue-50 transition-colors bg-white/70 shadow-sm"
              >
                <div className="mb-3 text-bahola-blue-500">
                  <Flower size={32} />
                </div>
                <h4 className="font-semibold text-bahola-neutral-800 mb-2">Shop by Name</h4>
                <p className="text-sm text-center text-bahola-neutral-600">Browse our complete catalog of Bach flower remedies</p>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-bahola-neutral-800">Popular Bach Flower Remedies</h3>
            <div className="space-y-3">
              <Link to="/product/rescue-remedy" className="block p-3 border-l-4 border-bahola-blue-500 pl-4 hover:bg-bahola-blue-50 bg-white/70 rounded-r shadow-sm">
                <h4 className="font-semibold text-bahola-neutral-800">Rescue Remedy</h4>
                <p className="text-sm text-bahola-neutral-600">For times of stress, emergencies, and crisis situations</p>
              </Link>
              <Link to="/product/mimulus" className="block p-3 border-l-4 border-bahola-neutral-200 pl-4 hover:bg-bahola-blue-50 hover:border-l-bahola-blue-500 bg-white/70 rounded-r shadow-sm">
                <h4 className="font-semibold text-bahola-neutral-800">Mimulus</h4>
                <p className="text-sm text-bahola-neutral-600">For known fears and everyday anxieties</p>
              </Link>
              <Link to="/product/larch" className="block p-3 border-l-4 border-bahola-neutral-200 pl-4 hover:bg-bahola-blue-50 hover:border-l-bahola-blue-500 bg-white/70 rounded-r shadow-sm">
                <h4 className="font-semibold text-bahola-neutral-800">Larch</h4>
                <p className="text-sm text-bahola-neutral-600">For lack of confidence and self-esteem</p>
              </Link>
              <Link to="/product/olive" className="block p-3 border-l-4 border-bahola-neutral-200 pl-4 hover:bg-bahola-blue-50 hover:border-l-bahola-blue-500 bg-white/70 rounded-r shadow-sm">
                <h4 className="font-semibold text-bahola-neutral-800">Olive</h4>
                <p className="text-sm text-bahola-neutral-600">For physical and mental exhaustion</p>
              </Link>
              <Link to="/product/white-chestnut" className="block p-3 border-l-4 border-bahola-neutral-200 pl-4 hover:bg-bahola-blue-50 hover:border-l-bahola-blue-500 bg-white/70 rounded-r shadow-sm">
                <h4 className="font-semibold text-bahola-neutral-800">White Chestnut</h4>
                <p className="text-sm text-bahola-neutral-600">For unwanted thoughts and mental arguments</p>
              </div>
              <div className="mt-4">
                <Link to="/bach-flower-concerns" className="text-bahola-blue-500 font-semibold hover:text-bahola-blue-700 flex items-center">
                  View all Bach Flower remedies
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuBachFlower;
