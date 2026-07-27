import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `isSupabaseConfigured` lets the whole app degrade gracefully when the
 * environment variables are not present (e.g. first local run before the
 * developer creates a Supabase project). Instead of crashing, pages fall
 * back to demo data and forms show a friendly configuration message.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('YOUR_PROJECT_REF') &&
    supabaseAnonKey !== 'your-anon-public-key'
);

/**
 * A single shared Supabase client instance. When credentials are missing we
 * still export a client built with harmless placeholder values so imports do
 * not throw; guard real network calls behind `isSupabaseConfigured`.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
