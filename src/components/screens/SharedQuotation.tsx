import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RefreshControl, ScrollView, Text, View } from "react-native";

import SharedQuotationDetails from "@/components/quote-section/SharedQuotationDetails";
import SharedQuotationDocuments from "@/components/quote-section/SharedQuotationDocuments";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useQuotationBannerTitle } from "@/hooks/useQuotationBannerTitle";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { quotationQueries } from "@/queries/quotations";
import { quotationFileQueries } from "@/queries/quotations/files";
import { userQueries } from "@/queries/users";

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

  const { data: quotationData } = useQuery(
    quotationQueries.detail(Number(quotationId)),
  );
  const bannerTitle = useQuotationBannerTitle(quotationData?.data);

  const refreshActiveTab = async () => {
    if (!quotationData) return;

    if (activeTab === "details") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: quotationQueries.detail(Number(quotationId)).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: userQueries.detail(Number(quotationData.data.client_id))
            .queryKey,
        }),
      ]);
    } else if (activeTab === "documents") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: quotationFileQueries.list(Number(quotationId), "REQUESTED")
            .queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: quotationFileQueries.list(Number(quotationId), "PROPOSAL")
            .queryKey,
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
