
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
  remember: z.boolean().optional(),
});

type UserType = 'customer' | 'doctor';

const Login = () => {
  const [userType, setUserType] = useState<UserType>('customer');
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('returnUrl');
  const { login, isLoading } = useERPNextAuth();
  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
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
    <PageLayout title="Sign In" description="Access your Bahola Labs account">
      <div className="max-w-md mx-auto">
        <Tabs 
          defaultValue="customer" 
          onValueChange={(value) => setUserType(value as UserType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="doctor">Healthcare Professional</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
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
                        <div className="flex justify-between items-center">
                          <FormLabel>Password</FormLabel>
                          <Link to="/forgot-password" className="text-sm text-bahola-blue-500 hover:underline">
                            Forgot Password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" {...field} disabled={isLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                            id="remember"
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormLabel htmlFor="remember" className="text-sm">
                          Remember me
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </Form>
              
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
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Login;
