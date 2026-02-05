import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderSearch() {
  return (
    <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 flex-1">
      <Ionicons name="search-outline" size={18} color="#6B7280" />
      <TextInput
        placeholder="Search libraries"
        placeholderTextColor="#6B7280"
        className="ml-3 flex-1 text-base"
      />
    </View>
  );
}
