import { createContext, useContext, useEffect, useState } from 'react';
import { Auth } from '../lib/api';

const AuthContext = createContext({ authed: null, setAuthed: () => {} });

export function AuthProvider({ children }) {
  const [authed, setAuthed] = useState(null);

  useEffect(() => {
    Auth.me().then(r => setAuthed(Boolean(r.user))).catch(() => setAuthed(false));
  }, []);

  return <AuthContext.Provider value={{ authed, setAuthed }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);