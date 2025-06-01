
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
            <p className="text-lg text-bahola-neutral-700">
              This page is under construction. Content will be added soon.
            </p>
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
