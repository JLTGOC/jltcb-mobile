import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RefreshControl, ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ShipmentDetails from "@/components/shipments/ShipmentDetails";
import TabBar from "@/components/tabs-ui/TabBar";
import BannerHeader from "@/components/ui/BannerHeader";

import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { shipmentQueries } from "@/queries/shipments";

const TABS = ["details", "documents", "billing"] as const;
type TabType = (typeof TABS)[number];

export default function Shipment() {
  const { shipmentId, tab = "details" } = useLocalSearchParams<{
    shipmentId: string;
    tab?: TabType;
  }>();
  const router = useRouter();

  const { data, isPending, refetch } = useQuery(
    shipmentQueries.detail(Number(shipmentId)),
  );

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  if (isPending) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

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
