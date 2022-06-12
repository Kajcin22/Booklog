import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../lib/supabase_client';

const initialState = {
  session: null,
};

const AuthContext = createContext(initialState);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const value = useMemo(
    () => ({
      session,
      userId: session?.user?.id,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error(
      'You probably forget to wrap your components with AuthProvider',
    );
  }
  return context;
};
