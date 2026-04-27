import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import QuotationRequestDocumentCard from "@/src/components/quote-section/QuotationRequestDocumentCard";
import { useClientQuotationDocumentsQuery } from "@/src/hooks/useClientQuotationDocumentsQuery";
import { useCompanyQuotationDocumentsQuery } from "@/src/hooks/useCompanyQuotationDocumentsQuery";
import { useRenameQuotationDocumentMutation } from "@/src/hooks/useRenameQuotationDocumentMutation";

export default function SharedQuotationDocuments() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { data: clientDocumentsData, isPending: isClientDocumentsPending } =
    useClientQuotationDocumentsQuery(id);
  const { data: companyDocumentsData, isPending: isCompanyDocumentsPending } =
    useCompanyQuotationDocumentsQuery(id);

  const { mutate } = useRenameQuotationDocumentMutation(id);

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
                  onRename={(fileName) =>
                    mutate({
                      documentId: item.id,
                      fileName,
                      type: section.title.toLocaleLowerCase().includes("client")
                        ? "client"
                        : "company",
                    })
                  }
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
