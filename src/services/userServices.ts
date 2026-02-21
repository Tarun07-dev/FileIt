import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { userCollectionRef } from "@/src/services/firebase";
import { User } from "firebase/auth";

/**
 * Create user document (after signup)
 */
export const createUserDocument = async (
  user: User,
  name: string,
  avatarURL: string | null
) => {
  const userRef = doc(userCollectionRef, user.uid);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email?.toLowerCase() ?? "",
      name,
      avatar: avatarURL ?? null,
      emailVerified: user.emailVerified,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    { merge: true }
  );
};

/**
 * Get user profile (after login / app start)
 */
export const getUserProfile = async (uid: string) => {
  const userRef = doc(userCollectionRef, uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) return null;

  return snap.data();
};

/**
 * Update user profile (edit profile screen)
 */
export const updateUserProfile = async (
  uid: string,
  data: Partial<{
    name: string;
    photoURL: string;
  }>
) => {
  const userRef = doc(userCollectionRef, uid);

  await updateDoc(userRef, {
    ...data,
    updatedAt: Date.now(),
  });
};
