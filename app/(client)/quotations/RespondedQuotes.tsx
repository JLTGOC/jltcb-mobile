import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  DataTable,
  Icon,
  IconButton,
  Menu,
} from "react-native-paper";

import Header from "@/src/components/client-section/Header";
import { routes } from "@/src/constants/routes";
import { useNavigate } from "@/src/hooks/useNavigate";
import { fetchClientQuotes } from "@/src/services/clientQuotation";

type TableItem = {
  id: number;
  commodity: string;
  date: string;
  reference_number: string;
  status: string;
};

const tableHeaders = ["reference", "date", "shipment details", " status", ""];

const menuItems = [
  { iconName: "pencil", title: "edit", color: "black" },
  { iconName: "delete", title: "delete", color: "red" },
];

export default function RespondedQuotes() {
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const { navigate } = useNavigate();

  // Data Fetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["RESPONDED"],
    queryFn: () => fetchClientQuotes({ status: "RESPONDED" }),
    placeholderData: (previousData) => previousData,
  });

  const quotes = (data as unknown as TableItem[]) || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header title={"QUOTATIONS"} route={routes.CLIENT_DB} />

      <DataTable>
        <DataTable.Header style={styles.header}>
          {tableHeaders.map((header, index) => {
            const flexValues = [2, 0, 2.5, 1, 0];
            const flexValue = flexValues[index] || 1;
            return (
              <DataTable.Title
                key={index}
                style={{ flex: flexValue }}
                textStyle={styles.headerText}
              >
                {header.toUpperCase()}
              </DataTable.Title>
            );
          })}
        </DataTable.Header>
        {isLoading ? (
          <ActivityIndicator animating={true} style={{ marginTop: 40 }} />
        ) : (
          <ScrollView>
            {quotes.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  navigate({
                    pathname: routes.CLIENT_QUOTE_DETAILS,
                    params: { id: item.id, title: item.commodity },
                  });
                }}
              >
                <DataTable.Row>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={{ flex: 1.5 }}
                  >
                    {item.reference_number}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={{ flex: 1 }}
                  >
                    {item.date}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={{ flex: 2.5 }}
                  >
                    {item.commodity}
                  </DataTable.Cell>

                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={{ flex: 1 }}
                  >
                    {item.status}
                  </DataTable.Cell>

                  <DataTable.Cell numeric style={{ flex: 0.5 }}>
                    <Menu
                      visible={visibleMenuId === item.id}
                      onDismiss={() => setVisibleMenuId(null)}
                      anchor={
                        <IconButton
                          icon="dots-vertical"
                          size={20}
                          onPress={() => setVisibleMenuId(item.id)}
                        />
                      }
                    >
                      {menuItems.map((menu, index) => (
                        <Menu.Item
                          key={index}
                          onPress={() => {
                            setVisibleMenuId(null);
                          }}
                          leadingIcon={({ size }) => (
                            <Icon
                              source={menu.iconName}
                              color={menu.color}
                              size={size}
                            />
                          )}
                          title={menu.title}
                          style={styles.menuItem}
                          titleStyle={{ color: menu.color }}
                        />
                      ))}
                    </Menu>
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    margin: 10,
    height: 50,
  },
  header: {
    backgroundColor: "#cecece",
    paddingVertical: 0,
    marginVertical: 0,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 2,
    height: 25,
    alignItems: "center",
    paddingVertical: 0,
    marginVertical: 0,
  },

  headerText: {
    fontSize: 12,
    lineHeight: 14,
    color: "white",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  cellText: {
    fontWeight: "500",
    fontSize: 10.5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  menuItem: {
    height: 35,
    justifyContent: "center",
  },
});
