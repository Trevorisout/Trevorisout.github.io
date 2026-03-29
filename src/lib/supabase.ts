import { createClient } from '@supabase/supabase-js';

// Use placeholders if environment variables are missing to prevent initialization crash.
// The user must set these in the AI Studio Secrets panel for the app to function.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qgwotwnzlggesoimotay.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnd290d256bGdnZXNvaW1vdGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NTAwNzcsImV4cCI6MjA5MDMyNjA3N30.Y8IT3wXzTbQmKPScTd1vM-vLMKxsMMBLa7DOHm32vio';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('CRITICAL: Supabase environment variables are missing! Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your Secrets panel.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
