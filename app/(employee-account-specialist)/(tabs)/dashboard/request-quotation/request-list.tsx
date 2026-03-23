import ASDropdown from "@/src/components/lead-as-section/ASDropdown";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { useAuth } from "@/src/hooks/useAuth";
import { updateAsMutationOptions } from "@/src/mutation-options/asLead-quotations/updateAsMutationOptions";
import { asQueryOptions } from "@/src/query-options/users/asQueryOptions";
import type { Quotation, UpdateAsArgs } from "@/src/types/quotations";
import { showToast } from "@/src/utils/showToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { DataTable, Text } from "react-native-paper";

const TABLE_HEADERS = [
  {
    title: "Date",
    style: { flex: 2 },
  },
  {
    title: "Commodity",
    style: { flex: 5 },
  },
  {
    title: "Person in Charge",
    style: { flex: 4 },
  },
];

export default function RequestList() {
  const { role } = useAuth();
  const router = useRouter();
  const { quotations: quotationsString, clientName } = useLocalSearchParams<{
    quotations: string;
    clientName: string;
  }>();
  const isLeadAS = role === "Lead Account Specialist";
  const { data: asUsers, isPending } = useQuery({
    ...asQueryOptions,
    select: (data) => {
      const formattedNames = data.data.map((user) => ({
        id: String(user.id),
        title: user.full_name.split(" ")[0],
      }));
      return { ...data, data: formattedNames };
    },
    enabled: isLeadAS,
  });
  const { mutateAsync } = useMutation(updateAsMutationOptions);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleChangeAs = async (data: UpdateAsArgs) => {
    setUpdatingId(data.quotationId);
    try {
      await mutateAsync(data);
      showToast(
        `Changed AS to ${asUsers?.data.find((user) => Number(user.id) === data.asId)?.title}`,
      );
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const navigateToQuotation = (quotationId: number, clientName: string) => {
    router.push({
      pathname: "/dashboard/request-quotation/[id]",
      params: { id: quotationId, clientName },
    });
  };

  const quotations: Quotation[] = quotationsString
    ? JSON.parse(quotationsString)
    : [];

  return (
    <ScrollView style={{ backgroundColor: "#F5F5F5" }}>
      <BannerHeader variant="light" title="List of Request for Quotation" />

      <DataTable style={styles.table}>
        <DataTable.Header style={styles.tableHeader}>
          {TABLE_HEADERS.map((header) => (
            <DataTable.Title
              style={[styles.headerTitle, header.style]}
              textStyle={styles.uppercase}
              key={header.title}
            >
              {header.title}
            </DataTable.Title>
          ))}
        </DataTable.Header>
        {quotations.map((quotation) => {
          const formattedDate = format(
            parse(quotation.date, "yyyy/MM/dd", new Date()),
            "MM/dd/yyyy",
          );
          return (
            <Pressable
              key={quotation.id}
              onPress={() => {
                navigateToQuotation(quotation.id, clientName);
              }}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
            >
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 2 }}>
                  {formattedDate}
                </DataTable.Cell>
                <DataTable.Cell
                  textStyle={[styles.uppercase, { flex: 1 }]}
                  style={{ flex: 5 }}
                >
                  {quotation.commodity}
                </DataTable.Cell>
                <DataTable.Cell
                  onPress={() => {
                    if (!isLeadAS) {
                      navigateToQuotation(quotation.id, clientName);
                    }
                  }}
                  style={{ flex: 4 }}
                >
                  {isLeadAS ? (
                    <ASDropdown
                      quotationId={quotation.id}
                      personInChargeName={quotation.person_in_charge}
                      asUsers={asUsers?.data}
                      loading={isPending || updatingId === quotation.id}
                      handleChangeAs={handleChangeAs}
                    />
                  ) : (
                    <Text>{quotation.person_in_charge}</Text>
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            </Pressable>
          );
        })}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
  },
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
  },
  flexLow: {
    flex: 2,
  },
  flexHigh: {
    flex: 5,
  },
});
