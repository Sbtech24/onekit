import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ToolCard from "../components/Home/ToolCard";

export default function Index() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const tools: Array<{
    title: string;
    icon: string;
    route: "/units" | "/currency" | "/qrcode";
  }> = [
    {
      title: "Unit Converter",
      icon: "swap-horizontal",
      route: "/units",
    },
    {
      title: "Currency Calculator",
      icon: "cash",
      route: "/currency",
    },
    {
      title: "QR Code Scanner",
      icon: "scan-outline",
      route: "/qrcode",
    },
  ];

  const filteredTools = tools.filter((tool) =>
    tool.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello 👋</Text>

          <View style={styles.searchWrapper}>
            <Ionicons
              name="search"
              size={18}
              color="#9CA3AF"
              style={styles.searchIcon}
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search tools..."
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>

          {filteredTools.length > 0 ? (
            <View style={styles.grid}>
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.title}
                  title={tool.title}
                  icon={tool.icon}
                  onPress={() => router.push(tool.route)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={40} color="#D1D5DB" />
              <Text style={styles.emptyText}>No tools found</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  inner: {
    padding: 21,
    gap: 24,
  },

  header: {
    gap: 16,
    paddingTop: 10,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 48,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#111827",
  },

  section: {
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 20,
    gap: 8,
  },

  emptyText: {
    color: "#9CA3AF",
    fontSize: 14,
  },
});
