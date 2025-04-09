
import React from 'react';
import { Video, Calendar, Pill, Stethoscope, Star, Bug, Heart, Apple, Brain, Dumbbell, Eye, Wheat, Droplets, Baby } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ProductCard } from './ProductCard';

export const ConsultSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Consult a Homeopath</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-bahola-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-bahola-blue-100 text-bahola-blue-500 mx-auto mb-6">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">In-Person Appointment</h3>
            <p className="text-bahola-neutral-600 text-center mb-6">
              Meet with our expert homeopaths for a personalized consultation in our Chennai clinic.
            </p>
            <Button className="w-full btn-bahola">
              Book Appointment
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-bahola-neutral-200 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-bahola-blue-100 text-bahola-blue-500 mx-auto mb-6">
              <Video size={32} />
            </div>
            <h3 className="text-xl font-semibold text-center mb-4">Video Consultation</h3>
            <p className="text-bahola-neutral-600 text-center mb-6">
              Connect with our homeopaths from anywhere through secure video consultations.
            </p>
            <Button className="w-full btn-bahola">
              Book Video Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export const FeaturedProductsSection = () => {
  const products = [
    { id: 1, name: 'Arnica Montana 30C', price: 120, rating: 4.8, image: '/placeholder.svg' },
    { id: 2, name: 'Rhus Toxicodendron 200C', price: 150, rating: 4.6, image: '/placeholder.svg' },
    { id: 3, name: 'Nux Vomica 30C', price: 120, rating: 4.9, image: '/placeholder.svg' },
    { id: 4, name: 'Belladonna 30C', price: 130, rating: 4.7, image: '/placeholder.svg' },
    { id: 5, name: 'Arsenicum Album 30C', price: 120, rating: 4.5, image: '/placeholder.svg' },
    { id: 6, name: 'Bryonia Alba 200C', price: 150, rating: 4.6, image: '/placeholder.svg' },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button className="btn-bahola">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export const AboutSection = () => {
  return (
    <section className="py-16 bg-bahola-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-bahola-neutral-800 mb-6">About Bahola Labs</h2>
            <p className="text-bahola-neutral-700 mb-4">
              Bahola Labs is dedicated to providing the highest quality homeopathic remedies, backed by scientific research and traditional knowledge. Our mission is to make homeopathy accessible and trustworthy for everyone.
            </p>
            <p className="text-bahola-neutral-700 mb-6">
              With over two decades of experience, our team of expert homeopaths and pharmacists ensure that every remedy meets the strictest quality standards, giving you confidence in your health choices.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-bahola-blue-100 flex items-center justify-center mr-4">
                  <Stethoscope size={24} className="text-bahola-blue-500" />
                </div>
                <div>
                  <p className="font-bold">Expert Homeopaths</p>
                  <p className="text-sm text-bahola-neutral-600">Qualified specialists</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-bahola-blue-100 flex items-center justify-center mr-4">
                  <Pill size={24} className="text-bahola-blue-500" />
                </div>
                <div>
                  <p className="font-bold">Quality Assured</p>
                  <p className="text-sm text-bahola-neutral-600">Strict quality control</p>
                </div>
              </div>
            </div>
            <Button className="btn-bahola">
              Learn More About Us
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="Bahola Labs Laboratory" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "Bahola's homeopathic remedies have completely transformed my approach to managing my chronic allergies. After years of depending on antihistamines, I found lasting relief with their personalized remedies.",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      text: "The video consultation with Dr. Mehra was excellent. She listened carefully to all my concerns and prescribed remedies that actually worked for my digestive issues. Highly recommend!",
      rating: 5
    },
    {
      id: 3,
      name: "Ananya Patel",
      text: "I was skeptical about homeopathy at first, but after using Bahola's remedies for my skin condition, I'm a complete convert. The quality of their products is exceptional.",
      rating: 4
    },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-md border border-bahola-neutral-200">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-bahola-neutral-700 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-bahola-neutral-800">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
