import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseUrl = 'https://vnkxfxnjpplrawddvygg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZua3hmeG5qcHBscmF3ZGR2eWdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNTQ3NjcsImV4cCI6MjA2MzYzMDc2N30.ATzmVCN2T7M-xXdMxZhZAEATSdSKt3nB57up8DYfRcU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);