import { AntDesign } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  DataTable,
  Icon,
  IconButton,
  Menu,
  Portal,
} from "react-native-paper";

import ConfirmModal from "@/src/components/ui/ConfirmModal";
import SuccesModal from "@/src/components/ui/SuccessModal";
import { useAuth } from "@/src/hooks/useAuth";
import { acceptQuotation } from "@/src/services/shipment";

import BannerHeader from "@/src/components/ui/BannerHeader";
import { routes } from "@/src/constants/routes";
import { useNavigate } from "@/src/hooks/useNavigate";
import {
  deleteClientSingleQuote,
  fetchClientQuotes,
} from "@/src/services/clientQuotation";

type TableItem = {
  id: number;
  commodity: string;
  date: string;
  reference_number: string;
  status: string;
};

const tableHeaders = ["reference", "date", "shipment details", " status", ""];

const menuItems = [
  { iconName: "check", title: "ACCEPT", color: "green" },
  { iconName: "delete-outline", title: "DISCARD", color: "red" },
];

export default function RespondedQuotes() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { navigate } = useNavigate();
  const { token } = useAuth();

  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Data Fetching
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["RESPONDED"],
    queryFn: () => fetchClientQuotes({ status: "RESPONDED" }),
    placeholderData: (previousData) => previousData,
  });

  console.log("responed data", data);

  // Delete single quotation
  const { mutate: deletedSingleQuotation } = useMutation({
    mutationFn: (id: string) => deleteClientSingleQuote(id as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["RESPONDED"] });
    },
  });

  // Accept the quotation
  const { mutate: handleAccept, isPending: isAccepting } = useMutation({
    mutationFn: (reference_number: string) => {
      if (!token) throw new Error("No auth token found");
      return acceptQuotation(reference_number);
    },
    onSuccess: (data) => {
      console.log("hello", data);

      queryClient.invalidateQueries({ queryKey: ["RESPONDED"] });
      setModalVisible(false);
      setSuccessModalVisible(true);
    },
    onError: (err) => {
      console.error("Failed to accept:", err);
      setModalVisible(false);
    },
  });

  const handleOnPress = (title: string, reference_number: string) => {
    setVisibleMenuId(null);

    if (title === "ACCEPT") {
      setSelectedId(reference_number);
      setModalVisible(true);
    } else {
      deletedSingleQuotation(reference_number);
    }
  };

  const quotes = (data as unknown as TableItem[]) || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <BannerHeader title="QUOTATIONS" variant="dark" />

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
                    {item?.status === "ACCEPTED" ? null : (
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
                              handleOnPress(
                                menu.title,
                                item.reference_number as any,
                              );
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
                    )}
                  </DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </DataTable>

      <Portal>
        <ConfirmModal
          icon={<AntDesign name="file-protect" size={100} color="gray" />}
          confirmButtonText="Yes"
          cancelButtonText="Cancel"
          loading={isAccepting}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={() => selectedId && handleAccept(selectedId)}
          title="ACCEPT QUOTATION"
          description="Once you accept this quotation, the terms will be final and no changes or negotiations can be made. Please review all details carefully before confirming you acceptance"
        />

        <SuccesModal
          onConfirm={() => {
            setSuccessModalVisible(false);
            router.replace(routes.CLIENT_DB);
          }}
          visible={successModalVisible}
          title="Successfully Submitted!"
          description="We’ll notify you as soon as the client accepted the quotation!"
        />
      </Portal>
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
