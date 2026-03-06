import type { ShipmentCardMessage } from "@/src/types/chats";
import { format, parseISO } from "date-fns";
import { StyleSheet, View } from "react-native";

import { Avatar, Card, Text } from "react-native-paper";

type Props = {
  shipment: ShipmentCardMessage;
};

function mapShipments(shipments: object) {
  return Object.entries(shipments).map(([key, value]) => ({
    title: key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: value ?? "",
  }));
}

export default function ChatShipmentCard({ shipment }: Props) {
  const { id, ...serializedShipment } = shipment.shipment;
  const fullLengthDetails = mapShipments({
    reference_no: serializedShipment.reference_number,
    commodity: serializedShipment.commodity,
  });
  const leftColDetails = mapShipments({
    date_created: format(parseISO(serializedShipment.date_created), "P"),
    account_handler: serializedShipment.as_full_name,
  });
  const rightColDetails = mapShipments({ volume: serializedShipment.volume });

  return (
    <View style={styles.container}>
      <Card style={styles.bubble}>
        <Card.Content>
          <Text variant="titleMedium" style={{ textAlign: "right" }}>
            JLTCB
          </Text>
          <View style={styles.cardDataContainer}>
            {fullLengthDetails.map((data) => (
              <ShipmentDetail {...data} key={data.title} />
            ))}
            <View style={styles.cardDataColumns}>
              <View style={styles.cardCol}>
                {leftColDetails.map((data) => (
                  <ShipmentDetail {...data} key={data.title} />
                ))}
              </View>
              <View style={styles.cardCol}>
                {rightColDetails.map((data) => (
                  <ShipmentDetail {...data} key={data.title} />
                ))}
              </View>
            </View>
          </View>
        </Card.Content>
      </Card>
      <View style={styles.senderImageContainer}>
        <Avatar.Image size={36} source={{ uri: shipment.sender.image_path }} />
      </View>
    </View>
  );
}

function ShipmentDetail({ title, value }: { title: string; value: string }) {
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
