
import React from 'react';
import { Brain, Wheat, Bug, Heart, Droplets, Dumbbell, Users, Baby, Eye, Activity, Thermometer, Shield, Pill, Ear, Flower, BadgePlus, BugPlay, Apple, Wind, Banana, Smile } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const DiscoverSection = () => {
  const concerns = [
    { 
      name: 'Allergies', 
      icon: <Bug size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      route: '/concern/allergies-hay-fever'
    },
    { 
      name: 'Cancer', 
      icon: <Pill size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      route: '/concern/cancer'
    },
    { 
      name: 'Heart Health', 
      icon: <Heart size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      route: '/concern/high-blood-pressure'
    },
    { 
      name: 'Child Care', 
      icon: <Baby size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      route: '/concern/childrens-health'
    },
    { 
      name: 'Ear Nose Throat', 
      icon: <Ear size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      route: '/concern/cold-flu'
    },
    { 
      name: 'Eye Care', 
      icon: <Eye size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      route: '/concern/eye-problems'
    },
    { 
      name: 'Gut Health', 
      icon: <Wheat size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      route: '/concern/digestive-issues'
    },
    { 
      name: 'Womens Care', 
      icon: <Users size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      route: '/concern/womens-health'
    },
    { 
      name: 'Hair Care', 
      icon: <Flower size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      route: '/concern/hair-care'
    },
    { 
      name: 'Mental health', 
      icon: <Brain size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b",
      route: '/concern/anxiety-stress'
    },
    { 
      name: 'Muscle & Joint Care', 
      icon: <Dumbbell size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      route: '/concern/joint-pain-arthritis'
    },
    { 
      name: 'Pain Care', 
      icon: <Thermometer size={32} className="mb-2" />, 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      route: '/concern/headaches-migraines'
    }
  ];
  
  return (
    <section className="py-16 bg-bahola-navy-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Discover Homeopathic Remedies by Condition</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {concerns.slice(0, 8).map((concern) => (
            <Link 
              key={concern.name}
              to={concern.route}
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
                <h3 className="font-medium text-bahola-navy-950 font-helvetica">{concern.name}</h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/health-concerns">
            <Button className="btn-bahola font-helvetica">
              View All Health Concerns
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
