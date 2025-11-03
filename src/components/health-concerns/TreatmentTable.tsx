import React from 'react';
import { SubConditionTreatment } from '@/data/health-concerns/types';

interface TreatmentTableProps {
  treatment: SubConditionTreatment;
}

export const TreatmentTable: React.FC<TreatmentTableProps> = ({ treatment }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mb-8">
      {/* Sub-condition header */}
      <div className="bg-primary text-primary-foreground px-6 py-4">
        <h3 className="text-xl font-semibold">{treatment.subConditionName}</h3>
      </div>
      
      {/* Treatment details */}
      <div className="p-6">
        {/* Homeopathic Remedies Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Homeopathic Remedies</h4>
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

        {/* Biochemic Remedies, Bio-Combination, Bahola Specialty */}
        <div className="grid md:grid-cols-3 gap-4 bg-muted/50 rounded-lg p-4">
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2">Biochemic Remedies</h5>
            {treatment.biochemicRemedies.map((bio, idx) => (
              <p key={idx} className="text-sm text-foreground">
                {bio.name} <span className="text-primary font-medium">{bio.potency}</span>
              </p>
            ))}
          </div>
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2">Bio-Combination</h5>
            <p className="text-sm text-foreground">{treatment.bioCombination}</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2">Bahola Specialty</h5>
            <p className="text-sm font-semibold text-primary">
              {treatment.baholaSpecialty || '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
