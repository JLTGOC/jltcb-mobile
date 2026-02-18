import BannerHeader from "@/src/components/ui/BannerHeader";
import { asQuotationsQueryOptions } from "@/src/query-options/quotations/asQuotationsQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  ActivityIndicator,
  DataTable,
  IconButton,
  Menu,
} from "react-native-paper";

const TABLE_HEADERS = [
  { title: "Reference" },
  { title: "Date", style: { flex: 0.75 } },
  { title: "Shipment Details", style: { flex: 2 } },
  { title: "", style: { flex: 0.05, minWidth: 20 } },
];

const MENUS: { icon: string; title: string; href: Href }[] = [
  {
    icon: "table-edit",
    title: "Update Quotation",
    href: "/quotations/responded/[id]/upload",
  },
];

export default function RespondedQuotation() {
  const { data, isPending, error } = useQuery(
    asQuotationsQueryOptions({ filter: "RESPONDED" }),
  );
  const router = useRouter();
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);

  const getUploadRoute = (id: string | number, clientName: string): Href => ({
    pathname: "/quotations/responded/[id]/upload",
    params: { id: id.toString(), clientName },
  });

  return (
    <ScrollView>
      <BannerHeader title="Responded Quotations" variant="light" />

      {isPending ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        data && (
          <DataTable>
            <DataTable.Header style={styles.tableHeader}>
              {TABLE_HEADERS.map((header) => (
                <DataTable.Title
                  style={[styles.headerTitle, header?.style]}
                  textStyle={styles.uppercase}
                  key={header.title}
                  numberOfLines={2}
                >
                  {header.title}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            {data.data.map((quotation) => {
              const formattedDate = format(
                parse(quotation.date, "yyyy/MM/dd", new Date()),
                "MM/dd/yyyy",
              );
              return (
                <TouchableOpacity key={quotation.id} onPress={() => {}}>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {quotation.reference_number}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 0.75 }}>
                      {formattedDate}
                    </DataTable.Cell>
                    <DataTable.Cell style={{ flex: 2 }}>
                      {quotation.commodity}
                    </DataTable.Cell>
                    <DataTable.Cell
                      onPress={() => {}}
                      numeric
                      style={{ flex: 0.05, minWidth: 20 }}
                    >
                      <Menu
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
                            onPress={() => {
                              setVisibleMenuId(null);
                              router.navigate(
                                getUploadRoute(quotation.id, quotation.client_name),
                              );
                            }}
                          />
                        ))}
                      </Menu>
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              );
            })}
          </DataTable>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tableHeader: {
    backgroundColor: "#E5E5E5",
  },
  headerTitle: {
    paddingVertical: 4,
  },
  uppercase: {
    textTransform: "uppercase",
  },
  requestCountText: {
    color: "#FF9933",
    fontWeight: "semibold",
  },
  flexLow: {
    flex: 2,
  },
  flexHigh: {
    flex: 5,
  },
});
