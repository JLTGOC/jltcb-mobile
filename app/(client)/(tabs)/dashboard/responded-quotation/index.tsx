import { AntDesign } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  DataTable,
  Icon,
  IconButton,
  Menu,
  Portal,
} from "react-native-paper";

import BannerHeader from "@/components/ui/BannerHeader";
import ConfirmModal from "@/components/ui/ConfirmModal";
import SuccesModal from "@/components/ui/SuccessModal";

import { routes } from "@/constants/routes";
import { THEMES } from "@/constants/themes";
import { useSendQuotationCardMutation } from "@/hooks/mutations/quotations/chats/useSendQuotationCardMutation";
import { useAcceptQuotationProposalMutation } from "@/hooks/mutations/quotations/useAcceptQuotationProposalMutation";
import { useDeleteQuotationMutation } from "@/hooks/mutations/quotations/useDeleteQuotationMutation";
import { quotationQueries } from "@/queries/quotations";
import type { ClientQuotationListSummary } from "@/types/quotations";

const tableHeaders = ["reference", "date", "shipment details", "status", ""];

const menuItems = [
  { iconName: "chat", title: "CHAT" },
  { iconName: "check", title: "ACCEPT", color: "green" },
  { iconName: "delete-outline", title: "DISCARD", color: "red" },
];

type RespondedQuotation = ClientQuotationListSummary<"RESPONDED">;

export default function RespondedQuotes() {
  const router = useRouter();

  const [visibleMenuId, setVisibleMenuId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Data Fetching
  const { data: quotationsData, isPending } = useQuery({
    ...quotationQueries.list<RespondedQuotation[]>({
      filter: { status: "RESPONDED" },
    }),
    placeholderData: (previousData) => previousData,
  });

  // Delete single quotation
  const { mutate: deleteQuotation } = useDeleteQuotationMutation();

  // Accept the quotation
  const { mutate: acceptQuotationProposal, isPending: isAccepting } =
    useAcceptQuotationProposalMutation();

  const handleAcceptQuotationProposal = () => {
    if (!selectedId) return;
    acceptQuotationProposal(selectedId, {
      onSuccess: () => {
        setModalVisible(false);
        setSuccessModalVisible(true);
      },
      onError: (err) => {
        console.error("Failed to accept:", err);
        setModalVisible(false);
      },
    });
  };

  const handleOnPress = (title: string, quotation: RespondedQuotation) => {
    setVisibleMenuId(null);

    if (title === "ACCEPT") {
      setSelectedId(quotation.id);
      setModalVisible(true);
    } else if (title === "DISCARD") {
      deleteQuotation(quotation.id);
    } else if (title === "CHAT") {
      handleChatButtonPress(quotation);
    }
  };

  const { mutateAsync: handleSendQuotationCard } =
    useSendQuotationCardMutation();

  const redirectToChat = (conversationId: string) => {
    router.navigate({
      pathname: "/(client)/(tabs)/messages/[id]",
      params: { id: conversationId },
    });
  };

  const handleChatButtonPress = async (quotation: RespondedQuotation) => {
    if (quotation.conversation_id) {
      redirectToChat(quotation.conversation_id);
      return;
    }

    try {
      const res = await handleSendQuotationCard(String(quotation.id));
      redirectToChat(res.data.conversation_id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: THEMES.pageBackgroundColor }}>
      <BannerHeader title="QUOTATIONS" variant="dark" />

      <ScrollView>
        <DataTable>
          <DataTable.Header style={styles.header}>
            {tableHeaders.map((header, index) => {
              const flexValues = [1.35, 1, 2.15, 1, 0.5];
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
          {isPending ? (
            <ActivityIndicator animating={true} style={{ marginTop: 40 }} />
          ) : (
            <>
              {quotationsData?.data.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    router.navigate({
                      pathname:
                        "/(client)/(tabs)/dashboard/responded-quotation/[id]",
                      params: { id: item.id, title: item.commodity },
                    });
                  }}
                  style={({ pressed }) => [
                    {
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                >
                  <DataTable.Row>
                    <DataTable.Cell
                      textStyle={styles.cellText}
                      style={{ flex: 1.35 }}
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
                      style={{ flex: 2.15 }}
                    >
                      {item.commodity}
                    </DataTable.Cell>

                    <DataTable.Cell
                      textStyle={styles.cellText}
                      style={{ flex: 1 }}
                    >
                      {item.status}
                    </DataTable.Cell>

                    <DataTable.Cell
                      onPress={() => {}}
                      numeric
                      style={{ flex: 0.5, justifyContent: "center" }}
                    >
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
                              handleOnPress(menu.title, item);
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
                </Pressable>
              ))}
            </>
          )}
        </DataTable>
      </ScrollView>

      <Portal>
        <ConfirmModal
          icon={<AntDesign name="file-protect" size={100} color="gray" />}
          confirmButtonText="Yes"
          cancelButtonText="Cancel"
          loading={isAccepting}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={handleAcceptQuotationProposal}
          title="ACCEPT QUOTATION"
          description="Once you accept this quotation, the terms will be final and no changes or negotiations can be made. Please review all details carefully before confirming you acceptance"
        />

        <SuccesModal
          onConfirm={() => {
            setSuccessModalVisible(false);
            router.dismissTo(routes.CLIENT_DB);
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
