
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Heart } from 'lucide-react';

const ILoveHomeopathy = () => {
  return (
    <PageLayout title="I ❤️ Homeopathy" description="Join the homeopathy movement">
      <div className="text-center mb-10">
        <div className="inline-flex items-center text-3xl md:text-4xl font-bold">
          <span>I</span>
          <Heart className="mx-2 h-10 w-10 text-red-500 fill-red-500" />
          <span>HOMEOPATHY</span>
        </div>
        <p className="mt-4 text-xl text-bahola-neutral-600">
          Discover why millions around the world choose homeopathy for their health needs
        </p>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <p>
          This page is under development. It will feature content about the homeopathy movement,
          testimonials from practitioners and patients, and educational resources about homeopathic remedies.
        </p>
      </div>
    </PageLayout>
  );
};

export default ILoveHomeopathy;
