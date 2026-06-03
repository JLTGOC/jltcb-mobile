import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ClientCard from "@/components/details/ClientCard";
import { DetailCard } from "@/components/details/DetailCard";

import { useQuotationDetailQuery } from "@/hooks/useQuotationDetailQuery";
import { useQuotationQuery } from "@/hooks/useQuotationQuery";
import { userQueryOptions } from "@/query-options/users/userQueryOptions";
import { useLocalSearchParams } from "expo-router";

interface SharedQuotationDetailsProps {
  footer?: ReactNode;
}

export default function SharedQuotationDetails({
  footer,
}: SharedQuotationDetailsProps) {
  const { quotationId } = useLocalSearchParams<{
    quotationId: string;
  }>();

  const { data: quotationData, isPending } = useQuotationQuery(quotationId);
  const { data: quotationDetailData, isPending: isQuotationDetailDataPending } =
    useQuotationDetailQuery(quotationId);
  const { data: clientData, isPending: isClientDataPending } = useQuery(
    userQueryOptions(quotationData?.data.client_id),
  );

  if (isPending || isQuotationDetailDataPending || isClientDataPending) {
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
    conversationId: quotationData.data.conversation_id,
  };

  return (
    <View style={styles.container}>
      <ClientCard {...clientCardData} />

      {quotationDetailData?.sections.map((section) => (
        <DetailCard.Root key={section.title}>
          <DetailCard.Title title={section.title} icon={section.icon} />
          <DetailCard.Content>
            {section.details.map(([label, value]) => (
              <DetailCard.Detail key={label + value}>
                <DetailCard.Label>{label}</DetailCard.Label>
                <DetailCard.Value>{value}</DetailCard.Value>
              </DetailCard.Detail>
            ))}
          </DetailCard.Content>
        </DetailCard.Root>
      ))}

      {footer}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 24,
    marginHorizontal: 20,
  },
});
