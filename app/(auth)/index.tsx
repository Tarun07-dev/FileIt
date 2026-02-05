import { View, Text, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-between px-6 py-12">

      {/* 🔝 Top: App Image / Logo */}
      <View className="items-center mt-10">
        <Image
          source={{
            uri: "https://via.placeholder.com/250x250.png?text=App+Image",
          }}
          className="w-60 h-60 mb-6"
          resizeMode="contain"
        />

        {/* App Name */}
        <Text className="text-3xl font-bold text-gray-900">
          FileIt
        </Text>

        {/* Tagline */}
        <Text className="text-gray-500 text-center mt-2">
          Store, manage and access your files anytime
        </Text>
      </View>

      {/* 🔽 Bottom: Actions */}
      <View className="w-full">

        {/* Sign In */}
        <TouchableOpacity
          className="bg-black py-4 rounded-xl mb-4"
          activeOpacity={0.8}
          onPress={() => router.push("/(auth)/signIn")}
        >
          <Text className="text-white text-center font-semibold text-base">
            Sign In
          </Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <TouchableOpacity
          className="border border-black py-4 rounded-xl"
          activeOpacity={0.8}
          onPress={() => router.push("/(auth)/signUp")}
        >
          <Text className="text-black text-center font-semibold text-base">
            Sign Up
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
