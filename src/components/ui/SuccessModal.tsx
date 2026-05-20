import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import type { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, type ModalProps } from "react-native-paper";

interface SuccesModalProps extends Omit<ModalProps, "children"> {
  icon?: ReactElement;
  buttonText?: string;
  title: string;
  description: string;
  onConfirm: () => void;
}

export default function SuccesModal({
  icon = (
    <MaterialCommunityIcons
      name="clipboard-check-outline"
      color="#0B8600"
      size={90}
    />
  ),
  buttonText = "OK",
  onDismiss,
  onConfirm,
  contentContainerStyle,
  title,
  description,
  ...props
}: SuccesModalProps) {
  return (
    <Modal
      contentContainerStyle={[styles.modalContainer, contentContainerStyle]}
      onDismiss={onDismiss}
      {...props}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalIcon}>{icon}</View>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalText}>{description}</Text>
      </View>
      <View style={styles.modalActions}>
        <Button
          onPress={onConfirm}
          textColor="#898989"
          labelStyle={[styles.uppercase, styles.modalButtonLabel]}
          style={styles.modalButton}
        >
          {buttonText}
        </Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  uppercase: {
    textTransform: "uppercase",
  },
  modalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 6,
    alignItems: "center",
  },
  modalContent: {
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  modalIcon: {
    padding: 14,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    flex: 1,
    borderRadius: 0,
  },
  modalButtonLabel: {
    paddingVertical: 6,
  },
  modalActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#D9D9D9",
  },
});
