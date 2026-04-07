import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";

type Props = {
  referenceNumber: string;
  serviceType: string;
  clientName: string;
  dateCreated: string;
  quotationSource: string;
  assignedTo: string;
  assignedColor?: string;
  leftActionLabel?: string;
  rightActionLabel?: string;
  onPressLeftAction?: () => void;
  onPressRightAction?: () => void;
};

export default function JobOrderCardTemplate({
  referenceNumber,
  serviceType,
  clientName,
  dateCreated,
  quotationSource,
  assignedTo,
  assignedColor,
  leftActionLabel = "VIEW JO",
  rightActionLabel,
  onPressLeftAction,
  onPressRightAction,
}: Props) {
  return (
    <Card style={styles.card} mode="elevated" elevation={1}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <View style={styles.referenceGroup}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={20}
              color="#151515"
              style={styles.headerIcon}
            />
            <View>
              <Text style={styles.metaLabel}>REFERENCE NO</Text>
              <Text style={styles.referenceNumber}>{referenceNumber}</Text>
            </View>
          </View>

          <View style={styles.servicePill}>
            <Text style={styles.serviceText}>{serviceType}</Text>
          </View>
        </View>

        <Divider style={styles.horizontalDivider} />

        <Text style={styles.clientName}>{clientName}</Text>

        <View style={styles.detailsContainer}>
          <InfoRow label="DATE CREATED" value={dateCreated} />
          <InfoRow label="QUOTATION SOURCE" value={quotationSource} />
          <InfoRow
            label="ASSIGNED"
            value={assignedTo}
            valueStyle={{ color: assignedColor, fontWeight: "700" }}
          />
        </View>
      </Card.Content>

      <Divider style={styles.bottomDivider} />

      <View style={styles.actionsRow}>
        <Pressable
          onPress={onPressLeftAction}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.actionText}>{leftActionLabel}</Text>
        </Pressable>

        <View style={styles.actionDivider} />

        <Pressable
          onPress={onPressRightAction}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.actionText}>{rightActionLabel}</Text>
        </Pressable>
      </View>
    </Card>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
  valueStyle?: object;
};

function InfoRow({ label, value, valueStyle }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>

      <View style={styles.connectorWrap}>
        <View style={styles.connectorDot} />
        <View style={styles.connectorLine} />
        <MaterialCommunityIcons
          name="arrow-right-thin"
          size={18}
          color="#9A9A9A"
        />
      </View>

      <Text style={[styles.infoValue, valueStyle]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    marginVertical: 8,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 8,
  },
  referenceGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  headerIcon: {
    marginTop: -1,
  },
  metaLabel: {
    fontSize: 8,
    color: "#9A9A9A",
    lineHeight: 10,
    letterSpacing: 0.2,
  },
  referenceNumber: {
    fontSize: 13,
    color: "#1E1E1E",
    fontWeight: "500",
    lineHeight: 17,
  },
  servicePill: {
    backgroundColor: "#697A8E",
    borderRadius: 999,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  serviceText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },
  horizontalDivider: {
    backgroundColor: "#E3E3E3",
    height: 1,
    marginHorizontal: -12,
  },
  clientName: {
    marginTop: 8,
    marginBottom: 4,
    color: "#252525",
    fontSize: 13,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  detailsContainer: {
    marginTop: 4,
    gap: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  infoLabel: {
    width: 92,
    fontSize: 8,
    color: "#8E8E8E",
  },
  connectorWrap: {
    flexDirection: "row",
    alignItems: "center",
    width: 76,
    marginHorizontal: 6,
  },
  connectorDot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#8A8A8A",
  },
  connectorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#A8A8A8",
    marginHorizontal: 4,
    marginTop: 1,
  },
  infoValue: {
    flex: 1,
    textAlign: "left",
    fontSize: 8,
    color: "#8E8E8E",
    textTransform: "uppercase",
  },
  bottomDivider: {
    backgroundColor: "#E3E3E3",
    height: 1,
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "stretch",
    height: 38,
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  actionText: {
    color: "#7F7F7F",
    fontSize: 11,
    fontWeight: "500",
  },
  actionDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "#E3E3E3",
  },
});
