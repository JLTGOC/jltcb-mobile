import { AntDesign } from "@expo/vector-icons";
import type { ReactElement } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Modal, type ModalProps } from "react-native-paper";

interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  icon?: ReactElement;
  loading?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmModal({
  icon = <AntDesign name="warning" size={100} color="red" />,
  loading,
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel",
  onConfirm,
  title,
  description,
  onDismiss,
  contentContainerStyle,
  ...props
}: ConfirmModalProps) {
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
          loading={loading}
          onPress={onConfirm}
          textColor="#898989"
          labelStyle={[styles.uppercase, styles.modalButtonLabel]}
          style={styles.modalButton}
        >
          {confirmButtonText}
        </Button>
        <Button
          textColor="#898989"
          labelStyle={[styles.uppercase, styles.modalButtonLabel]}
          onPress={onDismiss}
          style={[
            styles.modalButton,
            { borderLeftWidth: 1, borderColor: "#D9D9D9" },
          ]}
        >
          {cancelButtonText}
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
    textAlign: "center",
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
