import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="units"
        options={{
          title: "Unit Converter",
          tabBarIcon: ({ size, color }) => (
            <Octicons name="arrow-switch" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="currency"
        options={{
          title: "Currency",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="currency-exchange" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
    </SafeAreaProvider>
  );
}
