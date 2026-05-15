import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

import SharedQuotationDetails from "@/components/quote-section/SharedQuotationDetails";
import SharedQuotationDocuments from "@/components/quote-section/SharedQuotationDocuments";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useQuotationQuery } from "@/hooks/useQuotationQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { quotationKeys } from "@/query-key-factories/quotations";

const TABS = ["Details", "Documents", "Billing"] as const;
type TabType = (typeof TABS)[number];

export default function JobOrderQuotation() {
  const queryClient = useQueryClient();

  const { id, clientName } = useLocalSearchParams<{
    id: string;
    clientName: string;
  }>();

  const [activeTab, setActiveTab] = useState<TabType>("Details");

  const { data, isPending, refetch } = useQuotationQuery(id);

  useRefreshOnFocus(refetch);

  const refreshActiveTab = async () => {
    if (activeTab === "Documents") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getClientQuotationDocuments(id),
        }),
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getCompanyQuotationDocuments(id),
        }),
      ]);
      return;
    }

    await refetch();
  };

  const { isRefetchingByUser, refetchByUser } =
    useRefreshByUser(refreshActiveTab);

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
        <BannerHeader variant="light" title={clientName} />
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {activeTab === "Details" ? (
        <SharedQuotationDetails quotationData={data} isPending={isPending} />
      ) : activeTab === "Documents" ? (
        <SharedQuotationDocuments />
      ) : activeTab === "Billing" ? (
        <View>
          <Text style={{ textAlign: "center" }}>
            Billing information will be displayed here.
          </Text>
        </View>
      ) : null}
    </ScrollView>
  );
}
