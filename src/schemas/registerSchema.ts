
import { z } from 'zod';

// Define the base schema for registration without refine
export const baseFieldSchema = z.object({
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
export const baseFormSchema = baseFieldSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Additional fields for doctors
export const doctorFieldSchema = baseFieldSchema.extend({
  medicalLicense: z.string().min(5, { message: 'Medical license number is required.' }),
  specialization: z.string().min(2, { message: 'Specialization is required.' }),
  clinic: z.string().optional(),
  yearsOfPractice: z.string().optional(),
});

export const doctorFormSchema = doctorFieldSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// User type enum
export type UserType = 'customer' | 'doctor';

// Type for the form data
export type CustomerFormData = z.infer<typeof baseFormSchema>;
export type DoctorFormData = z.infer<typeof doctorFormSchema>;
export type RegisterFormData = CustomerFormData | DoctorFormData;
