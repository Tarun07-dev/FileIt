import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => auth.signOut();

export const forgotPassword = async (email: string) => {
  if (!email?.trim()) {
    throw new Error("Please enter your email");
  }

  await sendPasswordResetEmail(auth, email.trim());
};