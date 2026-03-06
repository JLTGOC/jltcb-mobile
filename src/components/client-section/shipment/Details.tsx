import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Card, Divider, Text } from "react-native-paper";

import { fetchShipmentDetails } from "@/src/services/shipment";
import type { ShipmentDetails } from "@/src/types/shipment-type";

type RowItem = {
  label: string;
  value?: string | number | null;
};

type BasicCardData = {
  title: string;
  rows: RowItem[];
  middleBadge?: string;
};

type StatusCardData = {
  title: string;
  status?: string | null;
  rows: RowItem[];
};

function formatValue(value?: string | number | null) {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
}

function BasicCard({ title, rows, middleBadge }: BasicCardData) {
  return (
    <Card style={styles.card} mode="elevated" elevation={1}>
      <Card.Content style={styles.content}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Divider style={styles.divider} />
        {rows.map((row, index) => (
          <View key={`${title}-${row.label}-${index}`} style={styles.row}>
            <Text style={styles.label}>{row.label} :</Text>
            <Text style={styles.value}>{formatValue(row.value)}</Text>
          </View>
        ))}

        {middleBadge ? (
          <View style={styles.badgeWrap}>
            <View style={styles.badge}>
              <MaterialCommunityIcons
                name="package-variant-closed"
                size={36}
                color="#6b7280"
              />
              <Text style={styles.badgeText}>{middleBadge}</Text>
            </View>
          </View>
        ) : null}
      </Card.Content>
    </Card>
  );
}

function StatusCard({ title, status, rows }: StatusCardData) {
  return (
    <Card style={styles.card} mode="elevated" elevation={1}>
      <Card.Content style={styles.content}>
        <View style={styles.statusTitleRow}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {status ? <Text style={styles.status}>{status}</Text> : null}
        </View>
        <Divider style={styles.divider} />
        {rows.map((row, index) => (
          <View key={`${title}-${row.label}-${index}`} style={styles.row}>
            <Text style={styles.label}>{row.label} :</Text>
            <Text style={styles.value}>{formatValue(row.value)}</Text>
          </View>
        ))}
      </Card.Content>
    </Card>
  );
}


type Props = {shipment: number};
export default function Details({ shipment }: Props) {
  const hasValidShipmentId = Number.isFinite(shipment) && shipment > 0;

  const { data, isLoading, isError, error } = useQuery<ShipmentDetails, Error>({
    queryKey: ["shipment-details", shipment],
    queryFn: () => fetchShipmentDetails(shipment),
    enabled: hasValidShipmentId,
    retry: false,
  });

  const isNotFoundError =
    isError &&
    /record not found|not found/i.test(error?.message || "");

  if (!hasValidShipmentId) {
    return (
      <View style={styles.loadingWrap}>
        <Text style={styles.emptyText}>No record found.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Fetching shipment details...</Text>
      </View>
    );
  }

  if (isError) {
    if (isNotFoundError) {
      return (
        <View style={styles.loadingWrap}>
          <Text style={styles.emptyText}>No record found.</Text>
        </View>
      );
    }

    return (
      <View style={styles.loadingWrap}>
        <Text style={styles.errorText}>
          {error?.message || "Failed to fetch shipment details."}
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loadingWrap}>
        <Text style={styles.emptyText}>No record found.</Text>
      </View>
    );
  }

  const cardGroupA: BasicCardData[] = [
    {
      title: data?.general_info.commodity || "COMMODITY",
      rows: [
        {
          label: "CONSIGNEE NAME",
          value: data?.commodity_details.consignee_name,
        },
        { label: "VOLUME", value: data?.commodity_details.cargo_type },
      ],
      middleBadge: data?.commodity_details.container_size,
    },
    {
      title: "CONTACT PERSON",
      rows: [
        { label: "FULL NAME", value: data?.contact_person.full_name },
        { label: "CONTACT NO", value: data?.contact_person.contact_number },
        { label: "EMAIL", value: data?.contact_person.email },
      ],
    },
  ];

  const cardGroupB: StatusCardData[] = [
    {
      title: "SHIPMENT INFORMATION",
      status: data?.general_info.status,
      rows: [
        {
          label: "DESTINATION",
          value: data?.shipment_information.destination,
        },
        { label: "ORIGIN", value: data?.shipment_information.origin },
        {
          label: "ACCOUNT HANDLER",
          value:
            data?.shipment_information.account_handler 
        },
        {
          label: "CONFIRMATION DATE",
          value: data?.shipment_information.created_at,
        },
        {
          label: "ETA",
          value: data?.shipment_information.created_at,
        },
      ],
    },
    {
      title: "PAYMENT DETAILS",
      status: data?.payment_details?.status,
      rows: [
        { label: "PAID BY", value: "Gcash" },
        { label: "BILLING DATE", value: "3/12/2026" },
        { label: "PAYMENT DATE", value: "3/15/2026" },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {cardGroupA.map((card, index) => (
        <BasicCard
          key={`${card.title}-${index}`}
          title={card.title}
          rows={card.rows}
          middleBadge={card.middleBadge}
        />
      ))}

      {cardGroupB.map((card, index) => (
        <StatusCard
          key={`${card.title}-${index}`}
          title={card.title}
          rows={card.rows}
          status={card.status}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  statusTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  status: {
    fontSize: 14,
    color: "#16a34a",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  divider: {
    marginTop: 4,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  label: {
    width: "35%",
    fontSize: 12,
    color: "#9ca3af",
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
  },
  badgeWrap: {
    alignItems: "center",
    marginTop: 8,
  },
  badge: {
    width: 150,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    paddingVertical: 10,
  },
  badgeText: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  loadingWrap: {
    alignItems: "center",
    paddingVertical: 24,
  },
  loadingText: {
    marginTop: 8,
  },
  errorText: {
    color: "#dc2626",
  },
  emptyText: {
    color: "#6b7280",
    fontWeight: "600",
  },
});
