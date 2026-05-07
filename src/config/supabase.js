const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client untuk public operations
const supabase = createClient(supabaseUrl, supabaseKey);

// Client untuk admin operations (gunakan service role key)
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

module.exports = { supabase, supabaseAdmin };
