import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import QuotationRequestDocumentCard from "@/components/quote-section/QuotationRequestDocumentCard";

import { useRenameQuotationDocumentMutation } from "@/hooks/mutations/quotations/useRenameQuotationDocumentMutation";
import { quotationFileQueries } from "@/queries/quotations/files";
import type { QuotationFileType } from "@/types/quotations";

export default function SharedQuotationDocuments() {
  const { quotationId } = useLocalSearchParams<{
    quotationId: string;
  }>();

  const queryClient = useQueryClient();
  const { data: clientDocumentsData, isPending: isClientDocumentsPending } =
    useQuery(quotationFileQueries.list(Number(quotationId), "REQUESTED"));
  const { data: companyDocumentsData, isPending: isCompanyDocumentsPending } =
    useQuery(quotationFileQueries.list(Number(quotationId), "PROPOSAL"));

  const { mutate: rename } = useRenameQuotationDocumentMutation(
    Number(quotationId),
  );

  const handleRename = ({
    documentId,
    fileName,
    quotationFileType,
  }: {
    documentId: number;
    fileName: string;
    quotationFileType: QuotationFileType;
  }) => {
    rename(
      {
        documentId,
        fileName,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: quotationFileQueries.list(
              Number(quotationId),
              quotationFileType,
            ).queryKey,
          });
        },
      },
    );
  };

  if (isClientDocumentsPending || isCompanyDocumentsPending) {
    return <ActivityIndicator style={styles.loader} />;
  }

  const sections = [
    {
      title: "Uploaded by Client",
      data: clientDocumentsData?.data ?? [],
      emptyMessage: "No documents available.",
    },
    {
      title: "Uploaded by JLTCB",
      data: companyDocumentsData?.data ?? [],
      emptyMessage: "No files available.",
    },
  ];

  return (
    <View style={styles.contentContainer}>
      {sections.map((section) => (
        <View key={section.title}>
          <Text style={styles.sectionHeader}>{section.title}</Text>

          {section.data.length ? (
            section.data.map((item) => (
              <View key={item.id.toString()} style={styles.container}>
                <QuotationRequestDocumentCard
                  document={item}
                  onRename={(fileName) => {
                    const quotationFileType = section.title
                      .toLocaleLowerCase()
                      .includes("client")
                      ? "REQUESTED"
                      : "PROPOSAL";

                    handleRename({
                      documentId: item.id,
                      fileName,
                      quotationFileType,
                    });
                  }}
                />
              </View>
            ))
          ) : (
            <Text style={styles.container}>{section.emptyMessage}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 18,
  },
  container: {
    marginHorizontal: 20,
  },
  loader: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  sectionHeader: {
    textTransform: "uppercase",
    color: "#4E6174",
    marginHorizontal: 20,
    marginBottom: 5,
  },
});
