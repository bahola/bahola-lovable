
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const About = () => {
  return (
    <PageLayout title="About Us" description="Learn about Bahola Labs and our mission">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="mb-4">
            Bahola Labs was founded with a simple yet powerful vision: to make homeopathic remedies more accessible,
            effective, and trusted by people around the world. Our journey began in Chennai, India, where we committed
            to blending traditional homeopathic wisdom with modern scientific approaches.
          </p>
          <p className="mb-4">
            Today, we are proud to be one of India's most trusted homeopathic brands, serving thousands of patients
            and healthcare professionals with our premium quality remedies and exceptional care.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p>
            At Bahola Labs, our mission is to improve lives through the gentle power of homeopathy. We are committed to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>Producing the highest quality homeopathic remedies with strict quality control</li>
            <li>Educating the public about the benefits and proper use of homeopathic medicine</li>
            <li>Supporting homeopathic practitioners with professional-grade products and resources</li>
            <li>Making natural healing accessible to everyone through affordable pricing and clear information</li>
          </ul>
        </div>
        
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="/placeholder.svg" 
            alt="Bahola Labs Facility" 
            className="w-full h-auto"
          />
          <div className="p-6 bg-white">
            <h3 className="text-xl font-semibold mb-2">Our Modern Facility</h3>
            <p>
              Our state-of-the-art manufacturing facility combines traditional homeopathic preparation methods
              with modern technology to ensure the highest standards of quality and efficacy in every product.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p>
              We never compromise on the quality of our ingredients or production processes,
              ensuring every remedy meets the highest standards of purity and potency.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Trust</h3>
            <p>
              We build trust through transparency, education, and consistently delivering
              products that work as promised, backed by scientific principles.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Compassion</h3>
            <p>
              We approach healthcare with empathy and understanding, recognizing that
              each person's healing journey is unique and deserving of personalized care.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
