import React from 'react';
import { SEO } from '@/components/SEO';
import { HealthConcernsBreadcrumb } from '@/components/health-concerns/HealthConcernsBreadcrumb';
import { TreatmentTable } from '@/components/health-concerns/TreatmentTable';
import { infectiousDiseasesTreatments } from '@/data/health-concerns/infectiousDiseasesTreatments';

const InfectiousDiseasesPage = () => {
  return (
    <>
      <SEO
        title="Homeopathic Treatment for Infectious Diseases & Fever - Bahola Labs"
        description="Discover natural homeopathic remedies for viral fever, influenza, dengue-like symptoms, measles, and post-operative recovery. Expert protocols for infection prevention and fever management."
        keywords={['infectious diseases homeopathy', 'fever treatment', 'viral fever remedies', 'dengue support', 'measles treatment', 'post-operative care', 'infection prevention', 'influenza remedies', 'homeopathic fever care']}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <HealthConcernsBreadcrumb 
          categoryName="Infectious Diseases & Fever"
        />

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Homeopathic Treatment for Infectious Diseases & Fever
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive homeopathic protocols to support recovery from viral infections, fevers, and inflammatory conditions. Natural remedies that work alongside the body's healing processes.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-card border border-border rounded-lg p-6 mb-12 sticky top-20 z-10 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-foreground">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {infectiousDiseasesTreatments.map((treatment) => {
              const sectionId = treatment.subConditionName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-').replace(/\(/g, '').replace(/\)/g, '');
              return (
                <a
                  key={sectionId}
                  href={`#${sectionId}`}
                  className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors"
                >
                  {treatment.subConditionName}
                </a>
              );
            })}
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-accent/20 rounded-lg p-6 mb-12 border border-border">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Understanding Our Treatment Protocols</h2>
          <div className="space-y-3 text-foreground">
            <p>
              Each condition includes a comprehensive treatment approach:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Homeopathic Remedies:</strong> Constitutional medicines selected based on specific symptoms and individual response patterns</li>
              <li><strong>Biochemic Remedies:</strong> Tissue salts that support cellular healing and mineral balance</li>
              <li><strong>Bio-Combinations:</strong> Synergistic formulations designed for specific infectious conditions</li>
              <li><strong>Bahola Specialty Products:</strong> Proprietary formulations for targeted fever and infection support</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>Note:</strong> These protocols are supportive in nature and should be used under professional guidance. For serious infections, always consult with a qualified healthcare provider.
            </p>
          </div>
        </div>

        {/* Treatment Tables */}
        <div className="space-y-8">
          {infectiousDiseasesTreatments.map((treatment, index) => (
            <TreatmentTable key={index} treatment={treatment} />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 bg-muted/50 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-bold mb-2 text-foreground">Important Disclaimer</h3>
          <p className="text-sm text-muted-foreground">
            The information provided is for educational purposes only. Homeopathic remedies work best when individually prescribed. 
            For acute or severe conditions, especially in children and elderly patients, please consult a qualified homeopathic physician or healthcare provider. 
            Always seek immediate medical attention for high fevers, signs of dehydration, or worsening symptoms.
          </p>
        </div>
      </div>
    </>
  );
};

export default InfectiousDiseasesPage;
