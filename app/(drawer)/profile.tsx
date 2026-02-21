import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/src/store/authStore";

export default function ProfileScreen() {
  const { profile } = useAuthStore();

  if (!profile) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-6 pt-10">

      {/* Avatar */}
      <View className="items-center mb-6">
        <Image
          source={
            profile.avatar
              ? { uri: profile.avatar }
              : require("../../assets/images/nopicture.png")
          }
          className="w-28 h-28 rounded-full mb-4"
        />
        <Text className="text-2xl font-bold">
          {profile.name}
        </Text>
      </View>

      {/* Info Card */}
      <View className="bg-gray-100 p-5 rounded-2xl space-y-4">

        <View>
          <Text className="text-gray-500">Email</Text>
          <Text className="text-base font-semibold">
            {profile.email}
          </Text>
        </View>

        <View>
          <Text className="text-gray-500">User ID</Text>
          <Text className="text-base font-semibold">
            {profile.uid}
          </Text>
        </View>

        <View>
          <Text className="text-gray-500">Joined</Text>
          <Text className="text-base font-semibold">
            {new Date(profile.createdAt).toLocaleDateString()}
          </Text>
        </View>

      </View>

    </View>
  );
}
