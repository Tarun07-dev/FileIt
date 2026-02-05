import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";


type EmptyFilesProps = {
    onAddPress?: () => void;
};

export default function EmptyLibrary({ onAddPress }: EmptyFilesProps) {



    return (
        <View className="flex-1 items-center justify-center px-6">

            <Ionicons
                name="folder-outline"
                size={64}
                color="#9CA3AF"
                style={{ marginBottom: 16 }}
            />

            <Text className="text-2xl font-bold text-center mb-2">
                No Library Yet
            </Text>

            <Text className="text-gray-500 text-center mb-6">
                Create your first library for organizing files.
            </Text>

        </View>

    );
}
