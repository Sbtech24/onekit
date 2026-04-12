import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Vibration,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Qrcode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setResult(data);
    Vibration.vibrate(100);
  };

  if (!permission) {
    return <View />;
  }

if (!permission.granted) {
  return (
    <View style={styles.center}>
      <Text style={styles.permissionTitle}>Camera Permission Needed</Text>

      <Text style={styles.permissionText}>
        We need access to your camera to scan QR codes
      </Text>

      <TouchableOpacity style={styles.button} onPress={requestPermission}>
        <Text style={styles.buttonText}>Grant Permission</Text>
      </TouchableOpacity>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={handleScan}
        />
        <View style={styles.overlay}>
          <View style={styles.scanBox} />
          <Text style={styles.scanText}>Align QR code within frame</Text>
        </View>
      </View>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Scanned Result</Text>
          <Text style={styles.resultText}>{result}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Linking.openURL(result)}
            >
              <Text style={styles.actionText}>Open</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setScanned(false);
                setResult(null);
              }}
            >
              <Text style={styles.actionText}>Scan Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  center: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 24,
  backgroundColor: "#F9FAFB",
  gap: 12,
},

permissionTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
},

permissionText: {
  fontSize: 14,
  color: "#6B7280",
  textAlign: "center",
  lineHeight: 20,
},

  inner: {
    flex: 1,
    padding: 16,
    gap: 16,
  },

  cameraWrapper: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },

  scanBox: {
    width: 220,
    height: 220,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderRadius: 12,
  },

  scanText: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 14,
  },

  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  resultText: {
    fontSize: 14,
    color: "#374151",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },



  button: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
