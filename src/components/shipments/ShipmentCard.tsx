import {
  createContext,
  use,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { StyleSheet, View } from "react-native";

import { Card } from "@/components/ui/Card";

import { ShipmentStatusColors } from "@/constants/shipments";
import type { ShipmentSummary } from "@/types/shipments";
import { Text, type TextProps } from "react-native-paper";
import { RecordCard } from "../ui/RecordCard";

interface ShipmentState {
  shipment: ShipmentSummary;
}

interface ShipmentCardContextValue {
  state: ShipmentState;
}

const ShipmentCardContext = createContext<ShipmentCardContextValue | null>(
  null,
);

function useShipmentCardContext() {
  const context = use(ShipmentCardContext);
  if (!context) {
    throw new Error(
      "ShipmentCard compound components cannot be rendered outside the ShipmentCard component",
    );
  }
  return context;
}

function ShipmentCardProvider({
  children,
  shipment,
}: PropsWithChildren<ShipmentState>) {
  return (
    <ShipmentCardContext value={{ state: { shipment } }}>
      {children}
    </ShipmentCardContext>
  );
}

function ShipmentCardTitle() {
  const {
    state: { shipment },
  } = useShipmentCardContext();

  return (
    <Card.Title>
      <Text style={[styles.titleHeader, styles.uppercase]}>Reference No</Text>
      <Text style={[styles.title, styles.uppercase]}>
        {shipment.general_info.reference_number}
      </Text>
    </Card.Title>
  );
}

function ShipmentCardStatus() {
  const {
    state: { shipment },
  } = useShipmentCardContext();

  const status = shipment.general_info.status;

  const statusColor = ShipmentStatusColors[status];

  return (
    <View style={styles.statusContainer}>
      <Text style={[styles.titleHeader, styles.uppercase]}>Status</Text>
      <Text
        style={[
          styles.titleHeader,
          styles.uppercase,
          styles.status,
          statusColor && { color: statusColor },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

function ShipmentCardContentTitle({
  style,
  ...props
}: Omit<TextProps<never>, "children">) {
  const {
    state: { shipment },
  } = useShipmentCardContext();

  return (
    <Text style={[styles.contentTitle, styles.uppercase, style]} {...props}>
      {shipment.general_info.client}
    </Text>
  );
}

interface ShipmentCardDetailValueProps extends Omit<
  TextProps<never>,
  "children"
> {
  getValue: (shipment: ShipmentSummary) => ReactNode;
}

function ShipmentCardDetailValue({
  getValue,
  ...props
}: ShipmentCardDetailValueProps) {
  const {
    state: { shipment },
  } = useShipmentCardContext();

  return (
    <RecordCard.DetailText {...props}>
      {getValue(shipment)}
    </RecordCard.DetailText>
  );
}

export const ShipmentCard = {
  Provider: ShipmentCardProvider,
  Title: ShipmentCardTitle,
  Status: ShipmentCardStatus,
  ContentTitle: ShipmentCardContentTitle,
  DetailValue: ShipmentCardDetailValue,
};

const styles = StyleSheet.create({
  uppercase: {
    textTransform: "uppercase",
  },

  titleHeader: {
    color: "#666666",
    fontSize: 12,
  },
  statusContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  status: {
    fontSize: 13,
  },
  title: {},
  contentTitle: {},
});
