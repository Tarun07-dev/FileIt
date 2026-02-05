import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/services/firebase";
import { useAuthStore } from "@/src/store/authStore";
import { doCreateUserWithEmailAndPassword } from "@/src/services/auth";

export default function SignUpScreen() {
  const { userLoggedIn } = useAuthStore();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const handleCreateAccount = async () => {
    if (!email || !password || password !== confirmPassword) return;

    await doCreateUserWithEmailAndPassword(email, password);
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
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold">
            Sign Up
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
          <Text className="text-blue-600 text-sm">
            Add profile photo
          </Text>
        </View>

        {/* Name */}
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Full Name</Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-xl px-4 py-3"
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
        <View className="mb-4">
          <Text className="text-gray-600 mb-1">Password</Text>
          <TextInput
            placeholder="Create password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-gray-600 mb-1">Confirm Password</Text>
          <TextInput
            placeholder="Re-enter password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        </View>

        {/* Create Account button */}
        <TouchableOpacity
          onPress={handleCreateAccount}
          className="bg-black py-4 rounded-xl mb-4"
        >
          <Text className="text-white text-center font-semibold">
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Sign In redirect */}
        <View className="flex-row justify-center">
          <Text className="text-gray-500 mr-1">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signIn")}>
            <Text className="text-blue-600 font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
