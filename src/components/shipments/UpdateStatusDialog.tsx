import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import {
  Button,
  Dialog,
  RadioButton,
  Text,
  type DialogProps,
} from "react-native-paper";

import { ShipmentStatuses } from "@/constants/shipments";
import type { ShipmentStatus, UpdateShipmentPayload } from "@/types/shipments";

const BorderColor = "#D9D9D9";

interface Props extends Omit<DialogProps, "children"> {
  initialStatus: ShipmentStatus;
  onUpdate: (payload: UpdateShipmentPayload) => void;
  loading?: boolean;
}

export default function UpdateStatusDialog({
  visible,
  initialStatus,
  style,
  onUpdate,
  loading,
  ...props
}: Props) {
  const [radioValue, setRadioValue] = useState<ShipmentStatus>(initialStatus);

  useEffect(() => {
    if (visible) {
      setRadioValue(initialStatus);
    }
  }, [visible, initialStatus]);

  return (
    <Dialog visible={visible} style={[styles.container, style]} {...props}>
      <Dialog.Title style={styles.title}>Update Shipment Status</Dialog.Title>
      <Dialog.Content style={styles.content}>
        <RadioButton.Group
          onValueChange={(value) => setRadioValue(value as ShipmentStatus)}
          value={radioValue}
        >
          <View style={styles.radioButtonGroup}>
            {ShipmentStatuses.map((status) => (
              <Pressable
                key={status}
                style={styles.radioButtonItemContainer}
                onPress={() =>
                  setRadioValue(status.toUpperCase() as ShipmentStatus)
                }
              >
                <View style={styles.radioButtonContainer}>
                  <RadioButton.Android
                    pointerEvents="none"
                    value={status.toUpperCase()}
                    status="checked"
                    color="#FF9933"
                  />
                </View>
                <Text style={styles.radioButtonLabel}>{status}</Text>
              </Pressable>
            ))}
          </View>
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions style={styles.actions}>
        <Button
          style={styles.actionButton}
          labelStyle={styles.actionButtonLabel}
          mode="text"
          onPress={() => {
            onUpdate({ status: radioValue });
          }}
          loading={loading}
          disabled={loading}
        >
          Update Status
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    color: "#666",
    textTransform: "uppercase",
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: BorderColor,
    paddingVertical: 4,
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: 0,
  },
  content: {
    paddingBottom: 0,
    paddingHorizontal: 8,
  },
  radioButtonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioButtonItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  radioButtonContainer: {
    transform: [{ scale: 0.8 }],
  },
  radioButtonLabel: {
    fontSize: 14,
    textAlign: "left",
  },
  actions: {
    borderTopWidth: 1,
    borderTopColor: BorderColor,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
  actionButton: {
    flex: 1,
    borderRadius: 0,
  },
  actionButtonLabel: {
    color: "#898989",
    paddingVertical: 4,
    textTransform: "uppercase",
  },
});
