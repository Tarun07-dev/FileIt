import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAa6H4j80waNDurfevmQMTEIGXYhzlP_Tc",
  authDomain: "fileit-c23a8.firebaseapp.com",
  projectId: "fileit-c23a8",
  storageBucket: "fileit-c23a8.firebasestorage.app",
  messagingSenderId: "610330119371",
  appId: "1:610330119371:web:9ac3956811b1ea4fb49f4e",
};

const app = initializeApp(firebaseConfig);

// ✅ Auth (stable in Expo)
 const auth = getAuth(app);

// ✅ Firestore
export const db = getFirestore(app);
export const libraryCollection = collection(db, "libraries");
export const fileCollection = collection(db, "files");

export  {app , auth};
