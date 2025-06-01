
import React from 'react';
import { PageLayout } from '@/components/PageLayout';

const About: React.FC = () => {
  return (
    <PageLayout title="About Bahola Labs" description="Learn about our commitment to homeopathic medicine and natural healing">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-bahola-navy-950">About Bahola Labs</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-bahola-neutral-700 mb-6">
              This page is under construction. Content will be added soon.
            </p>
            
            <div className="bg-bahola-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-bahola-blue-800">Coming Soon</h2>
              <p className="text-bahola-blue-700">
                Learn about our history, mission, and commitment to providing high-quality homeopathic remedies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
