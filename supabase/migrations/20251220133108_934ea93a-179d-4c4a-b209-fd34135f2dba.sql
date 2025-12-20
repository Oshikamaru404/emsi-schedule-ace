-- Create students table for simple authentication via student number
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_number TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  class_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read students (for login verification)
CREATE POLICY "Students are publicly readable for login" 
ON public.students 
FOR SELECT 
USING (true);

-- Insert initial student data
INSERT INTO public.students (student_number, full_name, class_name) VALUES
('F-2025-000940', 'Amine Taibi', '2AP G2');