import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";


type ToolCardProps = {
  title: string;
  icon: any;
  onPress: () => void;
};

export default function ToolCard({ title, icon, onPress }: ToolCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color="#2563EB" />
      </View>

      <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

 

 



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

  
});