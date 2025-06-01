
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { usePageContent } from '@/hooks/usePageContent';

const About: React.FC = () => {
  const { pageData, loading, error } = usePageContent('about');

  if (loading) {
    return (
      <PageLayout title="About Bahola Labs" description="Learn about our commitment to homeopathic medicine and natural healing">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !pageData) {
    return (
      <PageLayout title="About Bahola Labs" description="Learn about our commitment to homeopathic medicine and natural healing">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-4xl font-bold mb-8 text-bahola-navy-950">Welcome to Bahola</h1>
            
            <div className="space-y-8 text-bahola-neutral-700 leading-relaxed">
              <p>
                Since our inception in 1939, Bahola Labs has been a pioneer in the field of homeopathy. Founded by Dr. V.R. Murty, whose passion for natural healing was ignited by a personal experience, we have grown into a trusted name in homeopathic pharmaceuticals. Our mission is to make homeopathy the preferred choice for treating acute and chronic conditions, providing natural, effective remedies where allopathy may fall short.
              </p>

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
                <div className="space-y-3">
                  <div>
                    <strong className="text-bahola-blue-700">Quality:</strong> We uphold the highest standards in every aspect of our production, from sourcing the finest ingredients to rigorous quality control measures.
                  </div>
                  <div>
                    <strong className="text-bahola-blue-700">Innovation:</strong> We stay at the forefront of natural wellness by continuously researching and developing advanced homeopathic medicines.
                  </div>
                  <div>
                    <strong className="text-bahola-blue-700">Expertise:</strong> Our team of experienced homeopaths and scientists are dedicated to creating effective remedies backed by extensive knowledge and research.
                  </div>
                  <div>
                    <strong className="text-bahola-blue-700">Empathy:</strong> We understand the unique health challenges faced by our customers and strive to provide solutions that truly make a difference.
                  </div>
                  <div>
                    <strong className="text-bahola-blue-700">Integrity:</strong> We are committed to transparency and honesty in all our interactions, building trust with our customers and partners.
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-bahola-navy-950">Our Products</h2>
                <p className="mb-4">Bahola Labs offers a comprehensive range of homeopathic remedies, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Mother Tinctures:</strong> Pure, potent extracts derived from the highest quality raw materials.</li>
                  <li><strong>Dilutions:</strong> Carefully prepared to ensure maximum efficacy and safety.</li>
                  <li><strong>LM Potencies:</strong> Designed for deep, constitutional healing.</li>
                  <li><strong>Nosodes:</strong> Prepared from natural sources to support immune function and preventive care.</li>
                  <li><strong>Bio Chemics & Bio Combinations:</strong> Formulated to address specific health concerns and restore balance.</li>
                  <li><strong>Triturations:</strong> Finely ground remedies for optimal absorption and effectiveness.</li>
                </ul>
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
  }

  return (
    <PageLayout title={pageData.title} description={pageData.meta_description}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap">{pageData.content}</div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
