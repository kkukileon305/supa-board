import { Session } from '@supabase/supabase-js';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

type UserStore = {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
};

const useUser = create(
  devtools<UserStore>(set => ({
    session: null,
    setSession: session => set({ session }),
    clearSession: () => set({ session: null }),
  }))
);

export default useUser;
