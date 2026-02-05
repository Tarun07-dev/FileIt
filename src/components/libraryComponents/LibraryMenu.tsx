import { View, Text, Pressable } from "react-native";
import { Portal } from "@gorhom/portal";

type Props = {
  visible: boolean;
  position: { x: number; y: number } | null;
  onClose: () => void;
  onRename: () => void;
  onShare: () => void;
  onDelete: () => void;
};

export default function LibraryMenu({
  visible,
  position,
  onClose,
  onRename,
  onShare,
  onDelete,
}: Props) {
  if (!visible || !position) return null;

  return (
    <Portal>
      {/* Outside tap */}
      <Pressable onPress={onClose} className="absolute inset-0">
        {/* Stop propagation INSIDE menu */}
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="absolute bg-gray-50 w-28 py-1 rounded-md shadow-lg border border-gray-200"
          style={{
            top: position.y + 6,
            left: position.x - 90,
          }}
        >
          <Pressable
            onPress={onRename}
            className="px-4 py-2 active:bg-gray-100"
          >
            <Text className="text-sm text-gray-800">
              Rename
            </Text>
          </Pressable>

          <Pressable
            onPress={onShare}
            className="px-4 py-2 active:bg-gray-100"
          >
            <Text className="text-sm text-gray-800">
              Share
            </Text>
          </Pressable>

          <Pressable
            onPress={onDelete}
            className="px-4 py-2 active:bg-red-50"
          >
            <Text className="text-sm text-red-600">
              Delete
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Portal>
  );
}
