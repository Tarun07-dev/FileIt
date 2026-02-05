import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Portal } from "@gorhom/portal";
import { useEffect, useState } from "react";

type Props = {
  visible: boolean;
  initialName?: string; // ✅ ADD THIS
  onClose: () => void;
  onCreate: (name: string) => void;
};


export default function RenameFileModal({
  visible,
  initialName,
  onClose,
  onCreate,
}: Props) {
  const [name, setName] = useState("")
  useEffect(() => {
  if (visible) {
    setName(initialName ?? "");
  }
}, [visible, initialName]);


  if (!visible) return null;

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
    onClose();
  };

  return (
    <Portal>
      <View className="absolute inset-0 bg-black/40 justify-center items-center">
        <View className="bg-white w-[85%] rounded-2xl p-5">
          <Text className="text-lg font-semibold mb-3">
            Rename File
          </Text>

          <TextInput
            placeholder="Library name"
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
          />

          <View className="flex-row justify-end gap-3">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreate}>
              <Text className="text-blue-600 font-semibold">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Portal>
  );
}
