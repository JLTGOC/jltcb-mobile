import Download from "@material-symbols/svg-500/outlined/download.svg";
import { useQueryClient } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton, Menu } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import BannerHeader from "@/components/ui/BannerHeader";
import DataTable from "@/components/ui/DataTable";

import { THEMES } from "@/constants/themes";
import { useAuth } from "@/hooks/useAuth";
import { useQuotationsQuery } from "@/hooks/useQuotationsQuery";
import { quotationQueryOptions } from "@/query-options/asLead-quotations/quotationQueryOptions";
import { useJobOrderFormStore } from "@/stores/useJobOrderFormStore";
import type { MenuOption, TableHeader } from "@/types";
import type { BaseASQuotation } from "@/types/quotations";
import { downloadFile, saveFile } from "@/utils/handleFileDownload";
import { print } from "@/utils/print";
import { showToast } from "@/utils/showToast";

const TABLE_HEADERS: TableHeader[] = [
  { title: "Reference" },
  { title: "Date" },
  {
    title: "Shipment Details",
    style: { flex: 1.125 },
  },
  {
    title: "",
    style: { maxWidth: 35 },
  },
];

const MENU_OPTIONS = [
  { title: "PRINT", icon: "printer-outline" },
  {
    title: "DOWNLOAD",
    icon: ({ size, color, ...props }) => (
      <Download width={size} height={size} fill={color} {...props} />
    ),
  },
  { title: "MAKE JOB ORDER", icon: "truck-fast-outline" },
] as const satisfies MenuOption[];

type MenuTitle = (typeof MENU_OPTIONS)[number]["title"];

export default function AcceptedQuotations() {
  const { token } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setQuotationReference, reset } = useJobOrderFormStore(
    useShallow((state) => ({
      setQuotationReference: state.setQuotationReference,
      reset: state.reset,
    })),
  );

  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);

  const { data, isPending } = useQuotationsQuery<BaseASQuotation[]>({
    filter: { status: "ACCEPTED" },
  });

  const handlePrint = async (uri: string) => {
    try {
      await print({ uri });
    } catch (error) {
      console.error("Print error:", error);
    }
  };

  const getQuotationFile = async (quotationId: string) => {
    const { data } = await queryClient.fetchQuery(
      quotationQueryOptions(quotationId),
    );

    if (typeof data.quotation_file === "string") {
      showToast(data.quotation_file);
      return null;
    }

    try {
      const res = await downloadFile({
        url: data.quotation_file[0].file_url,
        fileName: data.quotation_file[0].file_name,
        token: token!,
        cacheDir: "accepted-quotations",
      });

      return res;
    } catch (err) {
      console.error(err);
    }
  };

  const handleRowPress = async (quotationId: string) => {
    router.push({
      pathname: "/quotations/[quotationId]/document",
      params: { quotationId },
    });
  };

  const handleMenuAction = async ({
    title,
    quotation,
  }: {
    title: MenuTitle;
    quotation: BaseASQuotation;
  }) => {
    if (title !== "MAKE JOB ORDER") {
      const file = await getQuotationFile(quotation.id.toString());
      if (!file) return;

      if (title === "DOWNLOAD") saveFile(file);
      else if (title === "PRINT") await handlePrint(file.uri);
      return;
    }

    reset();
    setQuotationReference(quotation.reference_number);
    if (quotation.service === "LOGISTICS") {
      router.push("/job-orders/shipment/new");
    } else if (quotation.service === "REGULATORY") {
      router.push("/job-orders/regulatory/new");
    }
    setVisibleMenuId(null);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      overScrollMode="never"
      bounces={false}
    >
      <BannerHeader title="Accepted Quotation" variant="light" />

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
                {MENU_OPTIONS.map((menu) => (
                  <Menu.Item
                    dense
                    key={menu.title}
                    leadingIcon={menu.icon}
                    title={menu.title}
                    onPress={() =>
                      handleMenuAction({
                        title: menu.title,
                        quotation,
                      })
                    }
                  />
                ))}
              </Menu>,
            ];
          }}
          onRowPress={(item) => handleRowPress(item.id.toString())}
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
