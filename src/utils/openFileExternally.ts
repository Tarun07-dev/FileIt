import { Platform, Alert } from "react-native";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import * as FileSystem from "expo-file-system/legacy";

export const openFileExternally = async (
  uri: string,
  mimeType?: string
) => {
  if (Platform.OS === "ios") {
    // 🍎 iOS → Quick Look / Share Sheet
    await Sharing.shareAsync(uri);
    return;
  }

  try {
    // 🤖 Android → Native apps
    const contentUri = await FileSystem.getContentUriAsync(uri);

    await IntentLauncher.startActivityAsync(
      "android.intent.action.VIEW",
      {
        data: contentUri,
        flags: 1,
        type: mimeType, // docx / xlsx / pdf
      }
    );
  } catch (error) {
    // ✅ Graceful fallback
    Alert.alert(
      "No app found",
      "No application installed to open this file. Please install a compatible app (Word / Excel / Google Docs)."
    );
  }
};
