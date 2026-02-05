import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

import BackButton from "../components/otherComponents/BackButton";

import { openFileExternally } from "../utils/openFileExternally";
import { useLibraryStore } from "../zustand/store";

const MIME_TYPES = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export default function FilePreviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { libraries } = useLibraryStore();

  const file = libraries
    .flatMap((lib) => lib.files)
    .find((f) => f.id === id);

  // 🛑 Safety guard
  if (!file) {
    return (
      <View className="flex-1 bg-white px-4 pt-6">
        <BackButton />
        <Text className="text-xl font-bold mt-6">
          File not found
        </Text>
      </View>
    );
  }

  const ext = file.name.split(".").pop()?.toLowerCase();

  return (
    <View className="flex-1 bg-white px-4">
      {/* Header */}
      <View className="flex-row items-center mt-5">
        <BackButton />
        <Text
          className="flex-1 text-xl font-bold text-center mr-10"
          numberOfLines={1}
        >
          {file.name}
        </Text>
      </View>

      {/* Preview Area */}
      <View className="flex-1 mt-4 rounded-xl overflow-hidden">

        {/* 🖼 IMAGE → inline */}
        {file.type === "image" && (
          <Image
            source={{ uri: file.uri }}
            className="flex-1"
            resizeMode="contain"
          />
        )}


        {/* 📄 PDF / DOCX / XLSX → external */}
        {file.type !== "image" && file.type !== "video" && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 mb-3">
              Preview not supported
            </Text>

            <Text
              className="text-blue-600 font-semibold text-base"
              onPress={() =>
                openFileExternally(
                  file.uri!,
                  ext && ext in MIME_TYPES
                    ? MIME_TYPES[ext as keyof typeof MIME_TYPES]
                    : undefined
                )
              }
            >
              Open file
            </Text>
          </View>
        )}
        {file.type === "video" && file.uri && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500 mb-3">
              Video will open in system player
            </Text>

            <Text
              className="text-blue-600 font-semibold"
              onPress={() => {
                if (!file.uri) return; // 🛡️ type safety
                openFileExternally(file.uri, "video/*");
              }}
            >
              Open video
            </Text>
          </View>
        )}

      </View>
    </View>
  );
}
