
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const About: React.FC = () => {
  return (
    <PageLayout title="About Bahola Labs" description="Learn about our commitment to homeopathic medicine and natural healing">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold mb-6 text-bahola-navy-950">Welcome to Bahola</h1>
            <p className="text-lg text-bahola-neutral-700 leading-relaxed">
              Since our inception in 1939, Bahola Labs has been a pioneer in the field of homeopathy. Founded by Dr. V.R. Murty, whose passion for natural healing was ignited by a personal experience, we have grown into a trusted name in homeopathic pharmaceuticals.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Bahola Labs - Homeopathic Medicine Research" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="space-y-8 text-bahola-neutral-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Our Mission</h2>
              <p>
                At Bahola Labs, our mission is to harness the power of homeopathy to enhance the health and well-being of individuals around the world. We are committed to delivering high-quality, homeopathic medicines that offer real, measurable results.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Our Vision</h2>
              <p>
                We envision a world where homeopathy is widely recognized and trusted as a primary form of healthcare, offering holistic solutions that promote long-term health and wellness. Through continuous innovation and dedication to excellence, we aim to lead the industry and inspire a global shift towards natural healing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bahola-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-bahola-blue-700 mb-2">Quality</h3>
                  <p className="text-sm">We uphold the highest standards in every aspect of our production, from sourcing the finest ingredients to rigorous quality control measures.</p>
                </div>
                <div className="bg-bahola-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-bahola-blue-700 mb-2">Innovation</h3>
                  <p className="text-sm">We stay at the forefront of natural wellness by continuously researching and developing advanced homeopathic medicines.</p>
                </div>
                <div className="bg-bahola-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-bahola-blue-700 mb-2">Expertise</h3>
                  <p className="text-sm">Our team of experienced homeopaths and scientists are dedicated to creating effective remedies backed by extensive knowledge and research.</p>
                </div>
                <div className="bg-bahola-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-bahola-blue-700 mb-2">Integrity</h3>
                  <p className="text-sm">We are committed to transparency and honesty in all our interactions, building trust with our customers and partners.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Our Products</h2>
              <p className="mb-4">Bahola Labs offers a comprehensive range of homeopathic remedies, including:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-bahola-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Mother Tinctures:</strong> Pure, potent extracts derived from the highest quality raw materials.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-bahola-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Dilutions:</strong> Carefully prepared to ensure maximum efficacy and safety.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-bahola-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>LM Potencies:</strong> Designed for deep, constitutional healing.
                    </div>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-bahola-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Nosodes:</strong> Prepared from natural sources to support immune function and preventive care.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-bahola-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Bio Chemics & Bio Combinations:</strong> Formulated to address specific health concerns and restore balance.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-bahola-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <div>
                      <strong>Triturations:</strong> Finely ground remedies for optimal absorption and effectiveness.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Why Choose Bahola Labs?</h2>
              <p>
                With over eight decades of experience, Bahola Labs stands out for its unwavering commitment to quality, innovation, and customer satisfaction. Our products are trusted by healthcare professionals and patients alike, thanks to our meticulous formulation processes and dedication to natural health.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Join Our Community</h2>
              <p>
                Whether you are a healthcare professional or a patient seeking natural remedies, Bahola Labs is here to support your journey towards better health. Explore our extensive product range, benefit from our expertise, and experience the Bahola difference.
              </p>
            </div>

            <div className="bg-bahola-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-bahola-blue-800">Contact Us:</h3>
              <p className="text-bahola-blue-700 mb-4">
                For more information about our products and services, please get in touch with us. We are here to help you achieve your wellness goals.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 text-bahola-blue-800">Follow Us:</h3>
              <p className="text-bahola-blue-700">
                Stay updated with the latest from Bahola Labs by following us on social media.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
