import { routes } from "@/src/constants/routes";
import { useNavigate } from "@/src/hooks/useNavigate";
import { formatDate } from "@/src/utils/formatDate";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";

type Props = {
  reference_number: string;
  status: string;
  commodity: string;
  date: string;
  shipment_id: number;
};

export default function Ongoing({
  reference_number,
  status,
  commodity,
  date,
  shipment_id,
}: Props) {
  const { navigate } = useNavigate();

  const handleViewDetails = () => {
    if (!shipment_id && shipment_id !== 0) return;

    navigate({
      pathname: routes.CLIENT_SHIPMENT_DETAILS,
      params: {
        id: String(shipment_id),
        reference_number,
      },
    });
  };

  return (
    <Card style={styles.card} mode="elevated" elevation={1}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <MaterialCommunityIcons
              name="package-variant-closed"
              size={24}
              color="#333"
              style={styles.icon}
            />
            <View>
              <Text style={styles.label}>REFERENCE NO</Text>
              <Text style={styles.referenceNo}>{reference_number}</Text>
            </View>
          </View>
          <Text style={styles.status}>{status}</Text>
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.itemName}>{commodity}</Text>

        <View style={styles.timeline}>
          <Text style={styles.date}>{formatDate(date)}</Text>
          <View style={styles.arrowContainer}>
            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={24}
              color="#aaa"
            />
          </View>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>

        <Divider style={styles.divider} />
        <Card.Actions style={styles.actions}>
          <Button
            onPress={handleViewDetails}
            mode="text"
            labelStyle={styles.viewDetailsText}
          >
            VIEW DETAILS
          </Button>
        </Card.Actions>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    margin: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 12,
  },
  label: {
    fontSize: 10,
    color: "#aaa",
    textTransform: "uppercase",
  },
  referenceNo: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  status: {
    fontSize: 12,
    color: "green",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: -16,
  },
  itemName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 16,
    marginBottom: 8,
  },
  timeline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  date: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
  },
  arrowContainer: {
    flex: 1,
    alignItems: "center",
  },
  actions: {
    justifyContent: "center",
    paddingBottom: 0,
    paddingTop: 8,
  },
  viewDetailsText: {
    fontSize: 12,
    color: "#888",
    textTransform: "uppercase",
  },
});
