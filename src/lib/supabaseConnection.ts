import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 1. Standard-API-Key (VITE_SUPABASE_KEY) in das Objekt einfügen
const customHeaders: Record<string, string> = {
  apikey: supabaseKey,
};

// 2. globalen Client erstellen
const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  global: {
    headers: customHeaders,
  },
});

// 3. Authorization-Token aktualisieren
export const getSupabase = (token?: string) => {
  if (token) {
    customHeaders["Authorization"] = `Bearer ${token}`;
  } else {
    delete customHeaders["Authorization"];
  }
  return supabase;
};

export default supabase;
