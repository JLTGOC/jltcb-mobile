import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RefreshControl, ScrollView, Text, View } from "react-native";

import SharedQuotationDetails from "@/components/quote-section/SharedQuotationDetails";
import SharedQuotationDocuments from "@/components/quote-section/SharedQuotationDocuments";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useQuotationBannerTitle } from "@/hooks/useQuotationBannerTitle";
import { useQuotationQuery } from "@/hooks/useQuotationQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { quotationKeys } from "@/query-key-factories/quotations";
import { userKeys } from "@/query-key-factories/users";

const TABS = ["details", "documents", "billing"] as const;
type TabType = (typeof TABS)[number];

export default function SharedQuotation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { quotationId, tab = "details" } = useLocalSearchParams<{
    quotationId: string;
    tab?: TabType;
  }>();

  const activeTab = TABS.includes(tab as TabType)
    ? (tab as TabType)
    : "details";

  const { data: quotationData } = useQuotationQuery(quotationId);
  const bannerTitle = useQuotationBannerTitle(quotationData?.data);

  const refreshActiveTab = async () => {
    if (activeTab === "details") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getQuotation(quotationId),
        }),
        queryClient.invalidateQueries({
          queryKey: userKeys.detail(Number(quotationData?.data.client_id)),
        }),
      ]);
    } else if (activeTab === "documents") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getClientQuotationDocuments(quotationId),
        }),
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getCompanyQuotationDocuments(quotationId),
        }),
      ]);
    }
  };

  const { isRefetchingByUser, refetchByUser } =
    useRefreshByUser(refreshActiveTab);

  const handleTabChange = (newTab: TabType) => {
    router.setParams({ tab: newTab });
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 16 }}
      bounces={false}
      overScrollMode="never"
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <View style={{ paddingBottom: 10 }}>
        <BannerHeader variant="light" title={bannerTitle} />
        <TabBar
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>

      {activeTab === "details" ? (
        <SharedQuotationDetails />
      ) : activeTab === "documents" ? (
        <SharedQuotationDocuments />
      ) : activeTab === "billing" ? (
        <View>
          <Text style={{ textAlign: "center" }}>
            Billing information will be displayed here.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
