import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  DataTable,
  Icon,
  IconButton,
  Menu,
  TextInput,
} from "react-native-paper";

import Header from "@/src/components/client-section/Header";
import { routes } from "@/src/constants/routes";
import useDebounce from "@/src/hooks/useDebounce";
import { useNavigate } from "@/src/hooks/useNavigate";
import { fetchClientQuotes } from "@/src/services/clientQuotation";

type TableItem = {
  id: number;
  commodity: string;
  date: string;
  reference_number: string;
  status: string;
};

const tableHeaders = ["commodity", "date requested"];

const menuItems = [
  { iconName: "pencil", title: "edit", color: "black" },
  { iconName: "delete", title: "delete", color: "red" },
];

export default function RequestedQuotes() {
  const [search, setSearch] = useState<string>("");
  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const { navigate } = useNavigate();

  const debouncedSearch = useDebounce(search, 500) || "";

  // Data Fetching
  const { data, isLoading } = useQuery({
    queryKey: ["quotes", "REQUESTED", debouncedSearch],
    queryFn: () =>
      fetchClientQuotes({ status: "REQUESTED", search: debouncedSearch }),
    placeholderData: (previousData) => previousData,
  });

  const quotes = (data as unknown as TableItem[]) || [];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Header title={"REQUESTED QUOTATION"} route={routes.CLIENT_DB} />

      <View style={styles.inputContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          mode="flat"
          placeholder="ENTER REFERENCE NUMBER"
          placeholderTextColor="#666"
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          selectionColor="#f2994a"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log("Submit")}
        >
          <Icon source="magnify" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <DataTable style={{ flex: 1 }}>
        <DataTable.Header style={styles.header}>
          {tableHeaders.map((header) => (
            <DataTable.Title
              key={header}
              style={styles.headerTitle}
              textStyle={styles.headerText}
            >
              {header.toUpperCase()}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {isLoading && !data ? (
          <ActivityIndicator animating={true} style={{ marginTop: 40 }} />
        ) : (
          <ScrollView>
            {quotes.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  navigate({
                    pathname: routes.CLIENT_QUOTE_DETAILS,
                    params: {
                      id: item.id,
                      title: item.commodity,
                      mode: "edit",
                    },
                  });
                }}
              >
                <DataTable.Row>
                  <DataTable.Cell
                    textStyle={styles.cellText}
                    style={{ flex: 1.5 }}
                  >
                    {item.commodity}
                  </DataTable.Cell>

                  <DataTable.Cell textStyle={styles.cellText}>
                    {item.date}
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
                            if (menu.title === "edit") {
                              navigate({
                                pathname: "/(client)/quotations",
                                params: {
                                  id: item.id,
                                  title: item.commodity,
                                },
                              });
                            }
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
    height: 25,
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
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 50,
    height: 45,
    margin: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    height: 50,
    fontSize: 14,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#f2994a",
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderEndEndRadius: 25,
    borderTopEndRadius: 25,
  },
});
