import { Drawer } from "expo-router/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import HeaderSearch from "@/src/components/otherComponents/HeaderSearch";
import { doSignOut } from "@/src/services/auth";
import Toast from "react-native-toast-message";

function CustomDrawerContent(props: any) {
  const currentRoute =
    props.state.routeNames[props.state.index]; // active screen name

  const handleLogout = async () => {
    try {
      await doSignOut();
      Toast.show({
        type: "success",
        text1: "Logged out",
      });
      router.replace("/(auth)/signIn");
    } catch {
      Toast.show({
        type: "error",
        text1: "Logout failed",
      });
    }
  };

  const DrawerItem = ({
    label,
    icon,
    route,
  }: {
    label: string;
    icon: any;
    route: string;
  }) => {
    const isActive = currentRoute === route;

    return (
      <TouchableOpacity
        onPress={() => {
          if (route === "index") router.push("/(drawer)");
          if (route === "profile") router.push("/(drawer)/profile");
          if (route === "shared") router.push("/(drawer)/shared");
          if (route === "settings") router.push("/(drawer)/settings");
        }}
        className={`flex-row items-center px-5 py-3 mx-2 my-1 rounded-xl ${isActive ? "bg-sky-100" : ""
          }`}
      >
        <Ionicons
          name={icon}
          size={22}
          color={isActive ? "#2563EB" : "#111827"}
        />
        <Text
          className={`ml-4 text-xl ${isActive ? "text-sky-600 font-semibold" : "text-gray-900"
            }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      {/* TOP MENU */}
      <DrawerContentScrollView {...props}>
        <DrawerItem label="Home" icon="home" route="index" />
        <DrawerItem label="Shared" icon="share-social" route="shared" />
        <DrawerItem label="Profile" icon="person" route="profile" />
        <DrawerItem label="Settings" icon="settings" route="settings" />
      </DrawerContentScrollView>

      {/* LOGOUT AT BOTTOM */}
      <View className="border-t border-gray-200 p-4">
        <TouchableOpacity
          onPress={() => {
            // logout logic here
            router.replace("/");
          }}
          className="flex-row items-center"
        >
          <Ionicons name="log-out-outline" size={24} color="red" />
          <TouchableOpacity onPress={handleLogout} className="flex-row items-center">
            <Text className="ml-4 text-xl text-red-600 font-medium">
              Logout
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#fff" },
        headerTitleContainerStyle: {
          width: "100%",
          paddingRight: 16,
          marginBottom: 10
        },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: () => <HeaderSearch />,
          headerTitleAlign: "left",
        }}
      />

      <Drawer.Screen
        name="shared"
        options={{ title: "Shared Libraries" }}
      />

      <Drawer.Screen
        name="profile"
        options={{ title: "Profile"}}
      />

      <Drawer.Screen
        name="settings"
        options={{ title: "Settings" }}
      />

    </Drawer>
  );
}
