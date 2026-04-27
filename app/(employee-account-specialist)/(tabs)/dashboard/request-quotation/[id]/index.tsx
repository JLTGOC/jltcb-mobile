import { useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import SharedQuotationDetails from "@/src/components/quote-section/SharedQuotationDetails";
import SharedQuotationDocuments from "@/src/components/quote-section/SharedQuotationDocuments";
import TabBar from "@/src/components/tabs-ui/TabBar";
import BannerHeader from "@/src/components/ui/BannerHeader";

import { useQuotationQuery } from "@/src/hooks/useQuotationQuery";
import { useRefreshByUser } from "@/src/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/src/hooks/useRefreshOnFocus";
import { quotationKeys } from "@/src/query-key-factories/quotations";

const TABS = ["Details", "Documents"] as const;
type TabType = (typeof TABS)[number];

export default function Quotation() {
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
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: 16 }}
      bounces={false}
      overScrollMode="never"
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <View>
        <BannerHeader variant="light" title={clientName} />
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {activeTab === "Details" ? (
        <SharedQuotationDetails quotationData={data} isPending={isPending} />
      ) : activeTab === "Documents" ? (
        <SharedQuotationDocuments />
      ) : null}
    </ScrollView>
  );
}
