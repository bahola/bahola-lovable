
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
        <div className="bg-bahola-navy-50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-light text-bahola-navy-950 font-helvetica tracking-brand-tight brand-headline">{title}</h1>
            {description && <p className="mt-2 text-lg text-bahola-navy-700 brand-body">{description}</p>}
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
