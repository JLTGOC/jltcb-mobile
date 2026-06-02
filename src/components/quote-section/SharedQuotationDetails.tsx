import { useLocalSearchParams } from "expo-router";
import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ClientCard from "@/components/quote-section/ClientCard";
import QuotationRequestDetailCard from "@/components/quote-section/QuotationRequestDetailCard";

import { useQuotationDetailQuery } from "@/hooks/useQuotationDetailQuery";
import { useQuotationQuery } from "@/hooks/useQuotationQuery";
import { useUserQuery } from "@/hooks/useUserQuery";

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
  const { isPending: isClientDataPending } = useUserQuery(
    quotationData?.data.client_id,
  );

  if (isPending || isQuotationDetailDataPending || isClientDataPending) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (!quotationData) {
    return null;
  }

  return (
    <View style={styles.contentContainer}>
      <View style={styles.container}>
        <ClientCard
          clientId={quotationData.data.client_id}
          conversationId={quotationData.data.conversation_id}
        />
      </View>

      {quotationDetailData?.sections.map((section) => (
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
