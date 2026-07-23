import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 1. Diese Funktion nutzt du überall dort, wo du eingeloggt Daten abfragen willst
export const getSupabase = (token?: string) => {
  if (!token) {
    return createClient<Database>(supabaseUrl, supabaseKey);
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

// 2. Ein Standard-Client für Orte, an denen KEIN Login benötigt wird (z.B. Landingpage)
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// 3. Nur EIN default-export am Ende der Datei
export default supabase;
