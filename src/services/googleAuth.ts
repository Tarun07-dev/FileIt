import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./firebase";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

console.log("Redirect URI:", AuthSession.makeRedirectUri());
export const useGoogleAuth = () => {
  const [request, response, promptAsync] =
    Google.useIdTokenAuthRequest({
      clientId: "610330119371-ukfefd2db9qkqu3ea44ta9g23p6hbkva.apps.googleusercontent.com",
      androidClientId:"610330119371-ukfefd2db9qkqu3ea44ta9g23p6hbkva.apps.googleusercontent.com",
    });

  const signInWithGoogle = async () => {
    const result = await promptAsync();

    if (result.type !== "success") {
      throw new Error("Google sign-in cancelled");
    }

    const { id_token } = result.params;

    if (!id_token) {
      throw new Error("No Google ID token received");
    }

    const credential = GoogleAuthProvider.credential(id_token);
    return signInWithCredential(auth, credential);
  };

  return { signInWithGoogle };
};
