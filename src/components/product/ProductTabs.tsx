
import React, { useState } from 'react';

interface ProductTabsProps {
  benefits: string[];
  usage: string;
  ingredients: string;
  reviewCount: number;
}

type TabType = 'benefits' | 'usage' | 'ingredients' | 'reviews';

const ProductTabs: React.FC<ProductTabsProps> = ({ benefits, usage, ingredients, reviewCount }) => {
  const [activeTab, setActiveTab] = useState<TabType>('benefits');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'benefits':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="text-bahola-neutral-700">{benefit}</li>
              ))}
            </ul>
          </div>
        );
      case 'usage':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Usage</h2>
            <p className="text-bahola-neutral-700">{usage}</p>
          </div>
        );
      case 'ingredients':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Ingredients</h2>
            <p className="text-bahola-neutral-700">{ingredients}</p>
          </div>
        );
      case 'reviews':
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Reviews ({reviewCount})</h2>
            <p className="text-bahola-neutral-700">No reviews yet. Be the first to review this product!</p>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="mt-12">
      <div className="border-b border-gray-200 mb-8">
        <div className="flex flex-wrap -mb-px">
          <button 
            className={`font-medium px-4 py-2 mr-4 ${
              activeTab === 'benefits' 
                ? 'text-bahola-blue-600 border-b-2 border-bahola-blue-600' 
                : 'text-bahola-neutral-500 hover:text-bahola-neutral-700'
            }`}
            onClick={() => setActiveTab('benefits')}
          >
            Benefits
          </button>
          <button 
            className={`font-medium px-4 py-2 mr-4 ${
              activeTab === 'usage' 
                ? 'text-bahola-blue-600 border-b-2 border-bahola-blue-600' 
                : 'text-bahola-neutral-500 hover:text-bahola-neutral-700'
            }`}
            onClick={() => setActiveTab('usage')}
          >
            Usage
          </button>
          <button 
            className={`font-medium px-4 py-2 mr-4 ${
              activeTab === 'ingredients' 
                ? 'text-bahola-blue-600 border-b-2 border-bahola-blue-600' 
                : 'text-bahola-neutral-500 hover:text-bahola-neutral-700'
            }`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`font-medium px-4 py-2 mr-4 ${
              activeTab === 'reviews' 
                ? 'text-bahola-blue-600 border-b-2 border-bahola-blue-600' 
                : 'text-bahola-neutral-500 hover:text-bahola-neutral-700'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
};

export default ProductTabs;
