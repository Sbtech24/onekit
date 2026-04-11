import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState,useEffect} from "react";
import convert from "../lib/convert";

export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
];

export default function Currency() {
  const [fromValue, setFromValue] = useState("1450");
  const [toValue, setToValue] = useState("");


  const [fromCurrency, setFromCurrency] = useState("NGN");
  const [toCurrency, setToCurrency] = useState("USD");

  const [openDropdown, setOpenDropdown] = useState<"from" | "to" | null>(null);

  const swapUnits = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(()=>{
    const runConversion =async ()=>{
    const data = await convert(fromCurrency,toCurrency,parseInt(fromValue))
   setToValue(data)
    }
    runConversion()
  },[fromValue,fromCurrency,toCurrency])

  const renderDropdown = (type: "from" | "to") => {
    const isOpen = openDropdown === type;

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() =>
            setOpenDropdown(isOpen ? null : type)
          }
        >
          <Text style={styles.dropdownText}>
            {type === "from"
              ? currencies.find(c => c.code === fromCurrency)?.flag
              : currencies.find(c => c.code === toCurrency)?.flag}{" "}
            {type === "from" ? fromCurrency : toCurrency}
          </Text>
          <Ionicons name="chevron-down" size={16} color="#6B7280" />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownList}>
            <FlatList
              data={currencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    type === "from"
                      ? setFromCurrency(item.code)
                      : setToCurrency(item.code);
                    setOpenDropdown(null);
                  }}
                >
                  <Text style={styles.dropdownItemText}>
                    {item.flag} {item.code}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Currency Converter</Text>
          <Text style={styles.subText}>
            Convert currencies instantly
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          {/* From */}
          <Text style={styles.label}>From</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={fromValue}
              onChangeText={setFromValue}
              keyboardType="numeric"
              style={styles.input}
            />

            {renderDropdown("from")}
          </View>

          {/* Swap */}
          <View style={styles.swapWrapper}>
            <TouchableOpacity
              style={styles.swapButton}
              onPress={swapUnits}
            >
              <Ionicons name="swap-vertical" size={20} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* To */}
          <Text style={styles.label}>To</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={toValue}
              editable={false}
              style={[styles.input, styles.resultInput]}
            />

            {renderDropdown("to")}
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
    padding: 16,
    gap: 24,
  },

  header: {
    gap: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  subText: {
    fontSize: 14,
    color: "#6B7280",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },

  inputRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
  },

  resultInput: {
    backgroundColor: "#F3F4F6",
  },

  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    minWidth: 110,
  },

  dropdownText: {
    fontSize: 14,
    color: "#111827",
  },

  dropdownList: {
    position: "absolute",
    top: 55,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    maxHeight: 200,
    zIndex: 1000,
  },

  dropdownItem: {
    padding: 12,
  },

  dropdownItemText: {
    fontSize: 14,
  },

  swapWrapper: {
    alignItems: "center",
  },

  swapButton: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 50,
  },
});