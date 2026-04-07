import BannerHeader from "@/src/components/ui/BannerHeader";
import { useStore } from "@/src/stores/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function MakeJobOrder() {
  const router = useRouter();
  const reset = useStore((state) => state.reset);
  const { quotationId, quotationReference } = useLocalSearchParams<{
    quotationId: string;
    quotationReference: string;
  }>();

  return (
    <ScrollView>
      <BannerHeader title="Make Job Order" variant="light" />

      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>
          Select Template
        </Text>

        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="check-decagram-outline" size={24} />
            <Text style={styles.cardTextContent}>
              <Text style={styles.upper}>Regulatory Services</Text>
              <Text style={styles.light}> (permits and licensing)</Text>
            </Text>
          </Card.Content>
        </Card>

        <Card
          onPress={() => {
            reset();
            router.push({
              pathname:
                "/(employee-account-specialist)/(tabs)/dashboard/accepted-quotation/make-job-order/shipment",
              params: { quotationId, quotationReference },
            });
          }}
          style={styles.card}
        >
          <Card.Content style={styles.cardContent}>
            <MaterialCommunityIcons name="license" size={24} />
            <Text style={styles.cardTextContent}>
              <Text style={styles.upper}>Logistics Services</Text>
              <Text style={styles.light}> (shipments)</Text>
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    gap: 16,
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  upper: {
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 6,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  cardTextContent: {
    flexDirection: "row",
  },
  light: {
    color: "#666666",
    fontSize: 13,
    fontStyle: "italic",
  },
});
