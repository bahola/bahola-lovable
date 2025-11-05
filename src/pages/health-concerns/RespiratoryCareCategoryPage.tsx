import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { TreatmentTable } from '@/components/health-concerns/TreatmentTable';
import { respiratoryTreatments } from '@/data/health-concerns/respiratoryTreatments';

const RespiratoryCareCategoryPage = () => {
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -35% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observerRef.current?.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Respiratory Care - Homeopathic Treatment for Asthma, Cough & Breathing | Bahola</title>
        <meta
          name="description"
          content="Natural homeopathic remedies for respiratory conditions including asthma, chronic cough, bronchitis, and chest congestion. Comprehensive treatment protocols with biochemic support."
        />
        <meta
          name="keywords"
          content="respiratory care, asthma treatment, chronic cough, bronchitis, homeopathy for breathing, chest congestion, wheezing relief"
        />
        <link rel="canonical" href="https://bahola.com/diseases-conditions/respiratory-care" />
      </Helmet>

      <main>
        <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Respiratory Care
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Comprehensive homeopathic support for asthma, cough, bronchitis, and respiratory wellness
              </p>
            </div>
          </div>
        </section>

        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="container mx-auto px-4">
            <nav className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
              {respiratoryTreatments.map((treatment) => {
                const sectionId = treatment.subConditionName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
                return (
                  <button
                    key={sectionId}
                    onClick={() => scrollToSection(sectionId)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      activeSection === sectionId
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {treatment.subConditionName}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Natural Solutions for Respiratory Health
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Respiratory conditions like asthma, chronic cough, and bronchitis can significantly impact quality of life.
                Homeopathy offers gentle, effective support that addresses both acute symptoms and underlying causes,
                helping restore healthy breathing and lung function.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our comprehensive treatment protocols combine classical homeopathic remedies with biochemic tissue salts
                and specialized Bahola formulations to provide multi-level support for various respiratory conditions,
                from allergic asthma to productive cough and chest congestion.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-12">
              {respiratoryTreatments.map((treatment) => {
                const sectionId = treatment.subConditionName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
                return (
                  <section key={sectionId} id={sectionId} className="scroll-mt-32">
                    <TreatmentTable treatment={treatment} />
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Important Notice
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These treatment protocols are provided for informational purposes. Always consult with a qualified
                healthcare practitioner before starting any new treatment, especially for chronic or severe
                respiratory conditions. Individual results may vary.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RespiratoryCareCategoryPage;
