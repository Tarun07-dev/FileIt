// src/hooks/useAuthListener.ts
import { auth } from "@/src/services/firebase";
import { useAuthStore } from "@/src/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export const useAuthListener = () => {
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setUserLoggedIn = useAuthStore((s) => s.setUserLoggedIn);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      console.log("🔥 AUTH STATE:", user?.email ?? "LOGGED OUT");
      if(user){
        setCurrentUser({...user});
        setUserLoggedIn(true);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
};
