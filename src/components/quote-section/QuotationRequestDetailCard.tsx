import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

import type { QuotationDetailsSection } from "@/types/quotations";

interface QuotationRequestDetailCardProps {
  section: QuotationDetailsSection;
}

export default function QuotationRequestDetailCard({
  section,
}: QuotationRequestDetailCardProps) {
  return (
    <Card
      mode="contained"
      style={styles.card}
      theme={{ colors: { surfaceVariant: "white" } }}
    >
      <Card.Title
        style={styles.title}
        title={section.title}
        titleVariant="titleMedium"
        titleStyle={{ textTransform: "uppercase", textAlignVertical: "center" }}
        left={() => <section.icon height={20} width={20} />}
        leftStyle={{
          aspectRatio: 1,
          alignItems: "center",
          width: 20,
        }}
      />
      <Card.Content style={styles.content}>
        {section.details.map(([label, value]) => (
          <View style={styles.detail} key={label + value}>
            <Text style={[styles.label, styles.text]}>{label}</Text>
            <Text style={[styles.value, styles.text]}>{value}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
  },
  title: {
    minHeight: "auto",
    paddingVertical: 4,
    borderBottomWidth: 2,
    borderColor: "#F5F5F5",
  },
  content: {
    gap: 7,
    paddingTop: 8,
    paddingBottom: 10,
  },
  detail: {
    flexDirection: "row",
    gap: 2,
  },
  label: {
    width: "35%",
    color: "#9D9D9D",
  },
  value: {
    flex: 1,
  },
  text: {
    textTransform: "uppercase",
  },
});
