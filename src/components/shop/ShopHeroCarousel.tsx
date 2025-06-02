
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Natural Healing Solutions",
    subtitle: "Discover the Power of Homeopathy",
    description: "Experience gentle, effective healing with our premium range of homeopathic remedies. Trusted by thousands of families across India.",
    image: "/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png",
    cta: "Shop Now",
    ctaLink: "/products",
    bgColor: "bg-gradient-to-r from-bahola-blue-50 to-bahola-navy-50"
  },
  {
    id: 2,
    title: "Expert Consultation",
    subtitle: "Get Personalized Treatment",
    description: "Book a consultation with our experienced homeopaths and get personalized treatment plans for your health concerns.",
    image: "/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png",
    cta: "Book Consultation",
    ctaLink: "/consultation",
    bgColor: "bg-gradient-to-r from-green-50 to-emerald-50"
  },
  {
    id: 3,
    title: "Premium Quality",
    subtitle: "Authentic Homeopathic Medicines",
    description: "All our products are manufactured following strict quality standards and authentic homeopathic principles.",
    image: "/lovable-uploads/a824791e-2dc7-4e18-b909-67012e2997d7.png",
    cta: "Learn More",
    ctaLink: "/about",
    bgColor: "bg-gradient-to-r from-purple-50 to-pink-50"
  }
];

export const ShopHeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000); // Changed from 5000 to 2000 (2 seconds)

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`${slide.bgColor} h-full`}>
            <div className="container mx-auto px-4 h-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-sm font-semibold text-bahola-blue-600 uppercase tracking-wide">
                      {slide.subtitle}
                    </h2>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-bahola-navy-950 leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-bahola-neutral-700 leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button asChild className="btn-bahola text-lg px-8 py-3">
                      <Link to={slide.ctaLink}>{slide.cta}</Link>
                    </Button>
                    <Button asChild variant="outline" className="text-lg px-8 py-3">
                      <Link to="/health-concerns">View Health Concerns</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[400px] w-auto object-contain rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-bahola-navy-950 p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-bahola-navy-950 p-2 rounded-full shadow-lg transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-bahola-blue-600' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
