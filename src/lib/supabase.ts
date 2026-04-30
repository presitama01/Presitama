import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wnfvztqwtidhyjczaira.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZnZ6dHF3dGlkaHlqY3phaXJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0NzUyMzQsImV4cCI6MjA5MzA1MTIzNH0.5cJzHQwnA9sOYNE6XplKqzLyBDh6mjIOUTooTf4_Hs0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
