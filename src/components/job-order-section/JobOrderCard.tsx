import type { JobOrder } from "@/src/types/job-order";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import ArrowLine from "./ArrowLine";

const BADGE_COLORS = {
  "Regulatory Services": "#767676",
  "Logistics Services": "#4E6174",
};

interface JobOrderAction {
  label: string;
  onPress?: () => void;
}

interface JobOrderCardProps {
  jobOrder: JobOrder;
  onViewJo?: () => void;
  actions?: JobOrderAction[];
}

export default function JobOrderCard({
  jobOrder,
  onViewJo,
  actions = [],
}: JobOrderCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={24}
          color="black"
        />
        <View style={styles.cardTitleContainer}>
          <Text style={[styles.cardTitleHeader, styles.uppercase]}>
            Reference No
          </Text>
          <Text style={[styles.cardTitle, styles.uppercase]}>
            {jobOrder.reference_number || "Job Order"}
          </Text>
        </View>
        <Text
          style={[
            styles.cardBadge,
            { backgroundColor: BADGE_COLORS[jobOrder.service] || "#E0E0E0" },
          ]}
        >
          {jobOrder.service}
        </Text>
      </View>

      <View style={styles.cardContent}>
        <Text style={[styles.cardContentTitle, styles.uppercase]}>
          {jobOrder.client}
        </Text>
        <View style={{ gap: 4 }}>
          <View style={styles.contentDetailRow}>
            <Text
              variant="labelSmall"
              style={[styles.cardContentDesc, styles.uppercase, styles.column]}
            >
              Date Created
            </Text>
            <ArrowLine style={styles.arrow} />
            <Text
              variant="labelSmall"
              style={[styles.cardContentDesc, styles.uppercase, styles.column]}
            >
              {jobOrder.date_created}
            </Text>
          </View>

          <View style={styles.contentDetailRow}>
            <Text
              variant="labelSmall"
              style={[styles.cardContentDesc, styles.uppercase, styles.column]}
            >
              Quatation Source
            </Text>
            <ArrowLine style={styles.arrow} />
            <Text
              variant="labelSmall"
              style={[styles.cardContentDesc, styles.uppercase, styles.column]}
            >
              {jobOrder.quotation_reference_number}
            </Text>
          </View>

          {jobOrder.assigned_to !== "Available" && (
            <View style={styles.contentDetailRow}>
              <Text
                variant="labelSmall"
                style={[
                  styles.cardContentDesc,
                  styles.uppercase,
                  styles.column,
                ]}
              >
                Assigned To
              </Text>
              <ArrowLine style={styles.arrow} />
              <Text
                variant="labelSmall"
                style={[
                  styles.cardContentDesc,
                  styles.uppercase,
                  styles.column,
                  { color: "#4A7AFF" },
                ]}
              >
                {jobOrder.assigned_to}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Button
          labelStyle={[styles.uppercase, styles.cardFooterButtonLabel]}
          style={styles.cardFooterButton}
          onPress={onViewJo}
        >
          View JO
        </Button>
        {actions.map((action, index) => (
          <Button
            key={index}
            labelStyle={[styles.uppercase, styles.cardFooterButtonLabel]}
            style={[
              styles.cardFooterButton,
              { borderLeftWidth: 2, borderColor: "#F5F5F5" },
            ]}
            onPress={action.onPress}
          >
            {action.label}
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowRadius: 7,
    shadowOpacity: 0.25,
    boxShadow: "0 0 7px 0 rgba(0, 0, 0, 0.25)",
    borderRadius: 10,
    paddingTop: 12,
    backgroundColor: "white",
    gap: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderColor: "#F5F5F5",
    paddingBottom: 8,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitleHeader: {
    color: "#666666",
    fontSize: 12,
  },
  cardTitle: {},
  cardBadge: {
    backgroundColor: "#E0E0E0",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 15,
    color: "white",
    fontSize: 12,
  },
  cardContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  contentDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  column: {
    flex: 2,
  },
  arrow: {
    flex: 1,
    marginRight: 4,
  },
  cardContentTitle: {},
  cardContentDesc: {
    fontSize: 12,
    color: "#9D9D9D",
  },
  cardFooter: {
    flexDirection: "row",
    borderTopWidth: 2,
    borderColor: "#F5F5F5",
  },
  cardFooterButton: {
    flex: 1,
    borderRadius: 0,
  },
  cardFooterButtonLabel: {
    paddingVertical: 4,
    color: "#898989",
    fontSize: 12,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  divider: {
    height: 3,
    backgroundColor: "#F5F5F5",
  },
});
