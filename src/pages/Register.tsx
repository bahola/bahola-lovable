
import React, { useState, useEffect } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerRegistrationForm } from '@/components/register/CustomerRegistrationForm';
import { DoctorRegistrationForm } from '@/components/register/DoctorRegistrationForm';
import { useRegisterSubmit } from '@/utils/registerUtils';
import { UserType } from '@/schemas/registerSchema';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialUserType = searchParams.get('type') === 'doctor' ? 'doctor' : 'customer';
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const { handleSubmit } = useRegisterSubmit();

  // Debug logging to see what's happening
  useEffect(() => {
    console.log('Register page loaded with params:', searchParams.get('type'));
    console.log('Initial user type set to:', initialUserType);
  }, [searchParams, initialUserType]);
  
  return (
    <PageLayout title="Create an Account" description="Join Bahola Labs for a better shopping experience">
      <div className="max-w-3xl mx-auto mb-10">
        <Tabs 
          defaultValue={initialUserType}
          value={userType} 
          onValueChange={(value) => setUserType(value as UserType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Customer Account</TabsTrigger>
            <TabsTrigger value="doctor">Healthcare Professional</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <TabsContent value="customer">
                <CustomerRegistrationForm 
                  onSubmit={(values) => handleSubmit(values, 'customer')} 
                />
              </TabsContent>
              
              <TabsContent value="doctor">
                <DoctorRegistrationForm 
                  onSubmit={(values) => handleSubmit(values, 'doctor')} 
                />
              </TabsContent>
              
              <div className="mt-6 text-center">
                <p className="text-bahola-neutral-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-bahola-blue-500 font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Register;
