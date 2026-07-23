import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
// Wir importieren den Standard-Supabase-Client
import supabase from "@/lib/supabaseConnection";

type UsernameContextType = {
  username: string;
  setUsername: (name: string) => void;
  token: string | null;
  userId: string | null;
};

export const UsernameContext = createContext<UsernameContextType | null>(null);

export function useUsernameContext() {
  const context = useContext(UsernameContext);
  if (!context) throw new Error("useUsernameContext muss im Provider liegen");
  return context;
}

export function UsernameProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem("username") || "";
  });

  // NEU: Zustände für Token und User-ID
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function setupAnonymousAuth() {
      // 1. Prüfen, ob der Nutzer bereits eine aktive anonyme Sitzung hat
      let {
        data: { session },
      } = await supabase.auth.getSession();

      // 2. Wenn nicht, loggen wir ihn anonym im Hintergrund ein
      if (!session) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (error) {
          console.error("Fehler beim anonymen Login:", error.message);
          return;
        }
        session = data.session;
      }

      // 3. Token und User-ID im State speichern, damit die App sie nutzen kann
      if (session) {
        setToken(session.access_token);
        setUserId(session.user.id);
      }
    }

    setupAnonymousAuth();
  }, []);

  return (
    <UsernameContext.Provider value={{ username, setUsername, token, userId }}>
      {children}
    </UsernameContext.Provider>
  );
}
