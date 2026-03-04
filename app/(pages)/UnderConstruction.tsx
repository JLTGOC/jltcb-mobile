import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MoveLeft } from "lucide-react-native";
import * as SecureStore from "expo-secure-store";
import { useState, useEffect } from "react";

import { useNavigate } from "@/src/hooks/useNavigate";

export default function Index() {
  const { replace } = useNavigate();
  const [hasToken, setHasToken] = useState<boolean>(true)

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItem("token");
      setHasToken(!!token);
    };
    checkToken();
  }, []);

  return (
    <View style={styles.container}>
      {/* Main Construction Icon */}
      <Ionicons name="construct-outline" size={120} color="#EE9034" />

      {/* Primary Message */}
      <View style={styles.textGroup}>
        <Text variant="headlineMedium" style={styles.title}>
          Under Construction
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {"We're building something awesome for you."}
        </Text>
      </View>

     {!hasToken && (
        <View style={styles.backButtonContainer}>
          <MoveLeft 
            color="#EE9034" 
            size={28} 
            onPress={() => replace("/(pages)/landing-page")} 
          />
          <Text 
            variant="labelLarge" 
            style={{ color: "#EE9034" }}
            onPress={() => replace("/(pages)/landing-page")}
          >
            Go Back
          </Text>
        </View>
      )}
        
        <Text variant="bodySmall" style={styles.patienceText}>
          Thank You For Your Patience
        </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Better than height: 100%
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  textGroup: {
    alignItems: "center",
    marginVertical: 24,
    gap: 8, // Adds space between title and subtitle
  },
  title: {
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    paddingHorizontal: 20,
  },
  footer: {
    marginTop: 40,
    alignItems: "center",
    gap: 16,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
  },
  patienceText: {
    opacity: 0.6,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
});