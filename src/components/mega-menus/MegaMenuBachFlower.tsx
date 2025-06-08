import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Flower, ChevronRight, Sparkles, Leaf, Sun, X } from 'lucide-react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenuBachFlower: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const bachFlowerSections = [
    {
      title: "Shop Bach Flowers",
      items: [
        {
          icon: <Heart size={20} />,
          title: "Shop By Concern",
          description: "Find remedies for specific emotional states",
          link: "/bach-flower-concerns"
        },
        {
          icon: <Flower size={20} />,
          title: "Shop by Name",
          description: "Browse our complete catalog alphabetically",
          link: "/category/bach-flower"
        }
      ]
    },
    {
      title: "Popular Remedies",
      items: [
        {
          icon: <Sparkles size={20} />,
          title: "Rescue Remedy",
          description: "For stress, emergencies, and crisis situations",
          link: "/product/rescue-remedy"
        },
        {
          icon: <Sun size={20} />,
          title: "Mimulus",
          description: "For known fears and everyday anxieties",
          link: "/product/mimulus"
        },
        {
          icon: <Leaf size={20} />,
          title: "Larch",
          description: "For lack of confidence and self-esteem",
          link: "/product/larch"
        }
      ]
    },
    {
      title: "About Bach Flowers",
      items: [
        {
          icon: <Flower size={20} />,
          title: "What are Bach Flowers?",
          description: "38 flower remedies for emotional wellbeing",
          info: true
        },
        {
          icon: <Heart size={20} />,
          title: "How They Work",
          description: "Natural way to balance emotions and feelings",
          info: true
        },
        {
          icon: <Sparkles size={20} />,
          title: "Choosing the Right Remedy",
          description: "Match your emotional state to the right flower",
          info: true
        }
      ]
    }
  ];

  const featuredRemedies = [
    { name: "Olive", description: "Physical and mental exhaustion", link: "/product/olive" },
    { name: "White Chestnut", description: "Unwanted thoughts and mental arguments", link: "/product/white-chestnut" },
    { name: "Star of Bethlehem", description: "Shock, trauma, and grief", link: "/product/star-of-bethlehem" },
    { name: "Wild Rose", description: "Apathy and resignation", link: "/product/wild-rose" }
  ];

  return (
    <div className="mega-menu mega-menu-full mega-menu-open">
      <div className="mega-menu-content">
        {/* Header with close button */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-4 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Bach Flower Remedies</h2>
            <p className="text-pink-100 text-sm mt-1">Natural emotional healing through flower essences</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-pink-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bachFlowerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item.title}>
                      {item.info ? (
                        <div className="flex items-start p-3 bg-pink-50 rounded-lg">
                          <div className="text-pink-600 mr-3 mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ) : (
                        <Link 
                          to={item.link!} 
                          onClick={onClose}
                          className="flex items-start p-3 hover:bg-pink-50 rounded-lg transition-colors duration-200 group"
                        >
                          <div className="text-pink-600 group-hover:text-pink-700 mr-3 mt-1">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 group-hover:text-pink-700 transition-colors duration-200">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Featured Remedies Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4 mb-6">
              {featuredRemedies.map((remedy) => (
                <Link
                  key={remedy.name}
                  to={remedy.link}
                  onClick={onClose}
                  className="p-3 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors duration-200 text-center"
                >
                  <h5 className="font-medium text-gray-800 text-sm">{remedy.name}</h5>
                  <p className="text-xs text-gray-600 mt-1">{remedy.description}</p>
                </Link>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                to="/bach-flower-concerns" 
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors duration-200"
              >
                Explore All Bach Flower Remedies
                <ChevronRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenuBachFlower;
