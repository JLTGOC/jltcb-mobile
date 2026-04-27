import { useQuery } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";

import ClientCard from "@/src/components/quote-section/ClientCard";
import QuotationRequestDetailCard from "@/src/components/quote-section/QuotationRequestDetailCard";

import type { SelectedQuotationData } from "@/src/hooks/useQuotationQuery";
import { userQueryOptions } from "@/src/query-options/users/userQueryOptions";

interface SharedQuotationDetailsProps {
  quotationData?: SelectedQuotationData;
  isPending: boolean;
}

export default function SharedQuotationDetails({
  quotationData,
  isPending,
}: SharedQuotationDetailsProps) {
  const { id, clientName } = useLocalSearchParams<{
    id: string;
    clientName: string;
  }>();

  const { data: clientData, isPending: isClientDataPending } = useQuery(
    userQueryOptions(quotationData?.clientId.toString() ?? ""),
  );

  if (isPending || isClientDataPending) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!quotationData || !clientData) {
    return null;
  }

  const clientCardData = {
    fullName: clientData.data.full_name,
    userImage: clientData.data.image_path,
    companyName: clientData.data.company_name,
    contactNumber: clientData.data.contact_number,
    email: clientData.data.email,
    conversationId: quotationData.conversationId,
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.container}>
        <ClientCard {...clientCardData} />
      </View>

      {quotationData.sections.map((section) => (
        <View key={section.title} style={styles.container}>
          <QuotationRequestDetailCard section={section} />
        </View>
      ))}

      <Link
        asChild
        href={{
          pathname: "/dashboard/request-quotation/[id]/upload",
          params: { id, clientName },
        }}
        style={[styles.button, styles.container]}
      >
        <Button mode="contained" labelStyle={styles.buttonLabel}>
          Upload Quotation
        </Button>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  contentContainer: {
    gap: 8,
    flexGrow: 1,
  },
  button: {
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: "#1C213B",
  },
  buttonLabel: {
    paddingVertical: 5,
    textTransform: "uppercase",
  },
  loader: {
    marginTop: 24,
    marginHorizontal: 20,
  },
});
