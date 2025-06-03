
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useERPNextAuth } from '@/contexts/ERPNextAuthContext';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type UserType = 'customer' | 'doctor';

const Register = () => {
  const [searchParams] = useSearchParams();
  const initialUserType = searchParams.get('type') === 'doctor' ? 'doctor' : 'customer';
  const [userType, setUserType] = useState<UserType>(initialUserType);
  const { toast } = useToast();
  const navigate = useNavigate();
  const returnUrl = searchParams.get('returnUrl');
  const { login, isLoading } = useERPNextAuth();
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      await login(values.email, values.password);
      
      toast({
        title: "Login Successful",
        description: `Welcome back! You're logged in as a ${userType === 'doctor' ? 'healthcare professional' : 'customer'}.`,
        duration: 3000,
      });
      
      // Redirect to return URL or home page
      navigate(returnUrl || '/');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid email or password. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  return (
    <PageLayout title="ERPNext Login" description="Access your Bahola Labs account via ERPNext">
      <div className="max-w-md mx-auto mb-10">
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
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-2">Customer Login</h2>
                  <p className="text-bahola-neutral-600">Sign in to your customer account</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="doctor">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-bahola-navy-950 mb-2">Healthcare Professional Login</h2>
                  <p className="text-bahola-neutral-600">Sign in to your professional account</p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isLoading} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <div className="mt-6 text-center">
                <p className="text-bahola-neutral-600">
                  Need an account?{' '}
                  <Link to="/login" className="text-bahola-blue-500 font-medium hover:underline">
                    Contact Administrator
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
