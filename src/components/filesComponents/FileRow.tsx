// src/components/filesComponents/FileRow.tsx
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRef } from "react";
import { FileItem } from "@/src/types/models";
import { FileIcon } from "@/src/utils/icons";
import { router } from "expo-router";

type Props = {
  file: FileItem;
  onMenuPress: (
    file: FileItem,
    position: { x: number; y: number }
  ) => void;
};

export default function FileRow({ file, onMenuPress }: Props) {
  const menuButtonRef = useRef<React.ElementRef<typeof Pressable>>(null);

  return (
    <View className="bg-white mb-4 mx-2 rounded-3xl relative">
      {/* Menu button */}
      <Pressable
        ref={menuButtonRef}
        onPress={() => {
          menuButtonRef.current?.measureInWindow((x, y, width, height) => {
            onMenuPress(file, {
              x,
              y: y + height,
            });
          });
        }}
        className="absolute right-2 top-2 z-10 p-2"
      >
        <Entypo
          name="dots-three-vertical"
          size={18}
          color="#374151"
        />
      </Pressable>

      {/* Row content */}
      <TouchableOpacity activeOpacity={0.7}
        onPress={() =>  router.push(`/preview/${file.id}`)}>
        <View className="flex-row items-center px-4 h-20">
          
          {/* File icon */}
          <FileIcon type={file.type} name={file.name} />

          {/* File info */}
          <View className="flex-1 ml-3 pr-8">
            <Text
              className="text-lg font-semibold text-gray-900"
              numberOfLines={1}
            >
              {file.name}
            </Text>

            <Text className="text-sm text-gray-500 uppercase mt-0.5">
              {file.type}
            </Text>
          </View>

        </View>
      </TouchableOpacity>
    </View>
  );
}
