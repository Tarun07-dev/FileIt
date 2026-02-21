
import { useGoogleAuth } from "@/src/services/googleAuth";
import { TouchableOpacity, Text, View, Image } from "react-native";
import Toast from "react-native-toast-message";


export default function GoogleAuthButton() {

   const { signInWithGoogle } = useGoogleAuth();

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle();

    Toast.show({
      type: "success",
      text1: "Signed in with Google",
    });
  } catch (e: any) {
    console.log("Google Sign-In error:", e);
    Toast.show({
      type: "error",
      text1: "Google Sign-In failed",
      text2: e.message,
    });
  }
};

  return (
    <TouchableOpacity
      onPress= {handleGoogleSignIn}
      activeOpacity={0.8}
      className={`flex-row items-center justify-center border border-gray-300 rounded-xl py-3`}
    >
      {/* Google Logo */}
      <Image
        source={require("@/assets/images/google.png")}
        style={{ width: 40, height: 40, marginRight: 10 }}
        resizeMode="contain"
      />

      <Text className="text-xl font-medium text-gray-800">
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
}
