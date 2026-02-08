import React from 'react';

interface PendingProfessional {
  customer_type: 'doctor' | 'pharmacy' | 'student';
  medical_license?: string;
  specialization?: string;
  clinic?: string;
  years_of_practice?: number;
  pharmacy_license?: string;
  pharmacy_name?: string;
  gst_number?: string;
  student_id?: string;
  institution_name?: string;
  course?: string;
  expected_graduation?: string;
}

export const ProfessionalDetailsFields: React.FC<{ professional: PendingProfessional }> = ({ professional }) => {
  if (professional.customer_type === 'doctor') {
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        {professional.medical_license && (
          <div>
            <span className="font-medium">Medical License:</span>
            <p className="text-muted-foreground">{professional.medical_license}</p>
          </div>
        )}
        {professional.specialization && (
          <div>
            <span className="font-medium">Specialization:</span>
            <p className="text-muted-foreground">{professional.specialization}</p>
          </div>
        )}
        {professional.clinic && (
          <div>
            <span className="font-medium">Clinic/Hospital:</span>
            <p className="text-muted-foreground">{professional.clinic}</p>
          </div>
        )}
        {professional.years_of_practice && (
          <div>
            <span className="font-medium">Years of Practice:</span>
            <p className="text-muted-foreground">{professional.years_of_practice}</p>
          </div>
        )}
      </div>
    );
  }

  if (professional.customer_type === 'pharmacy') {
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        {professional.pharmacy_license && (
          <div>
            <span className="font-medium">Pharmacy License:</span>
            <p className="text-muted-foreground">{professional.pharmacy_license}</p>
          </div>
        )}
        {professional.pharmacy_name && (
          <div>
            <span className="font-medium">Pharmacy Name:</span>
            <p className="text-muted-foreground">{professional.pharmacy_name}</p>
          </div>
        )}
        {professional.gst_number && (
          <div>
            <span className="font-medium">GST Number:</span>
            <p className="text-muted-foreground">{professional.gst_number}</p>
          </div>
        )}
      </div>
    );
  }

  if (professional.customer_type === 'student') {
    return (
      <div className="grid grid-cols-2 gap-4 text-sm">
        {professional.student_id && (
          <div>
            <span className="font-medium">Student ID:</span>
            <p className="text-muted-foreground">{professional.student_id}</p>
          </div>
        )}
        {professional.institution_name && (
          <div>
            <span className="font-medium">Institution:</span>
            <p className="text-muted-foreground">{professional.institution_name}</p>
          </div>
        )}
        {professional.course && (
          <div>
            <span className="font-medium">Course:</span>
            <p className="text-muted-foreground">{professional.course}</p>
          </div>
        )}
        {professional.expected_graduation && (
          <div>
            <span className="font-medium">Expected Graduation:</span>
            <p className="text-muted-foreground">{professional.expected_graduation}</p>
          </div>
        )}
      </div>
    );
  }

  return null;
};
