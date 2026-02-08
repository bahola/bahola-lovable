

# Expand Approval Card to Handle Doctors, Pharmacy & Students

## What Changes
The approval card currently only shows doctor applications. It will be updated to fetch and display all three professional types (Doctor, Pharmacy, Student), show type-specific details for each, and assign the correct Swell customer group on approval.

## Changes

### File: `src/components/admin/DoctorApprovalCard.tsx`

**1. Update the data interface** to include `customer_type` and all type-specific fields:
- `customer_type`: `'doctor' | 'pharmacy' | 'student'`
- Pharmacy fields: `pharmacy_license`, `pharmacy_name`, `gst_number`
- Student fields: `student_id`, `institution_name`, `course`, `expected_graduation`
- Make `medical_license` and `specialization` optional (only doctors have them)

**2. Update the Supabase query** to fetch all three types:
- Change `.eq('customer_type', 'doctor')` to `.in('customer_type', ['doctor', 'pharmacy', 'student'])`
- Add pharmacy/student columns to the select
- Remove the filter that requires `medical_license` and `specialization` (pharmacy/students won't have these)

**3. Fix the Swell group assignment** to use the actual `customer_type` instead of hardcoded `'doctor'`:
- Change `group: 'doctor'` to `group: professional.customer_type`

**4. Update the UI** to show type-specific details per card:
- Add a colored badge showing the type (Doctor / Pharmacy / Student)
- Conditionally render fields based on `customer_type`:
  - **Doctor**: Medical License, Specialization, Clinic, Years of Practice
  - **Pharmacy**: Pharmacy License, Pharmacy Name, GST Number
  - **Student**: Student ID, Institution, Course, Expected Graduation

**5. Update labels and messages**:
- Title: "Pending Professional Approvals"
- Empty state: "No pending professional applications"
- Toast messages: dynamically use the customer type (e.g., "Pharmacy approved")

## No Other Files Need Changes
The edge function already accepts any group value and looks it up dynamically in Swell. The registration flow already skips Swell creation for all three types.
