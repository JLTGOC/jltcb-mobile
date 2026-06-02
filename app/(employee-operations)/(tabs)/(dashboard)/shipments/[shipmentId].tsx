import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ClientCard from "@/components/quote-section/ClientCard";
import QuotationRequestDetailCard from "@/components/quote-section/QuotationRequestDetailCard";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useShipmentQuery } from "@/hooks/shipments/useShipmentQuery";
import { useQuotationDetailQuery } from "@/hooks/useQuotationDetailQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useUserQuery } from "@/hooks/useUserQuery";
import { shipmentKeys } from "@/query-key-factories/shipments";
import { userKeys } from "@/query-key-factories/users";

const TABS = ["details", "documents", "billing"] as const;
type TabType = (typeof TABS)[number];

export default function Shipment() {
  const { shipmentId, tab = "details" } = useLocalSearchParams<{
    shipmentId: string;
    tab?: TabType;
  }>();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isPending } = useShipmentQuery(Number(shipmentId));
  const clientId = data?.data?.general_info?.client?.id;
  const quotationId = data?.data?.general_info?.quotation_id?.toString();

  const { isPending: isQuotationDetailDataPending } =
    useQuotationDetailQuery(quotationId);
  const { isPending: isClientDataPending } = useUserQuery(clientId);

  const refreshActiveTab = async () => {
    if (!data) return;

    if (tab === "details") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: shipmentKeys.detail(Number(shipmentId)),
        }),
        queryClient.invalidateQueries({
          queryKey: userKeys.detail(clientId!),
        }),
      ]);
    } else if (tab === "documents") {
    } else if (tab === "billing") {
    }
  };

  const { isRefetchingByUser, refetchByUser } =
    useRefreshByUser(refreshActiveTab);

  if (isPending || isQuotationDetailDataPending || isClientDataPending)
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  const handleTabChange = (newTab: TabType) => {
    router.setParams({ tab: newTab });
  };

  return (
    <ScrollView
      overScrollMode="never"
      bounces={false}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <View>
        <BannerHeader
          variant="light"
          title={data?.data.general_info.reference_number ?? ""}
        />
        <TabBar tabs={TABS} onTabChange={handleTabChange} activeTab={tab} />
      </View>

      {tab === "details" && <ShipmentDetails />}
    </ScrollView>
  );
}

function ShipmentDetails() {
  const { shipmentId } = useLocalSearchParams<{
    shipmentId: string;
  }>();

  const { data } = useShipmentQuery(Number(shipmentId));
  const { data: quotationDetailData } = useQuotationDetailQuery(
    data?.data.general_info.quotation_id.toString(),
  );

  if (!data || !quotationDetailData) return null;

  return (
    <View style={styles.container}>
      <ClientCard
        clientId={data.data.general_info.client.id}
        conversationId={null}
      />

      {quotationDetailData.sections.map((section) => (
        <View key={section.title}>
          <QuotationRequestDetailCard section={section} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    gap: 12,
  },
});
