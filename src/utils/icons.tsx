import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FileItem } from "@/src/types/models";

type Props = {
  type: FileItem["type"];
  name?: string;
};

export function FileIcon({ type, name = "" }: Props) {
  const ext = name.split(".").pop()?.toLowerCase();

  let icon = "file";
  let color = "text-gray-600";
  let bg = "bg-gray-100";

  if (ext === "pdf") {
    icon = "file-pdf-box";
    color = "text-red-600";
    bg = "bg-red-100";
  } else if (ext === "doc" || ext === "docx") {
    icon = "file-word-box";
    color = "text-blue-700";
    bg = "bg-blue-100";
  } else if (ext === "xls" || ext === "xlsx") {
    icon = "file-excel-box";
    color = "text-green-700";
    bg = "bg-green-100";
  } else if (type === "image") {
    icon = "image";
    color = "text-blue-600";
    bg = "bg-blue-100";
  } else if (type === "video") {
    icon = "video";
    color = "text-purple-600";
    bg = "bg-purple-100";
  }

  return (
    <View className={`w-14 h-14 rounded-xl items-center justify-center ${bg}`}>
      <MaterialCommunityIcons
        name={icon as any}
        size={28}
        className={color}
      />
    </View>
  );
}
