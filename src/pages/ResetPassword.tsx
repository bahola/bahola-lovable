import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { swell } from '@/integrations/swell/client';
import { toast } from '@/hooks/use-toast';
import { PageLayout } from '@/components/PageLayout';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);

  // Get the reset token from URL - Swell typically uses 'key' or 'reset_key'
  const resetToken = searchParams.get('key') || searchParams.get('reset_key') || searchParams.get('token');

  useEffect(() => {
    if (!resetToken) {
      setTokenError(true);
    }
  }, [resetToken]);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!resetToken) {
      toast({
        title: 'Error',
        description: 'Invalid or missing reset token.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await swell.account.resetPassword(resetToken, values.password);
      setIsSuccess(true);
      toast({
        title: 'Password reset successful',
        description: 'You can now log in with your new password.',
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to reset password. The link may have expired.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (tokenError) {
    return (
      <PageLayout 
        title="Reset Password" 
        description="Set a new password for your account"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-red-800 mb-2">Invalid Reset Link</h2>
            <p className="text-red-700 mb-4">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link to="/forgot-password">
              <Button variant="outline" className="gap-2">
                Request New Link
              </Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout 
      title="Reset Password" 
      description="Set a new password for your account"
    >
      <div className="max-w-md mx-auto">
        {isSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-green-800 mb-2">Password Reset Complete</h2>
            <p className="text-green-700 mb-4">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
            <Link to="/login">
              <Button className="gap-2">
                Go to Login
              </Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Enter new password"
                            className="pl-10"
                          />
                        </div>
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
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirm new password"
                            className="pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Resetting...' : 'Reset Password'}
                </Button>

                <div className="text-center">
                  <Link
                    to="/login"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ResetPassword;
