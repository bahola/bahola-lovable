import React from 'react';
import { SubConditionTreatment } from '@/data/health-concerns/types';

interface TreatmentTableProps {
  treatment: SubConditionTreatment;
}

export const TreatmentTable: React.FC<TreatmentTableProps> = ({ treatment }) => {
  const sectionId = treatment.subConditionName.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  
  return (
    <div id={sectionId} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mb-8 scroll-mt-24">
      {/* Sub-condition header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-5">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground">{treatment.subConditionName}</h2>
      </div>
      
      {/* Treatment details */}
      <div className="p-6">
        {/* Biochemic Remedies, Bio-Combination, Bahola Specialty - MOVED TO TOP */}
        <div className="grid md:grid-cols-3 gap-4 bg-accent/30 rounded-lg p-5 mb-6 border border-border">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Biochemic Remedies</h3>
            {treatment.biochemicRemedies.map((bio, idx) => (
              <p key={idx} className="text-base text-foreground font-medium">
                {bio.name} <span className="text-primary font-bold">{bio.potency}</span>
              </p>
            ))}
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Bio-Combination</h3>
            <p className="text-base text-foreground font-medium">{treatment.bioCombination}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">Bahola Specialty</h3>
            <p className="text-base font-bold text-primary">
              {treatment.baholaSpecialty || '—'}
            </p>
          </div>
        </div>

        {/* Homeopathic Remedies Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-foreground">Homeopathic Remedies</h3>
          <div className="grid grid-cols-1 gap-4">
            {treatment.remedies.map((remedy, idx) => (
              <div 
                key={idx} 
                className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-foreground">{remedy.name}</span>
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                      {remedy.potency}
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Specific Indication:
                    </span>
                    <p className="text-sm text-foreground mt-1">{remedy.specificIndication}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Expected Result:
                    </span>
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium mt-1">
                      {remedy.expectedResult}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
