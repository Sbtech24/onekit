import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
   TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const TABS = ["Length", "Weight", "Temperature"];


const lengthUnits: any = {
  m: 1,
  km: 1000,
  ft: 0.3048,
};

const weightUnits: any = {
  kg: 1,
  g: 0.001,
  lb: 0.453592,
};

const tempUnits = ["C", "F"];

export default function UnitsScreen() {
  const [activeTab, setActiveTab] = useState("Length");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");

  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

  
  const convert = () => {
    const value = parseFloat(fromValue);
    if (isNaN(value)) return setToValue("");

    if (activeTab === "Length") {
      const meters = value * lengthUnits[fromUnit];
      const result = meters / lengthUnits[toUnit];
      setToValue(result.toFixed(4));
    }

    if (activeTab === "Weight") {
      const kg = value * weightUnits[fromUnit];
      const result = kg / weightUnits[toUnit];
      setToValue(result.toFixed(4));
    }

    if (activeTab === "Temperature") {
      let result = 0;

      if (fromUnit === "C" && toUnit === "F") {
        result = (value * 9) / 5 + 32;
      } else if (fromUnit === "F" && toUnit === "C") {
        result = ((value - 32) * 5) / 9;
      } else {
        result = value;
      }

      setToValue(result.toFixed(2));
    }
  };

 
  useEffect(() => {
    convert();
  }, [fromValue, fromUnit, toUnit, activeTab]);

 
  useEffect(() => {
    if (activeTab === "Length") {
      setFromUnit("m");
      setToUnit("km");
    }
    if (activeTab === "Weight") {
      setFromUnit("kg");
      setToUnit("lb");
    }
    if (activeTab === "Temperature") {
      setFromUnit("C");
      setToUnit("F");
    }
  }, [activeTab]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const getUnits = () => {
    if (activeTab === "Length") return Object.keys(lengthUnits);
    if (activeTab === "Weight") return Object.keys(weightUnits);
    if (activeTab === "Temperature") return tempUnits;
    return [];
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Unit Converter</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
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

            <View style={styles.dropdown}>
              <Text>{fromUnit}</Text>
            </View>
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

         
          <Text style={styles.label}>To</Text>
          <View style={styles.inputRow}>
            <TextInput
              value={toValue}
              editable={false}
              style={[styles.input, styles.resultInput]}
            />

            <View style={styles.dropdown}>
              <Text>{toUnit}</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
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

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#E5E7EB",
    borderRadius: 12,
    padding: 4,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#111827",
    fontWeight: "600",
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
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  dropdownText: {
    fontSize: 14,
    color: "#111827",
  },

  swapWrapper: {
    alignItems: "center",
  },

  swapButton: {
    backgroundColor: "#EFF6FF",
    padding: 10,
    borderRadius: 50,
  },

  infoText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 13,
  },
});