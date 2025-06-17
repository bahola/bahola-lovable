
-- Check if the columns already exist and add them if they don't
DO $$ 
BEGIN
    -- Add verification_status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='verification_status') THEN
        ALTER TABLE customers ADD COLUMN verification_status text DEFAULT 'approved';
    END IF;
    
    -- Add medical_license column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='medical_license') THEN
        ALTER TABLE customers ADD COLUMN medical_license text;
    END IF;
    
    -- Add specialization column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='specialization') THEN
        ALTER TABLE customers ADD COLUMN specialization text;
    END IF;
    
    -- Add clinic column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='clinic') THEN
        ALTER TABLE customers ADD COLUMN clinic text;
    END IF;
    
    -- Add years_of_practice column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='customers' AND column_name='years_of_practice') THEN
        ALTER TABLE customers ADD COLUMN years_of_practice integer;
    END IF;
END $$;

-- Create index for verification status if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_customers_verification_status ON customers(verification_status);
