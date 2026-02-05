import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";


type EmptyFilesProps = {
  onAddPress?: () => void;
};


export default function EmptyFiles({ onAddPress }: EmptyFilesProps) {
    return (
        <View className="flex-1 items-center justify-center px-6 mt-5">

            <Ionicons
                name="folder-outline"
                size={100}
                color="#9CA3AF"
                style={{ marginBottom: 10 }}
            />

            <Text className="text-3xl font-bold text-center mb-2">
                No Files Yet
            </Text>

        </View>

    );
}
