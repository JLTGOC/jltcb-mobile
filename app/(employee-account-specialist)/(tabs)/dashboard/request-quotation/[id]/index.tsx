import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import SharedQuotationDetails from "@/components/quote-section/SharedQuotationDetails";
import SharedQuotationDocuments from "@/components/quote-section/SharedQuotationDocuments";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useQuotationQuery } from "@/hooks/useQuotationQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { quotationKeys } from "@/query-key-factories/quotations";

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
        <SharedQuotationDetails
          quotationData={data}
          isPending={isPending}
          footer={
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
          }
        />
      ) : activeTab === "Documents" ? (
        <SharedQuotationDocuments />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 16,
    borderRadius: 6,
    backgroundColor: "#1C213B",
  },
  buttonLabel: {
    paddingVertical: 5,
    textTransform: "uppercase",
  },
  container: {
    marginHorizontal: 20,
  },
});
