import { create } from "zustand";
import { Library, FileItem } from "../types/models";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";

type LibraryStore = {
  libraries: Library[];

  addLibrary: (name: string) => void;
  renameLibrary: (id: string, newName: string) => void;
  deleteLibrary: (id: string) => void;

  addFile: (
    libraryId: string,
    data: {
      name: string;
      type: "pdf" | "image" | "doc" | "video";
      uri?: string;
    }
  ) => void;

  renameFile: (libraryId: string, fileId: string, name: string) => void;
  deleteFile: (libraryId: string, fileId: string) => void;
};

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  libraries: [],

  /* ------------------ LIBRARY ACTIONS ------------------ */

  addLibrary: (name) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const { libraries } = get();

    const alreadyExists = libraries.some(
      (lib) => lib.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (alreadyExists) {
      Toast.show({
        type: "error",
        text1: "Duplicate name",
        text2: "Library name already exists",
      });
      return;
    }

    const newLibrary: Library = {
      id: `lib-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: trimmedName,
      files: [],
      createdAt: Date.now(),
    };

    set({ libraries: [newLibrary, ...libraries] });
  },

  renameLibrary: (id, newName) => {
    const trimmed = newName.trim();
    if (!trimmed) return;

    const { libraries } = get();

    const alreadyExists = libraries.some(
      (lib) =>
        lib.id !== id &&
        lib.name.toLowerCase() === trimmed.toLowerCase()
    );

    if (alreadyExists) {
      Toast.show({
        type: "error",
        text1: "Duplicate name",
        text2: "Library name already exists",
      });
      return;
    }

    set({
      libraries: libraries.map((lib) =>
        lib.id === id ? { ...lib, name: trimmed } : lib
      ),
    });
  },

  deleteLibrary: (id) => {
    Alert.alert(
      "Delete Library",
      "This action cannot be undone. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            set({
              libraries: get().libraries.filter(
                (lib) => lib.id !== id
              ),
            });
          },
        },
      ]
    );
  },

  /* ------------------ FILE ACTIONS ------------------ */

  addFile: (libraryId, data) => {
    const trimmed = data.name.trim();
    if (!trimmed) return;

    set({
      libraries: get().libraries.map((lib) =>
        lib.id === libraryId
          ? {
              ...lib,
              files: [
                ...lib.files,
                {
                  id: `file-${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2, 9)}`,
                  name: trimmed,
                  type: data.type,
                  uri: data.uri,
                  createdAt: Date.now(),
                },
              ],
            }
          : lib
      ),
    });
  },

  renameFile: (libraryId, fileId, name) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    set({
      libraries: get().libraries.map((lib) =>
        lib.id === libraryId
          ? {
              ...lib,
              files: lib.files.map((file) =>
                file.id === fileId
                  ? { ...file, name: trimmed }
                  : file
              ),
            }
          : lib
      ),
    });
  },

  deleteFile: (libraryId, fileId) => {
    set({
      libraries: get().libraries.map((lib) =>
        lib.id === libraryId
          ? {
              ...lib,
              files: lib.files.filter(
                (file) => file.id !== fileId
              ),
            }
          : lib
      ),
    });
  },
}));
