import React from 'react';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { entCareTreatments } from '@/data/health-concerns/entCareTreatments';
import { TreatmentTable } from '@/components/health-concerns/TreatmentTable';
import { SEO } from '@/components/SEO';

const ENTCare = () => {
  return (
    <>
      <SEO
        title="ENT Care Treatment Guide - Ear, Nose & Throat Solutions"
        description="Comprehensive homeopathic treatment guide for ear, nose, and throat conditions including tinnitus, ear infections, nasal polyps, hoarseness, tonsillitis, sinusitis, earache, voice strain, blocked ears, and recurrent throat infections with detailed remedies and potencies."
        keywords={[
          'ENT care homeopathy',
          'tinnitus treatment',
          'ear infection remedies',
          'nasal polyps treatment',
          'hoarseness remedies',
          'tonsillitis homeopathy',
          'chronic sinusitis treatment',
          'earache children',
          'voice strain remedies',
          'blocked ears treatment',
          'throat infection remedies',
          'biochemic remedies ENT',
          'natural ENT care'
        ]}
      />
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-6">
            <HealthConcernsBreadcrumb 
              categoryName="ENT Care"
              categoryPath="/diseases-conditions/ent-care"
            />
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Complete ENT Care Treatment Guide
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Natural homeopathic treatment protocols for ear, nose, and throat conditions. 
                Each section includes specific remedies with potencies, detailed indications, and expected outcomes.
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="bg-card border-y border-border sticky top-0 z-10 shadow-sm">
            <div className="container mx-auto px-4 py-4 max-w-6xl">
              <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Quick Navigation</h2>
              <div className="flex flex-wrap gap-2">
                {entCareTreatments.map((treatment, idx) => {
                  const sectionId = treatment.subConditionName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-').replace(/\(/g, '').replace(/\)/g, '');
                  return (
                    <a
                      key={idx}
                      href={`#${sectionId}`}
                      className="px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md text-sm font-medium transition-colors"
                    >
                      {treatment.subConditionName}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Introduction Section */}
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Understanding Homeopathic ENT Care</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p className="mb-3">
                  This comprehensive guide provides detailed homeopathic treatment protocols for ear, nose, and throat conditions. 
                  Each treatment protocol includes:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li><strong className="text-foreground">Homeopathic Remedies:</strong> Specific medicines with potencies (Q, 6CH, 12CH, 6X, etc.)</li>
                  <li><strong className="text-foreground">Specific Indications:</strong> Exact symptoms and conditions each remedy addresses</li>
                  <li><strong className="text-foreground">Expected Results:</strong> What improvement to expect from each remedy</li>
                  <li><strong className="text-foreground">Biochemic Remedies:</strong> Tissue salts that support ENT health</li>
                  <li><strong className="text-foreground">Bio-Combinations:</strong> Pre-formulated combinations for convenience</li>
                  <li><strong className="text-foreground">Bahola Specialty Products:</strong> Ready-to-use ENT care formulations</li>
                </ul>
                <p className="text-sm italic border-l-4 border-primary pl-4 py-2 bg-primary/5 rounded">
                  <strong>Important:</strong> Always consult with qualified healthcare practitioners before starting any treatment protocol. 
                  This guide is for informational purposes only.
                </p>
              </div>
            </div>

            {/* Treatment Tables for All Sub-Conditions */}
            <div className="space-y-6">
              {entCareTreatments.map((treatment, idx) => (
                <TreatmentTable key={idx} treatment={treatment} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ENTCare;
