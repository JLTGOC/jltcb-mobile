import { QuotationCardMessage } from "@/src/types/chats";
import { format, parseISO } from "date-fns";
import { StyleSheet, View } from "react-native";

import { Avatar, Card, Text } from "react-native-paper";

type Props = {
  quotation: QuotationCardMessage;
};

function mapQuotations(quotations: object) {
  return Object.entries(quotations).map(([key, value]) => ({
    title: key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: value ?? "",
  }));
}

export default function ChatQuotationCard({ quotation }: Props) {
  const { id, ...serializedQuotation } = quotation.quotation;
  const fullLengthDetails = mapQuotations({
    reference_no: serializedQuotation.reference_number,
    commodity: serializedQuotation.commodity,
  });
  const leftColDetails = mapQuotations({
    date_created: format(parseISO(serializedQuotation.date_created), "P"),
    account_handler: serializedQuotation.as_full_name,
  });
  const rightColDetails = mapQuotations({ volume: serializedQuotation.volume });

  return (
    <View style={styles.container}>
      <Card style={styles.bubble}>
        <Card.Content>
          <Text variant="titleMedium" style={{ textAlign: "right" }}>
            JLTCB
          </Text>
          <View style={styles.cardDataContainer}>
            {fullLengthDetails.map((data) => (
              <QuotationDetail {...data} key={data.title} />
            ))}
            <View style={styles.cardDataColumns}>
              <View style={styles.cardCol}>
                {leftColDetails.map((data) => (
                  <QuotationDetail {...data} key={data.title} />
                ))}
              </View>
              <View style={styles.cardCol}>
                {rightColDetails.map((data) => (
                  <QuotationDetail {...data} key={data.title} />
                ))}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
      <View style={styles.senderImageContainer}>
        <Avatar.Image size={36} source={{ uri: quotation.sender.image_path }} />
      </View>
    </View>
  );
}

function QuotationDetail({ title, value }: { title: string; value: string }) {
  return (
    <View>
      <Text style={[styles.detail, styles.detailTitle]} variant="titleSmall">
        {title}
      </Text>
      <Text style={[styles.detail]} variant="bodyMedium">
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
  },
  bubble: {
    borderRadius: 15,
    flex: 1,
  },
  cardDataContainer: {
    gap: 8,
  },
  cardDataColumns: {
    flexDirection: "row",
  },
  cardCol: {
    width: "50%",
    gap: 8,
  },
  senderImageContainer: {
    backgroundColor: "#0a1c47",
    borderRadius: 100,
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1%",
    alignSelf: "flex-end",
  },

  detail: {
    textTransform: "uppercase",
  },
  detailTitle: {
    color: "#666666",
  },
});
