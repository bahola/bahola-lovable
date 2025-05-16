
import React, { useState } from 'react';
import { PageLayout } from '@/components/PageLayout';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

// Define the base schema for registration without refine
const baseFieldSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .refine(
      (password) => /[A-Z]/.test(password),
      { message: 'Password must contain at least one uppercase letter.' }
    )
    .refine(
      (password) => /[a-z]/.test(password),
      { message: 'Password must contain at least one lowercase letter.' }
    )
    .refine(
      (password) => /[0-9]/.test(password),
      { message: 'Password must contain at least one number.' }
    ),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
  newsletter: z.boolean().optional(),
});

// Define the base schema for registration with password confirmation check
const baseFormSchema = baseFieldSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Additional fields for doctors
const doctorFieldSchema = baseFieldSchema.extend({
  medicalLicense: z.string().min(5, { message: 'Medical license number is required.' }),
  specialization: z.string().min(2, { message: 'Specialization is required.' }),
  clinic: z.string().optional(),
  yearsOfPractice: z.string().optional(),
});

const doctorFormSchema = doctorFieldSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// User type enum
type UserType = 'customer' | 'doctor';

const Register = () => {
  const [userType, setUserType] = useState<UserType>('customer');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize form with the appropriate schema based on user type
  const form = useForm<z.infer<typeof baseFormSchema> | z.infer<typeof doctorFormSchema>>({
    resolver: zodResolver(userType === 'customer' ? baseFormSchema : doctorFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
      newsletter: false,
      ...(userType === 'doctor' ? {
        medicalLicense: '',
        specialization: '',
        clinic: '',
        yearsOfPractice: '',
      } : {}),
    },
  });
  
  const handleSubmit = async (values: z.infer<typeof baseFormSchema> | z.infer<typeof doctorFormSchema>) => {
    try {
      // Here we would typically handle registration with Supabase
      // For now, we'll just show a success toast
      console.log('Registration submitted for', userType, values);
      
      // Show success notification
      toast({
        title: "Registration Successful",
        description: `Thank you for registering as a ${userType === 'doctor' ? 'healthcare professional' : 'customer'}.`,
        duration: 5000,
      });
      
      // In a real implementation, you would register with Supabase here
      // const { data, error } = await supabase.auth.signUp({
      //   email: values.email,
      //   password: values.password,
      //   options: {
      //     data: {
      //       firstName: values.firstName,
      //       lastName: values.lastName,
      //       userType: userType,
      //       ...(userType === 'doctor' ? {
      //         medicalLicense: (values as any).medicalLicense,
      //         specialization: (values as any).specialization,
      //       } : {})
      //     }
      //   }
      // });
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was a problem with your registration. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  return (
    <PageLayout title="Create an Account" description="Join Bahola Labs for a better shopping experience">
      <div className="max-w-3xl mx-auto mb-10">
        <Tabs 
          defaultValue="customer" 
          onValueChange={(value) => setUserType(value as UserType)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="customer">Customer Account</TabsTrigger>
            <TabsTrigger value="doctor">Healthcare Professional</TabsTrigger>
          </TabsList>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Doctor specific fields */}
                  <TabsContent value="doctor" className="space-y-4 mt-0 border p-4 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Professional Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="medicalLicense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medical License Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specialization</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="clinic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Clinic/Hospital Name (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="yearsOfPractice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Years of Practice (Optional)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                  
                  {/* Password fields for all users */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Terms and Newsletter */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="terms"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="terms" className="text-sm">
                              I agree to the{' '}
                              <Link to="/terms" className="text-bahola-blue-500 hover:underline">
                                Terms & Conditions
                              </Link>{' '}
                              and{' '}
                              <Link to="/privacy" className="text-bahola-blue-500 hover:underline">
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="newsletter"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                              id="newsletter"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel htmlFor="newsletter" className="text-sm">
                              Subscribe to our newsletter for the latest products, promotions, and health tips
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Create {userType === 'doctor' ? 'Professional' : 'Customer'} Account
                  </Button>
                </form>
              </Form>
              
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
