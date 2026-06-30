<<<<<<< HEAD
import QuotationRequestDocumentCard from "@/src/components/quote-section/QuotationRequestDocumentCard";
import BannerHeader from "@/src/components/ui/BannerHeader";
import ConfirmModal from "@/src/components/ui/ConfirmModal";
import SuccesModal from "@/src/components/ui/SuccessModal";
import { routes } from "@/src/constants/routes";
import { useAuth } from "@/src/hooks/useAuth";
import { uploadQuotationFileMutationOptions } from "@/src/mutation-options/asLead-quotations/uploadQuotationFileMutationOptions";
=======
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import { AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useQuery } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
<<<<<<< HEAD
import { StyleSheet, Pressable, View } from "react-native";
=======
import { Pressable, StyleSheet, View } from "react-native";
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
import { Button, HelperText, Portal, Text } from "react-native-paper";

import QuotationRequestDocumentCard from "@/components/quote-section/QuotationRequestDocumentCard";
import BannerHeader from "@/components/ui/BannerHeader";
import ConfirmModal from "@/components/ui/ConfirmModal";
import SuccesModal from "@/components/ui/SuccessModal";

import { routes } from "@/constants/routes";
import { THEMES } from "@/constants/themes";
import { useUploadQuotationFileMutation } from "@/hooks/mutations/quotations/files/useUploadQuotationFileMutation";
import { quotationQueries } from "@/queries/quotations";
import type { QuotationStatus } from "@/types/quotations";

type Props = {
  submitButtonText: string;
  confirmModalTitle: string;
  confirmModalDescription: string;
};

export default function Upload({
  submitButtonText,
  confirmModalTitle,
  confirmModalDescription,
}: Props) {
  const { quotationId, status = "requested" } = useLocalSearchParams<{
    quotationId: string;
    status?: Lowercase<QuotationStatus>;
  }>();
  const { data } = useQuery(quotationQueries.detail(Number(quotationId)));
  const router = useRouter();
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(
    null,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const mutation = useUploadQuotationFileMutation(
    status.toUpperCase() as QuotationStatus,
  );

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
    if (file && quotationId) {
      mutation.mutate(
        { quotationId: Number(quotationId), file },
        {
          onSettled: () => {
            setModalVisible(false);
          },
          onSuccess: () => {
            setSuccessModalVisible(true);
          },
        },
      );
    }
  };

  return (
    <View style={styles.container}>
      <BannerHeader variant="light" title={data?.data.client ?? ""} />
      <View style={styles.content}>
        {file ? (
          <QuotationRequestDocumentCard
            document={{ file_name: file.name }}
            showRemoveButton
            onRemove={handleRemoveDocument}
          />
        ) : (
          <Pressable
            onPress={() => {
              mutation.reset();
              handlePickDocument();
            }}
            style={({ pressed }) => [
              styles.uploadButton,
              {
                opacity: pressed ? 0.7 : 1,
              },
            ]}
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
          </Pressable>
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
          icon={<AntDesign name="warning" size={100} color="red" />}
          confirmButtonText="Yes"
          cancelButtonText="Cancel"
          loading={mutation.isPending}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={handleSendQuotation}
          title={confirmModalTitle}
          description={confirmModalDescription}
        />
        <SuccesModal
          onConfirm={() => {
            setSuccessModalVisible(false);
<<<<<<< HEAD
            router.dismissAll();
=======
            router.dismissTo("/dashboard");
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
            router.navigate(routes.AS_QUOTE_RESPONDED);
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
  container: {
    flex: 1,
    backgroundColor: THEMES.pageBackgroundColor,
  },
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
