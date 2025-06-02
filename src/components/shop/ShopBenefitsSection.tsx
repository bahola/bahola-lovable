
import React from 'react';
import { Shield, Truck, Users, Award, Clock, Heart } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'All products manufactured following strict quality standards and GMP guidelines.'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and secure delivery across India with tracking information.'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: 'Get guidance from our qualified homeopaths and customer care team.'
  },
  {
    icon: Award,
    title: 'Trusted Brand',
    description: 'Over 2 decades of excellence in homeopathic medicine manufacturing.'
  },
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Round-the-clock customer support for all your queries and concerns.'
  },
  {
    icon: Heart,
    title: 'Natural & Safe',
    description: 'Gentle, side-effect-free remedies suitable for all age groups.'
  }
];

export const ShopBenefitsSection = () => {
  return (
    <section className="py-16 bg-bahola-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-bahola-navy-950 mb-4">
            Why Choose Bahola Labs?
          </h2>
          <p className="text-lg text-bahola-neutral-600 max-w-2xl mx-auto">
            Experience the difference with our commitment to quality, service, and your health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-md group-hover:shadow-lg transition-shadow">
                  <IconComponent size={32} className="text-bahola-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-bahola-navy-950 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-bahola-neutral-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
