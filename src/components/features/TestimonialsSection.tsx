
import React from 'react';
import { Star } from 'lucide-react';

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
