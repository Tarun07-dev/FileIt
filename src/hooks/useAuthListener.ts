// src/hooks/useAuthListener.ts
import { auth } from "@/src/services/firebase";
import { useAuthStore } from "@/src/store/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { getUserProfile } from "@/src/services/userServices";

export const useAuthListener = () => {
  const setCurrentUser = useAuthStore((s) => s.setCurrentUser);
  const setUserLoggedIn = useAuthStore((s) => s.setUserLoggedIn);
  const setLoading = useAuthStore((s) => s.setLoading);
  const setProfile = useAuthStore((s) => s.setProfile);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      console.log("🔥 AUTH STATE:", user?.email ?? "LOGGED OUT");
      if(user){
        setCurrentUser({...user});
        setUserLoggedIn(true);

        const profile = await getUserProfile(user.uid);
        setProfile(profile);
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
        setProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);
};
