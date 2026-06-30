import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import SharedQuotationDetails from "@/components/quote-section/SharedQuotationDetails";
import SharedQuotationDocuments from "@/components/quote-section/SharedQuotationDocuments";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { quotationQueries } from "@/queries/quotations";
import { quotationFileQueries } from "@/queries/quotations/files";
import { userQueries } from "@/queries/users";
import type { QuotationStatus } from "@/types/quotations";

const TABS = ["details", "documents"] as const;
type TabType = (typeof TABS)[number];

export default function Quotation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    quotationId,
    status,
    tab = "details",
  } = useLocalSearchParams<{
    quotationId: string;
    status: Lowercase<QuotationStatus>;
    tab?: TabType;
  }>();

  const { data, refetch } = useQuery(
    quotationQueries.detail(Number(quotationId)),
  );

  const refreshActiveTab = async () => {
    if (!data) return;

    if (tab === "details") {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: userQueries.detail(Number(data?.data.client_id)).queryKey,
        }),
        refetch(),
      ]);
    } else if (tab === "documents") {
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
        <TabBar
          tabs={TABS}
          activeTab={tab}
          onTabChange={(newTab) => router.setParams({ tab: newTab })}
        />
      </View>

      {tab === "details" ? (
        <SharedQuotationDetails
          footer={
            status === "requested" && (
              <Link
                asChild
                href={{
                  pathname: "/quotations/[quotationId]/upload",
                  params: { quotationId },
                }}
              >
                <Button
                  mode="contained"
                  style={styles.button}
                  labelStyle={styles.buttonLabel}
                >
                  Upload Quotation
                </Button>
              </Link>
            )
          }
        />
      ) : tab === "documents" ? (
        <SharedQuotationDocuments />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    backgroundColor: "#1C213B",
  },
  buttonLabel: {
    paddingVertical: 5,
    textTransform: "uppercase",
  },
});
