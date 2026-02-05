import { Text, TouchableOpacity, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRef } from "react";
import { router } from "expo-router";
import { Library } from "@/src/types/models";


type Props = {
  item: Library;
  cardSize: number;
  openMenuId: string | null;
  setOpenMenuId: (id: string | null) => void;
  setMenuPosition: (pos: { x: number; y: number }) => void;
  setRenameLib: (lib: Library) => void;
};

export default function LibraryCard({
  item,
  cardSize,
  openMenuId,
  setOpenMenuId,
  setMenuPosition,
  setRenameLib,
}: Props) {
  const menuButtonRef =
    useRef<React.ElementRef<typeof Pressable>>(null);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ width: cardSize, height: cardSize }}
      className="bg-white rounded-2xl items-center justify-center relative"
      onPress={() =>
        router.push({
          pathname: "/files/[id]",
          params: { id: item.id },
        })
      }
    >
      {/* 3-dot menu */}
      <Pressable
        ref={menuButtonRef}
        onPress={(e) => {
          e.stopPropagation();

          menuButtonRef.current?.measureInWindow(
            (x, y, width, height) => {
              setMenuPosition({ x, y: y + height });
              setOpenMenuId(item.id);
            }
          );
        }}
        className="absolute top-2 right-2 p-2"
      >
        <Entypo
          name="dots-three-vertical"
          size={20}
          color="#374151"
        />
      </Pressable>

      <Text className="text-2xl font-bold text-center">
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}
