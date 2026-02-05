import { create } from "zustand";

type AuthState = {
  currentUser: any | null;
  userLoggedIn: boolean;
  loading: boolean;

  setCurrentUser: (user: any | null) => void;
  setUserLoggedIn: (loggedIn: boolean) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  userLoggedIn: false,
  loading: true,
 
  setCurrentUser: (user) =>
    set({
      currentUser: user,
    }),

  setUserLoggedIn: (loggedIn) =>
    set({
      userLoggedIn: loggedIn,
    }),
    
  setLoading: (loading) => set({ loading }),

  logout: () =>
    set({
      currentUser: null,
      userLoggedIn: false,
    }),
}));
