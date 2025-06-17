
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';

interface UserVerificationData {
  verificationStatus: string | null;
  customerType: string | null;
  isLoading: boolean;
  medicalLicense?: string | null;
  specialization?: string | null;
  clinic?: string | null;
  yearsOfPractice?: number | null;
}

export const useUserVerification = (): UserVerificationData => {
  const { user } = useERPNextAuth();
  const [verificationData, setVerificationData] = useState<UserVerificationData>({
    verificationStatus: null,
    customerType: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      if (!user?.email) {
        setVerificationData({
          verificationStatus: null,
          customerType: null,
          isLoading: false,
        });
        return;
      }

      try {
        const { data, error } = await supabase
          .from('customers')
          .select('verification_status, customer_type, medical_license, specialization, clinic, years_of_practice')
          .eq('email', user.email)
          .maybeSingle();

        if (error) {
          console.error('Error fetching verification status:', error);
          setVerificationData({
            verificationStatus: null,
            customerType: null,
            isLoading: false,
          });
          return;
        }

        if (data) {
          setVerificationData({
            verificationStatus: data.verification_status,
            customerType: data.customer_type,
            medicalLicense: data.medical_license,
            specialization: data.specialization,
            clinic: data.clinic,
            yearsOfPractice: data.years_of_practice,
            isLoading: false,
          });
        } else {
          setVerificationData({
            verificationStatus: null,
            customerType: null,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching verification status:', error);
        setVerificationData({
          verificationStatus: null,
          customerType: null,
          isLoading: false,
        });
      }
    };

    fetchVerificationStatus();
  }, [user?.email]);

  return verificationData;
};
