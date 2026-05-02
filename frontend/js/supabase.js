/* ============================================ */
/* SUPABASE CONFIGURATION - NEXTSTAGE
/* ============================================ */

// CDN alternativa
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Credenciais do projeto Supabase
const SUPABASE_URL = "https://txymotoejmpnyhwdekwo.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4eW1vdG9lam1wbnlod2Rla3dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5MjA0NTQsImV4cCI6MjA5MjQ5NjQ1NH0.YytgyKRFmqQjM4X-EreT02ZdHPqrpNkn7qG71NFd_js";

// Criar cliente do Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
