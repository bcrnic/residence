
-- Create leads table for contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (contact form is public)
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin can read leads (protect data)
CREATE POLICY "Only authenticated users can read leads"
  ON public.leads
  FOR SELECT
  USING (auth.uid() IS NOT NULL);
