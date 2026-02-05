import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { PortalProvider } from "@gorhom/portal";
import Toast from "react-native-toast-message";
import "../global.css";
import { useAuthListener } from "@/src/hooks/useAuthListener";

export default function RootLayout() {
  useAuthListener();
  return (
    <>
      <PortalProvider>
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              {/* 🚧 TEMP: show auth stack directly */}
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
        </SafeAreaProvider>
        <Toast />
      </PortalProvider>
    </>
  );
}
