
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import EmptyFiles from "../components/filesComponents/EmptyFiles";
import FileMenu from "../components/filesComponents/FileMenu";
import FileRow from "../components/filesComponents/FileRow";
import RenameFileModal from "../components/filesComponents/RenameFileModal";
import BackButton from "../components/otherComponents/BackButton";
import { FileItem } from "../types/models";
import { colors } from "../utils/colors";
import { getFileType } from "../utils/fileHelpers";
import { useLibraryStore } from "../zustand/store";



export default function FileListScreen() {

  const [showFileMenu, setShowFileMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [renameFileModal, setRenameFileModal] = useState<FileItem | null>(null);

  const onMenuPress = (
    file: FileItem,
    position: { x: number; y: number }
  ) => {
    setSelectedFile(file);
    setMenuPosition(position);
    setShowFileMenu(true);
  };

  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const {
    libraries,
    addFile,
    renameFile,
    deleteFile,
  } = useLibraryStore();


  const { id } = useLocalSearchParams<{ id: string }>();

  const library = libraries.find(lib => lib.id === id);
  const files = library?.files ?? [];

  const handleAddFile = async () => {
    if (!library) return;

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // allows pdf, image, video, doc
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets;

      for (const file of result.assets) {
        addFile(library.id, {
          name: file.name,
          type: getFileType(file.mimeType),
          uri: file.uri,
        });
      }
    } catch (err) {
      console.log("Pick file error:", err);
    }
  };

  return (
    <View className="flex-1">

      <View className="flex-row justify-between items-center mx-3 my-4">
        <View >
          <BackButton />
        </View>

        <View>
          <Text className={`${colors.heading} text-3xl font-bold text-center`}>Files</Text>
        </View>

        <View>
          <TouchableOpacity className="px-6 py-3 bg-black rounded-full"
            onPress={handleAddFile}>
            <Text className="text-white font-semibold text-center">
              Add File
            </Text>
          </TouchableOpacity>
        </View>
        <RenameFileModal
          visible={!!renameFileModal}
          initialName={renameFileModal?.name ?? ""}
          onClose={() => setRenameFileModal(null)}
          onCreate={(newName) => {
            if (!library || !selectedFile) return; // ✅ proper guard
            renameFile(library.id, selectedFile.id, newName);
            setRenameFileModal(null);            // ✅ clear AFTER
          }}
        />
      </View>

      <View className="mt-5">

        <Text className="text-gray-500 text-center mb-2">Library: {id}</Text>

        <FlatList
          data={files}
          keyExtractor={(item) => item.id}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyFiles />}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => (<>
            <FileRow
              file={item}
              onMenuPress={onMenuPress}
            />
          </>
          )
          }
        />
        <FileMenu
          visible={showFileMenu}
          position={menuPosition}
          onClose={() => {
            setShowFileMenu(false);
            setMenuPosition(null);
            setSelectedFile(null);
          }}
          onRename={() => {
            setShowFileMenu(false);
            setRenameFileModal(selectedFile);
          }}
          onShare={() => {
            setShowFileMenu(false);
            // share selectedFile
          }}
          onDelete={() => {
            setShowFileMenu(false);
            deleteFile(library?.id ?? "", selectedFile?.id ?? "");
          }}
        />
      </View>
    </View >
  );
}
