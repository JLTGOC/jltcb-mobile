import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ClientCard from "@/components/quote-section/ClientCard";
import QuotationRequestDetailCard from "@/components/quote-section/QuotationRequestDetailCard";

import type { SelectedQuotationData } from "@/hooks/useQuotationQuery";
import { userQueryOptions } from "@/query-options/users/userQueryOptions";

interface SharedQuotationDetailsProps {
  quotationData?: SelectedQuotationData;
  isPending: boolean;
  footer?: ReactNode;
}

export default function SharedQuotationDetails({
  quotationData,
  isPending,
  footer,
}: SharedQuotationDetailsProps) {
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

      {footer}
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
  loader: {
    marginTop: 24,
    marginHorizontal: 20,
  },
});
