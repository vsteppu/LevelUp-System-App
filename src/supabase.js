import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
const supabaseAdmin = createClient(supabaseUrl, import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY);

export { supabase, supabaseAdmin }
