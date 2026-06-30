import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useRouter, type Href } from "expo-router";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { ActivityIndicator, IconButton, Menu } from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";
import DataTable from "@/components/ui/DataTable";

import { THEMES } from "@/constants/themes";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { quotationQueries } from "@/queries/quotations";
import type { BaseASQuotation } from "@/types/quotations";

interface TableHeader {
  title: string;
  style?: StyleProp<ViewStyle>;
}

const TABLE_HEADERS: TableHeader[] = [
  { title: "Reference" },
  { title: "Date" },
  { title: "Shipment Details", style: { flex: 1.125 } },
  { title: "", style: { maxWidth: 35 } },
];

const MENUS: {
  icon: string;
  title: string;
  href: (quotationId: number) => Href;
}[] = [
  {
    icon: "table-edit",
    title: "Edit Quotation",
    href: (quotationId: number) => ({
      pathname: "/quotations/[quotationId]/upload",
      params: {
        quotationId: quotationId.toString(),
        status: "responded",
      },
    }),
  },
];

export default function RespondedQuotations() {
  const { data, isPending, refetch } = useQuery(
    quotationQueries.list<BaseASQuotation[]>({
      filter: { status: "RESPONDED" },
    }),
  );
  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const router = useRouter();
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      overScrollMode="never"
      bounces={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <BannerHeader title="Responded Quotations" variant="light" />

      {isPending && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {data && (
        <DataTable
          headers={TABLE_HEADERS}
          data={data.data}
          keyExtractor={(item) => item.id.toString()}
          extractCells={(quotation) => {
            const formattedDate = format(
              parse(quotation.date, "yyyy/MM/dd", new Date()),
              "MM/dd/yyyy",
            );
            return [
              quotation.reference_number,
              formattedDate,
              quotation.commodity,
              <Menu
                key={quotation.id}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    size={20}
                    onPress={() => setVisibleMenuId(quotation.id)}
                  />
                }
                anchorPosition="bottom"
                onDismiss={() => setVisibleMenuId(null)}
                visible={visibleMenuId === quotation.id}
              >
                {MENUS.map((menu) => (
                  <Menu.Item
                    key={menu.title}
                    leadingIcon={menu.icon}
                    title={menu.title}
                    dense
                    onPress={() => {
                      setVisibleMenuId(null);
                      router.push(menu.href(quotation.id));
                    }}
                  />
                ))}
              </Menu>,
            ];
          }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEMES.pageBackgroundColor,
  },
  contentContainer: {
    flexGrow: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
