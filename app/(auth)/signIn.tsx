// app/(auth)/signIn.tsx
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { doSignInWithEmailAndPassword, forgotPassword } from "@/src/services/auth";
import { useAuthStore } from "@/src/store/authStore";
import GoogleAuthButton from "@/src/components/otherComponents/GoogleAuthButton";

export default function SignInScreen() {
  const { userLoggedIn } = useAuthStore();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleForgotPassword = async () => {
  try {
    await forgotPassword(email);

    Toast.show({
      type: "success",
      text1: "Email sent",
      text2: "Check your inbox to reset your password",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text1: "Reset failed",
      text2: error.message,
    });
  }
};

  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Email and password required",
      });
      return;
    }

    try {
      await doSignInWithEmailAndPassword(email.trim(), password);
      // 🔥 No navigation here!
      // Auth listener will handle redirect
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.message,
      });
    }
  };
  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/(drawer)");
    }
  }, [userLoggedIn]);

  return (
    <View className="flex-1 justify-end bg-black/40">
      <View className="bg-white rounded-t-3xl px-6 pt-4 pb-8 h-[80%]">

        {/* Drag handle */}
        <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-4" />

        {/* Header */}
        <View className="relative flex-row items-center mb-6">

          <Text className="flex-1 text-center text-2xl font-bold">
            Sign In
          </Text>
        </View>

        {/* Avatar */}
        <View className="items-center mb-6">
          <Image
            source={
              avatar
                ? { uri: avatar }
                : require("../../assets/images/nopicture.png")
            }
            className="w-24 h-24 rounded-full mb-2"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Email</Text>
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        </View>

        {/* Password */}
        <View className="mb-2">
          <Text className="text-gray-600 mb-1">Password</Text>
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        </View>

        {/* Forgot password */}
        <TouchableOpacity className="self-end mb-6"
          onPress={handleForgotPassword}>
          <Text className="text-blue-600 text-sm">
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Sign In button */}
        <TouchableOpacity
          onPress={handleSignIn} className="bg-black py-4 rounded-xl mb-4">
          <Text className="text-white text-center font-semibold">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500 mr-1">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signUp")}>
            <Text className="text-blue-600 font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        {/* Google Sign In */}

        <GoogleAuthButton/>
      </View>
    </View>
  );
}
