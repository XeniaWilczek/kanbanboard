import { createContext, useContext, useState, type ReactNode } from "react";

type UsernameContextType = {
  username: string;
  setUsername: (name: string) => void;
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

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}
