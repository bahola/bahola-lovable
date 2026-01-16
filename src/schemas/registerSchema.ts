import { z } from 'zod';

// User type enum - 4 customer types in Swell
export type UserType = 'customer' | 'doctor' | 'pharmacy' | 'student';

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

// Additional fields for pharmacy
export const pharmacyFieldSchema = baseFieldSchema.extend({
  pharmacyLicense: z.string().min(5, { message: 'Pharmacy license number is required.' }),
  pharmacyName: z.string().min(2, { message: 'Pharmacy name is required.' }),
  gstNumber: z.string().optional(),
  address: z.string().min(10, { message: 'Address is required.' }),
});

export const pharmacyFormSchema = pharmacyFieldSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Additional fields for students
export const studentFieldSchema = baseFieldSchema.extend({
  studentId: z.string().min(3, { message: 'Student ID is required.' }),
  institutionName: z.string().min(3, { message: 'Institution name is required.' }),
  course: z.string().min(2, { message: 'Course name is required.' }),
  expectedGraduation: z.string().optional(),
});

export const studentFormSchema = studentFieldSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Type for the form data
export type CustomerFormData = z.infer<typeof baseFormSchema>;
export type DoctorFormData = z.infer<typeof doctorFormSchema>;
export type PharmacyFormData = z.infer<typeof pharmacyFormSchema>;
export type StudentFormData = z.infer<typeof studentFormSchema>;
export type RegisterFormData = CustomerFormData | DoctorFormData | PharmacyFormData | StudentFormData;
