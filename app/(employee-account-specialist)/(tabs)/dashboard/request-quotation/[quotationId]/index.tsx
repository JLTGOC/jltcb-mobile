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
import { quotationKeys } from "@/query-key-factories/quotations";
import { userKeys } from "@/query-key-factories/users";

const TABS = ["Details", "Documents"] as const;
type TabType = (typeof TABS)[number];

export default function Quotation() {
  const queryClient = useQueryClient();

  const { quotationId } = useLocalSearchParams<{
    quotationId: string;
  }>();
  const [activeTab, setActiveTab] = useState<TabType>("Details");

  const { data, refetch } = useQuotationQuery(quotationId);

  const refreshActiveTab = async () => {
    if (activeTab === "Details") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: userKeys.detail(Number(data?.data.client_id)),
        }),
        refetch(),
      ]);
    } else if (activeTab === "Documents") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getClientQuotationDocuments(quotationId),
        }),
        queryClient.invalidateQueries({
          queryKey: quotationKeys.getCompanyQuotationDocuments(quotationId),
        }),
      ]);
      return;
    }
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
        <BannerHeader variant="light" title={data?.data.client ?? ""} />
        <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </View>

      {activeTab === "Details" ? (
        <SharedQuotationDetails
          footer={
            <Link
              asChild
              href={{
                pathname: "/dashboard/request-quotation/[quotationId]/upload",
                params: { quotationId },
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
