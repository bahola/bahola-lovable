
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryOverview = () => {
  // This would typically come from an API or database
  const categories = [
    {
      id: 'mother-tinctures',
      name: 'Mother Tinctures',
      description: 'The foundation of homeopathic remedies, our mother tinctures are prepared from the finest raw materials.',
      image: '/placeholder.svg',
      count: 120
    },
    {
      id: 'dilutions',
      name: 'Dilutions',
      description: 'Potentized homeopathic remedies in various dilutions for different therapeutic needs.',
      image: '/placeholder.svg',
      count: 230
    },
    {
      id: 'biochemics',
      name: 'Biochemics',
      description: 'Cell salts that help restore mineral balance in the body for optimal cellular function.',
      image: '/placeholder.svg',
      count: 35
    },
    {
      id: 'lm-potencies',
      name: 'LM Potencies',
      description: 'Gentle yet powerful remedies suitable for chronic conditions and sensitive patients.',
      image: '/placeholder.svg',
      count: 85
    },
    {
      id: 'bach-flower',
      name: 'Bach Flower Remedies',
      description: 'Natural solutions for emotional and mental wellbeing based on Dr. Bach\'s flower essences.',
      image: '/placeholder.svg',
      count: 38
    },
    {
      id: 'combinations',
      name: 'Combination Remedies',
      description: 'Carefully formulated remedy combinations targeting specific ailments and health concerns.',
      image: '/placeholder.svg',
      count: 45
    }
  ];
  
  // Health concerns for the "Shop by Concern" section
  const concerns = [
    'Allergies', 
    'Digestive Health', 
    'Respiratory Care', 
    'Skin Care', 
    'Sleep & Stress', 
    'Immunity Support', 
    'Joint & Muscle', 
    'Children\'s Health',
    'Mental Health',
    'Heart Health',
    'Eye Care',
    'Ear Nose Throat'
  ];

  return (
    <PageLayout title="Product Categories" description="Browse our complete range of homeopathic products">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/category/${category.id}`} 
            className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-[1.02]"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 group-hover:text-bahola-blue-500 transition-colors">
                {category.name}
              </h2>
              <p className="text-bahola-neutral-600 mb-3">{category.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-bahola-neutral-500">{category.count} products</span>
                <span className="flex items-center text-bahola-blue-500 font-medium">
                  View Products <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Shop by Health Concern</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {concerns.map((concern) => (
            <Link 
              key={concern} 
              to={`/concern/${concern.toLowerCase().replace(/\s+/g, '-')}`}
              className="bg-bahola-blue-50 hover:bg-bahola-blue-100 p-4 rounded-lg text-center transition-colors"
            >
              <span className="font-medium">{concern}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Need Help Finding the Right Product?</h2>
        <p className="mb-4">
          With hundreds of homeopathic remedies available, finding the right one for your specific
          health concern can be challenging. Let our experts guide you to the perfect solution.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/contact" 
            className="bg-bahola-blue-500 hover:bg-bahola-blue-600 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center"
          >
            Contact Our Experts
          </Link>
          <Link 
            to="/search" 
            className="bg-bahola-neutral-200 hover:bg-bahola-neutral-300 px-6 py-2 rounded-lg transition-colors inline-flex items-center"
          >
            Advanced Search
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryOverview;
