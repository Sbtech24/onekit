import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ToolCard from "../components/Home/ToolCard";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning 👋</Text>

          <TextInput
            placeholder="Search tools..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>

          <View style={styles.grid}>
            <ToolCard
              title="Unit Converter"
              icon="swap-horizontal"
              onPress={() => router.push("/units")}
            />

            <ToolCard
              title="Currency"
              icon="cash"
              onPress={() => router.push("/currency")}
            />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <Text style={styles.activityText}>
              No recent activity yet
            </Text>
          </View>
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
    gap: 12,
    paddingTop:10
  },

  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  searchInput: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 14,
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
    gap: 12,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  iconWrapper: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  activityText: {
    color: "#6B7280",
    fontSize: 14,
  },
});