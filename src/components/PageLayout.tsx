
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const PageLayout = ({ children, title, description }: PageLayoutProps) => {
  // Update the document title when the component mounts
  React.useEffect(() => {
    document.title = `${title} | Bahola Labs`;
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="bg-bahola-blue-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-bahola-neutral-900">{title}</h1>
            {description && <p className="mt-2 text-lg text-bahola-neutral-600">{description}</p>}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8 md:py-12">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};
