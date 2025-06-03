
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Wheat, Bug, Heart, Droplets, Users, Dumbbell, Baby, Eye, Activity, Thermometer, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    id: 'anxiety-stress',
    name: 'Anxiety & Stress',
    description: 'Natural remedies for managing anxiety and stress-related conditions',
    icon: Brain,
    count: 45,
    color: 'bg-blue-50 text-blue-600',
    link: '/concern/anxiety-stress'
  },
  {
    id: 'digestive-issues',
    name: 'Digestive Issues',
    description: 'Homeopathic solutions for digestive health and gut wellness',
    icon: Wheat,
    count: 52,
    color: 'bg-green-50 text-green-600',
    link: '/concern/digestive-issues'
  },
  {
    id: 'allergies-hay-fever',
    name: 'Allergies & Hay Fever',
    description: 'Effective remedies for allergic reactions and seasonal allergies',
    icon: Bug,
    count: 38,
    color: 'bg-purple-50 text-purple-600',
    link: '/concern/allergies-hay-fever'
  },
  {
    id: 'cold-flu',
    name: 'Cold & Flu',
    description: 'Natural immune support for cold and flu symptoms',
    icon: Heart,
    count: 42,
    color: 'bg-pink-50 text-pink-600',
    link: '/concern/cold-flu'
  },
  {
    id: 'skin-conditions',
    name: 'Skin Conditions',
    description: 'Gentle remedies for various skin health concerns',
    icon: Droplets,
    count: 35,
    color: 'bg-emerald-50 text-emerald-600',
    link: '/concern/skin-conditions'
  },
  {
    id: 'joint-pain-arthritis',
    name: 'Joint Pain & Arthritis',
    description: 'Pain relief and mobility support for joint health',
    icon: Dumbbell,
    count: 40,
    color: 'bg-orange-50 text-orange-600',
    link: '/concern/joint-pain-arthritis'
  },
  {
    id: 'womens-health',
    name: 'Women\'s Health',
    description: 'Specialized care for women\'s health concerns',
    icon: Users,
    count: 48,
    color: 'bg-rose-50 text-rose-600',
    link: '/concern/womens-health'
  },
  {
    id: 'childrens-health',
    name: 'Children\'s Health',
    description: 'Safe and gentle remedies for children\'s wellness',
    icon: Baby,
    count: 33,
    color: 'bg-cyan-50 text-cyan-600',
    link: '/concern/childrens-health'
  },
  {
    id: 'insomnia-sleep-disorders',
    name: 'Sleep Disorders',
    description: 'Natural solutions for better sleep and rest',
    icon: Shield,
    count: 28,
    color: 'bg-indigo-50 text-indigo-600',
    link: '/concern/insomnia-sleep-disorders'
  },
  {
    id: 'eye-problems',
    name: 'Eye Problems',
    description: 'Gentle care for various eye health concerns',
    icon: Eye,
    count: 25,
    color: 'bg-teal-50 text-teal-600',
    link: '/concern/eye-problems'
  },
  {
    id: 'high-blood-pressure',
    name: 'High Blood Pressure',
    description: 'Natural support for cardiovascular health',
    icon: Activity,
    count: 30,
    color: 'bg-red-50 text-red-600',
    link: '/concern/high-blood-pressure'
  },
  {
    id: 'headaches-migraines',
    name: 'Headaches & Migraines',
    description: 'Relief for headaches and migraine symptoms',
    icon: Thermometer,
    count: 32,
    color: 'bg-yellow-50 text-yellow-600',
    link: '/concern/headaches-migraines'
  }
];

export const ShopCategoriesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bahola-navy-950 mb-4">
            Shop by Health Concern
          </h2>
          <p className="text-lg text-bahola-neutral-600 max-w-2xl mx-auto">
            Find targeted homeopathic solutions for your specific health concerns. Our remedies are carefully selected to support your wellness journey.
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
                    {category.count} remedies
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-bahola-navy-950 mb-2 group-hover:text-bahola-blue-600 transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-bahola-neutral-600 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex items-center text-bahola-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  <span className="mr-2">Explore Remedies</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild className="btn-bahola text-lg px-8 py-3">
            <Link to="/health-concerns">
              View All Health Concerns
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
