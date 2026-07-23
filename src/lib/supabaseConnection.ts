import type { Database } from "@/types/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// 1. NEU: Wir packen den Standard-API-Key (VITE_SUPABASE_KEY) fest in das Objekt!
const customHeaders: Record<string, string> = {
  apikey: supabaseKey, // <-- Das repariert den "No API key found"-Fehler!
};

// 2. Wir erstellen NUR EINEN EINZIGEN globalen Client
const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  global: {
    headers: customHeaders,
  },
});

// 3. Diese Funktion aktualisiert NUR das Authorization-Token (den Ausweis des Nutzers)
export const getSupabase = (token?: string) => {
  if (token) {
    customHeaders["Authorization"] = `Bearer ${token}`;
  } else {
    delete customHeaders["Authorization"];
  }
  return supabase;
};

export default supabase;
