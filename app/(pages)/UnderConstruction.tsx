import { Ionicons } from "@expo/vector-icons";
import { MoveLeft } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

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

      <Pressable
        onPress={() => router.back()}
        style={({ pressed }) => [
          styles.backButtonContainer,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <MoveLeft color="#EE9034" size={28} />
        <Text variant="labelLarge" style={{ color: "#EE9034" }}>
          Go Back
        </Text>
      </Pressable>

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
