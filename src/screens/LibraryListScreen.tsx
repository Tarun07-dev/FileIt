import { useState } from "react";
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import AddLibraryModal from "../components/libraryComponents/AddLibraryModal";
import EmptyLibrary from "../components/libraryComponents/EmptyLibrary";
import LibraryCard from "../components/libraryComponents/LibraryCard";
import LibraryMenu from "../components/libraryComponents/LibraryMenu";
import RenameLibraryModal from "../components/libraryComponents/RenameLibraryModal";
import { Library } from "../types/models";
import { colors } from "../utils/colors";
import { useLibraryStore } from "../zustand/store";


const SCREEN_WIDTH = Dimensions.get("window").width;
const GAP = 12;
const CARD_SIZE = (SCREEN_WIDTH - GAP * 3) / 2;


export default function LibraryListScreen() {

  const {
    libraries,
    addLibrary,
    renameLibrary,
    deleteLibrary,
  } = useLibraryStore();

  const [showAddModal, setShowAddModal] = useState(false);
  const [renameLibModal, setRenameLibModal] = useState<Library | null>(null);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);


  return (
    <View className="flex-1">

      <View className="flex-row justify-between items-center py-2 px-3 mb-5 mt-2">

        <Text className={`${colors.heading} text-3xl font-bold shadow-sm`}>Your Libraries</Text>
        <TouchableOpacity
          className="px-6 py-3 bg-black rounded-full"
          onPress={() => setShowAddModal(true)}
        >
          <Text className="text-white font-semibold">
            Add Library
          </Text>
        </TouchableOpacity>
        <AddLibraryModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onCreate={addLibrary}
        />

        <RenameLibraryModal
          visible={!!renameLibModal}
          initialName={renameLibModal?.name ?? ""}
          onClose={() => setRenameLibModal(null)}
          onCreate={(newName) => {
            if (!renameLibModal) return;        // 🛡️ safety check

            const id = renameLibModal.id;       // ✅ capture first
            renameLibrary(id, newName);

            setRenameLibModal(null);            // ✅ clear AFTER
          }}
        />
      </View>

      <View>
        <FlatList<Library>
          data={libraries}
          numColumns={2}                        // FIXED = 2
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyLibrary />}

          contentContainerStyle={{
            paddingHorizontal: GAP,
            paddingBottom: GAP,
            gap: GAP,
          }}

          columnWrapperStyle={{
            gap: GAP,
          }}

          renderItem={({ item }) => (
            <>
              <LibraryCard
                item={item}
                cardSize={CARD_SIZE}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
                setMenuPosition={setMenuPosition}
                setRenameLib={setRenameLibModal}
              />

              <LibraryMenu
                visible={openMenuId === item.id}
                position={menuPosition}
                onClose={() => setOpenMenuId(null)}
                onRename={() => {
                  setOpenMenuId(null);
                  setRenameLibModal(item);
                }}
                onShare={() => setOpenMenuId(null)}
                onDelete={() => {
                  setOpenMenuId(null);     // ✅ close menu first
                  deleteLibrary(item.id); // ✅ then delete
                }}
              />
            </>
          )}

        />
      </View>

    </View>
  );
}
