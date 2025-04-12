
import React from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const Login = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login submitted');
  };
  
  return (
    <PageLayout title="Sign In" description="Access your Bahola Labs account">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-bahola-blue-500 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              
              <div className="flex items-center">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="ml-2">Remember me</Label>
              </div>
              
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-bahola-neutral-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-bahola-blue-500 font-medium hover:underline">
                  Create One
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
