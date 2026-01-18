-- Extend customer_type enum with pharmacy and student
ALTER TYPE customer_type ADD VALUE IF NOT EXISTS 'pharmacy';
ALTER TYPE customer_type ADD VALUE IF NOT EXISTS 'student';

-- Add pharmacy-specific columns
ALTER TABLE customers ADD COLUMN IF NOT EXISTS pharmacy_license text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS pharmacy_name text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS gst_number text;

-- Add student-specific columns
ALTER TABLE customers ADD COLUMN IF NOT EXISTS student_id text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS institution_name text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS course text;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS expected_graduation text;