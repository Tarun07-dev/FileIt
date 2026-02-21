import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { useAuthStore } from "@/src/store/authStore";
import { doCreateUserWithEmailAndPassword } from "@/src/services/auth";
import { isValidEmail, isStrongPassword } from "@/src/utils/validators";
import Toast from "react-native-toast-message";
import GoogleAuthButton from "@/src/components/otherComponents/GoogleAuthButton";
import { createUserDocument } from "@/src/services/userServices";
import { uploadAvatarToCloudinary } from "@/src/services/cloudinaryService";


export default function SignUpScreen() {
  const { userLoggedIn } = useAuthStore();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (userLoggedIn) {
  //     router.replace("/(drawer)");
  //   }
  // }, [userLoggedIn]);

  /* ---------------- Avatar Picker ---------------- */


  const pickAvatar = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Toast.show({
        type: "error",
        text1: "Permission denied",
        text2: "Allow gallery access to select avatar",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    console.log("ImagePicker result:", result);

    if (!result.canceled && result.assets?.length) {
      setAvatar(result.assets[0].uri);
    }
  };


  /* ---------------- Signup Handler ---------------- */
  const handleCreateAccount = async () => {
    if (loading) return;

    if (!name.trim()) {
      Toast.show({
        type: "error",
        text1: "Invalid name",
        text2: "Name cannot be empty",
      });
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid email",
        text2: "Enter a valid email address",
      });
      return;
    }

    if (!isStrongPassword(password)) {
      Toast.show({
        type: "error",
        text1: "Weak password",
        text2: "Password must be at least 6 characters and include a number",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password mismatch",
        text2: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);

      const cred = await doCreateUserWithEmailAndPassword(
        email.trim().toLowerCase(),
        password
      );


      let avatarURL: string | null = null;

      if (avatar) {
        avatarURL = await uploadAvatarToCloudinary(
          avatar,               // ✅ no .uri
          cred.user.uid
        );
      }


      await createUserDocument(cred.user, name, avatarURL);

      router.replace("/(drawer)")

      Toast.show({
        type: "success",
        text1: "Account created",
        text2: "Welcome 🎉",
      });

    } catch (error: any) {
      console.log("Signup error:", error);
      console.log("Error code:", error?.code);
      console.log("Error message:", error?.message);

      switch (error.code) {
        case "auth/email-already-in-use":
          Toast.show({
            type: "error",
            text1: "Account exists",
            text2: "Email is already registered",
          });
          break;

        case "auth/network-request-failed":
          Toast.show({
            type: "error",
            text1: "Network error",
            text2: "Check your internet connection",
          });
          break;

        case "auth/weak-password":
          Toast.show({
            type: "error",
            text1: "Weak password",
            text2: "Choose a stronger password",
          });
          break;

        case "auth/invalid-email":
          Toast.show({
            type: "error",
            text1: "Invalid email",
            text2: "Email format is wrong",
          });
          break;

        default:
          Toast.show({
            type: "error",
            text1: "Signup failed",
            text2: error?.message ?? "Unknown error",
          });
      }
    } finally {
      setLoading(false);
    }
  };


  /* ---------------- UI ---------------- */
  return (
    <View className="flex-1 justify-end bg-black/40">
      <View className="bg-white rounded-t-3xl px-6 pt-4 pb-8 h-[80%]">

        <View className="items-center mb-6">
          <Text className="text-2xl font-bold">Sign Up</Text>
        </View>

        {/* Avatar */}
        <View className="items-center mb-6">
          <TouchableOpacity onPress={pickAvatar}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../assets/images/nopicture.png")
              }
              className="w-24 h-24 rounded-full mb-2"
            />
            <Text className="text-blue-600 text-sm">Add profile photo</Text>
          </TouchableOpacity>
        </View>

        {/* Name */}
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        {/* Email */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        />

        {/* Confirm */}
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        />

        <TouchableOpacity
          disabled={loading}
          onPress={handleCreateAccount}
          className={`py-4 rounded-xl mb-4 ${loading ? "bg-gray-400" : "bg-black"
            }`}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Creating..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center">
          <Text className="text-gray-500 mr-1">Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signIn")}>
            <Text className="text-blue-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="mx-4 text-gray-500 text-sm">OR</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <GoogleAuthButton />
      </View>
    </View >
  );
}
