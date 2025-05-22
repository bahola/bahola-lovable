
import React from 'react';
import { Bug, Wheat, Brain, Pill, Droplets, Heart, Dumbbell, Baby } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const DiscoverSection = () => {
  const concerns = [
    { 
      name: 'Allergies', 
      icon: <Bug size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
    },
    { 
      name: 'Digestive Health', 
      icon: <Wheat size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    { 
      name: 'Stress & Anxiety', 
      icon: <Brain size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b"
    },
    { 
      name: 'Sleep Issues', 
      icon: <Pill size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
    },
    { 
      name: 'Skin Problems', 
      icon: <Droplets size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843"
    },
    { 
      name: 'Immune Support', 
      icon: <Heart size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    },
    { 
      name: 'Joint Pain', 
      icon: <Dumbbell size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
    },
    { 
      name: 'Women\'s Health', 
      icon: <Baby size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
    },
  ];
  
  return (
    <section className="py-16 bg-bahola-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Discover Homeopathic Remedies by Condition</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {concerns.map((concern) => (
            <a 
              key={concern.name}
              href={`/concern/${concern.name.toLowerCase().replace(/[&\s]+/g, '-')}`}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all text-center flex flex-col h-64"
            >
              <div className="h-32 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
                <img 
                  src={concern.image} 
                  alt={concern.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-center justify-center p-4 flex-grow">
                <div className="text-bahola-blue-500">
                  {concern.icon}
                </div>
                <h3 className="font-medium text-bahola-neutral-800">{concern.name}</h3>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button className="btn-bahola">
            View All Health Concerns
          </Button>
        </div>
      </div>
    </section>
  );
};
