
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
    console.log('Registration submitted');
  };
  
  return (
    <PageLayout title="Create an Account" description="Join Bahola Labs for a better shopping experience">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Checkbox id="terms" className="mt-1" required />
                  <Label htmlFor="terms" className="ml-2 text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-bahola-blue-500 hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-bahola-blue-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                
                <div className="flex items-start">
                  <Checkbox id="newsletter" className="mt-1" />
                  <Label htmlFor="newsletter" className="ml-2 text-sm">
                    Subscribe to our newsletter for the latest products, promotions, and health tips
                  </Label>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            
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
      </div>
    </PageLayout>
  );
};

export default Register;
