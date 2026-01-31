-- Add new columns to profiles table
alter table profiles 
add column if not exists age text,
add column if not exists gender text,
add column if not exists blood_type text,
add column if not exists phone text,
add column if not exists address text,
add column if not exists medical_history text[]; -- Array of text for tags

-- Update the handle_new_user function if you have one, or ensure RLS allows updates
-- (RLS policies for 'update' were already set in the previous script to allow users to update their own rows)
