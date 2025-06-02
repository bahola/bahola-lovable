
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Droplets, Heart, Pill, Leaf, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'mother-tinctures',
    name: 'Mother Tinctures',
    description: 'Foundation remedies prepared from finest raw materials',
    icon: Droplets,
    count: 120,
    color: 'bg-blue-50 text-blue-600',
    link: '/products/mother-tinctures'
  },
  {
    id: 'dilutions',
    name: 'Dilutions',
    description: 'Potentized remedies for various therapeutic needs',
    icon: Package,
    count: 230,
    color: 'bg-green-50 text-green-600',
    link: '/products/dilutions'
  },
  {
    id: 'biochemics',
    name: 'Biochemics',
    description: 'Cell salts for optimal cellular function',
    icon: Pill,
    count: 35,
    color: 'bg-purple-50 text-purple-600',
    link: '/products/biochemics'
  },
  {
    id: 'bach-flower',
    name: 'Bach Flower',
    description: 'Natural solutions for emotional wellbeing',
    icon: Heart,
    count: 38,
    color: 'bg-pink-50 text-pink-600',
    link: '/products/bach-flower'
  },
  {
    id: 'combinations',
    name: 'Combinations',
    description: 'Specially formulated remedy combinations',
    icon: Leaf,
    count: 45,
    color: 'bg-emerald-50 text-emerald-600',
    link: '/products/combinations'
  },
  {
    id: 'family-care',
    name: 'Family Care',
    description: 'Complete health solutions for the entire family',
    icon: Users,
    count: 60,
    color: 'bg-orange-50 text-orange-600',
    link: '/products/family-care'
  }
];

export const ShopCategoriesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bahola-navy-950 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-bahola-neutral-600 max-w-2xl mx-auto">
            Explore our comprehensive range of homeopathic products, each carefully crafted to support your health and wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.id}
                to={category.link}
                className="group bg-white rounded-xl shadow-md border border-bahola-neutral-200 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <IconComponent size={24} />
                  </div>
                  <span className="text-sm text-bahola-neutral-500 bg-bahola-neutral-100 px-2 py-1 rounded-full">
                    {category.count} products
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-bahola-navy-950 mb-2 group-hover:text-bahola-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-bahola-neutral-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center text-bahola-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  <span className="mr-2">Shop Now</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild className="btn-bahola text-lg px-8 py-3">
            <Link to="/products">
              View All Categories
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
