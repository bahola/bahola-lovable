import React from 'react';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { allergyTreatments } from '@/data/health-concerns/allergyTreatments';
import { TreatmentTable } from '@/components/health-concerns/TreatmentTable';
import { SEO } from '@/components/SEO';

const AllergiesCategoryPage = () => {
  return (
    <>
      <SEO
        title="Allergy Treatment Guide - Complete Homeopathic Solutions"
        description="Comprehensive homeopathic treatment guide for allergies including remedies, potencies, and expected results for all types of allergic conditions including rhinitis, sinusitis, skin allergies, eye allergies, and asthma."
        keywords={[
          'allergy treatment',
          'homeopathic allergy remedies',
          'allergic rhinitis treatment',
          'sinusitis remedies',
          'skin allergy treatment',
          'eye allergy remedies',
          'asthma treatment',
          'biochemic remedies for allergies',
          'natural allergy relief',
          'homeopathy for allergies'
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-6">
            <HealthConcernsBreadcrumb 
              categoryName="Allergies"
              categoryPath="/diseases-conditions/allergies"
            />
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Complete Allergy Treatment Guide
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Discover comprehensive homeopathic treatment protocols for all types of allergic conditions. 
                Each section includes specific remedies with potencies, detailed indications, and expected results.
              </p>
            </div>
          </div>

          {/* Content with Sidebar */}
          <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex gap-8 relative">
              {/* Sticky Sidebar Navigation */}
              <aside className="hidden lg:block w-64 shrink-0">
                <div className="sticky top-24 bg-card border border-border rounded-lg p-4 max-h-[calc(100vh-7rem)] overflow-y-auto shadow-sm">
                  <h2 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wide">Quick Navigation</h2>
                  <nav className="space-y-1">
                    {allergyTreatments.map((treatment, idx) => {
                      const sectionId = treatment.subConditionName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-').replace(/\(/g, '').replace(/\)/g, '');
                      return (
                        <a
                          key={idx}
                          href={`#${sectionId}`}
                          className="flex items-start px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <span className="line-clamp-2">{treatment.subConditionName}</span>
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Understanding Homeopathic Allergy Treatment</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p className="mb-3">
                      This comprehensive guide provides detailed homeopathic treatment protocols for 10 common allergic conditions. 
                      Each treatment includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mb-4">
                      <li><strong className="text-foreground">Homeopathic Remedies:</strong> Specific medicines with potencies (e.g., 6CH, 12CH, 6X)</li>
                      <li><strong className="text-foreground">Specific Indications:</strong> Exact symptoms each remedy addresses</li>
                      <li><strong className="text-foreground">Expected Results:</strong> What improvement to expect from each remedy</li>
                      <li><strong className="text-foreground">Biochemic Remedies:</strong> Tissue salts that support healing</li>
                      <li><strong className="text-foreground">Bio-Combinations:</strong> Pre-formulated combinations for convenience</li>
                      <li><strong className="text-foreground">Bahola Specialty Products:</strong> Ready-to-use formulations</li>
                    </ul>
                    <p className="text-sm italic">
                      Note: Always consult with a qualified homeopathic practitioner before starting any treatment. 
                      This guide is for informational purposes only.
                    </p>
                  </div>
                </div>

                {/* Treatment Tables for All Sub-Conditions */}
                <div className="space-y-6">
                  {allergyTreatments.map((treatment, idx) => (
                    <TreatmentTable key={idx} treatment={treatment} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AllergiesCategoryPage;
