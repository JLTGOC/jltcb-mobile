import QuotationRequestDocumentCard from "@/src/components/quote-section/QuotationRequestDocumentCard";
import { fetchClientQuote, updateClientQuote } from "@/src/services/clientQuotation";
import { ClientFile, QuoteForm } from "@/src/types/client-type";
import { handleFileOpen } from "@/src/utils/handleFileOpen";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, FAB, Text } from "react-native-paper";

type Props = {
  quotationId?: string;
};
export default function Details({ quotationId }: Props) {
  const queryClient = useQueryClient();
  const [uploadError, setUploadError] = useState<string | null>(null);

  //fetch the single quotation details
  const { data, isLoading, error } = useQuery<QuoteForm>({
    queryKey: [quotationId],
    queryFn: () => fetchClientQuote(Number(quotationId)),
    enabled: !!quotationId,
  });

  const addDocumentsMutation = useMutation({
    mutationFn: async (newDocuments: ClientFile[]) => {
      const quoteId = Number(quotationId);

      if (!quoteId || !data) {
        throw new Error("Missing quotation data for document upload.");
      }

      return updateClientQuote(quoteId, {
        ...data,
        documents: newDocuments,
      });
    },
    onSuccess: async () => {
      setUploadError(null);
      await queryClient.invalidateQueries({ queryKey: [quotationId] });
    },
    onError: (mutationError: unknown) => {
      const message =
        mutationError instanceof Error
          ? mutationError.message
          : "Failed to upload document.";
      setUploadError(message);
    },
  });

  const handleAddDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (result.canceled || !result.assets.length) {
        return;
      }

      const selectedDocuments: ClientFile[] = result.assets.map((asset, index) => ({
        id: Date.now() + index,
        file_name: asset.name,
        file_url: asset.uri,
        mimeType: asset.mimeType || "application/octet-stream",
      }));

      await addDocumentsMutation.mutateAsync(selectedDocuments);
    } catch (pickerError) {
      const message =
        pickerError instanceof Error
          ? pickerError.message
          : "Failed to select documents.";
      setUploadError(message);
    }
  };

  const documents = Array.isArray(data?.documents) ? data.documents : null;

  if (isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator animating={true} />
        <Text style={{ marginTop: 10, textAlign: "center" }}>
          Fetching quote details...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {documents ? (
          documents.map((files, index) => (
            <Pressable
              key={files.id}
              style={({ pressed }) => [
                index < documents.length - 1 && styles.documentRow,
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={() => handleFileOpen(files.file_url)}
            >
              <QuotationRequestDocumentCard
                document={{
                  ...files,
                  file_name: decodeURIComponent(files.file_name),
                }}
              />
            </Pressable>
          ))
        ) : (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text
              style={[styles.content, { color: "#666", fontStyle: "italic" }]}
            >
              {typeof data?.documents === "string"
                ? data.documents
                : "No documents available."}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.footerContainer}>
        {data?.status === "RESPONDED" &&
          data?.quotation_file?.[0]?.file_url && (
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                buttonColor="#161F3C"
                textColor="white"
                style={{ borderRadius: 4 }}
                onPress={() =>
                  handleFileOpen(data?.quotation_file?.[0]?.file_url)
                }
              >
                VIEW QUOTATION
              </Button>
            </View>
          )}
      </View>
      <View style={styles.bottomBar}>
        <FAB
          icon="plus"
          color="white"
          style={styles.addButton}
          loading={addDocumentsMutation.isPending}
          disabled={addDocumentsMutation.isPending || !data}
          onPress={handleAddDocuments}
        />
      </View>
      {uploadError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{uploadError}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    width: "100%",
  },
  cardsContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  footerContainer: {
    paddingBottom: 12,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 12,
    paddingBottom: 12,
    width: "100%",
  },
  emptySpace: {
    flex: 1,
  },
  documentRow: {
    marginBottom: 8,
  },
  buttonContainer: {
    marginBottom: 12,
    width: "90%",
    alignSelf: "center",
  },
  content: {
    fontSize: 12,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: "#FF9933",
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  errorContainer: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: 8,
  },
  errorText: {
    color: "#B00020",
    fontSize: 12,
  },
});
