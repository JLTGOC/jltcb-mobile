import QuotationRequestDocumentCard from "@/src/components/quote-section/QuotationRequestDocumentCard";
import BannerHeader from "@/src/components/ui/BannerHeader";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import SuccesModal from "@/src/components/ui/SuccessModal";
import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { uploadQuotationFileMutationOptions } from "@/src/mutation-options/uploadQuotationFileMutationOptions";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMutation } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, HelperText, Portal, Text } from "react-native-paper";

type Props = {
  submitButtonText: string;
  confirmModalTitle?: string;
  confirmModalDescription?: string;
};

export default function Upload({
  submitButtonText,
  confirmModalTitle = "Send Quotation?",
  confirmModalDescription = "You’re about to send this quotation to the client. Please review all details carefully. Changes after sending will require a revised quotation.",
}: Props) {
  const { id, clientName } = useLocalSearchParams<{
    id: string;
    clientName: string;
  }>();
  const { userData } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const mutation = useMutation({
    ...uploadQuotationFileMutationOptions({ userId: String(userData?.id) }),
    onSettled: () => {
      setModalVisible(false);
    },
    onSuccess: () => {
      setSuccessModalVisible(true);
    },
  });

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleRemoveDocument = () => {
    setFile(null);
  };

  const handleSendQuotation = () => {
    if (file && id) {
      mutation.mutate({ quotationId: id, file });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <BannerHeader variant="light" title={clientName} />
      <View style={styles.content}>
        {file ? (
          <QuotationRequestDocumentCard
            document={{ file_name: file.name }}
            showRemoveButton
            onRemove={handleRemoveDocument}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              mutation.reset();
              handlePickDocument();
            }}
            style={styles.uploadButton}
          >
            <MaterialCommunityIcons
              name="file-upload-outline"
              size={70}
              color="#CDCBCB"
            />
            <Text variant="labelLarge" style={[styles.uppercase, styles.label]}>
              Upload a File
            </Text>
            <Text variant="bodySmall" style={[styles.uppercase, styles.link]}>
              Browse
            </Text>
          </TouchableOpacity>
        )}
        {mutation.error && (
          <HelperText type="error">
            {mutation.error.message.includes("413")
              ? "File too large."
              : mutation.error.message}
          </HelperText>
        )}
        <Button
          mode="contained"
          onPress={() => setModalVisible(true)}
          disabled={!file || mutation.isPending}
          style={styles.button}
          theme={{ colors: { surfaceDisabled: "#A3A7B3", primary: "#1C213B" } }}
          labelStyle={[styles.buttonLabel, styles.uppercase]}
        >
          {submitButtonText}
        </Button>
      </View>

      <Portal>
        <ConfirmModal
          loading={mutation.isPending}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={handleSendQuotation}
          title={confirmModalTitle}
          description={confirmModalDescription}
        />
        <SuccesModal
          onConfirm={() => {
            router.dismissAll();
            router.replace(routes.AS_DB);
            router.push(routes.AS_QUOTE_RESPONDED);
          }}
          visible={successModalVisible}
          title="Successfully Submitted!"
          description="We’ll notify you as soon as the client accepted the quotation!"
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
  },
  label: {
    color: "#CDCBCB",
  },
  uppercase: {
    textTransform: "uppercase",
  },
  link: {
    color: "#1969FF",
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#898989",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  button: {
    marginTop: "auto",
    borderRadius: 6,
    paddingVertical: 4,
  },
  buttonLabel: {
    color: "white",
  },
});
