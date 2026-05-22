import { useMutation, useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import ASDropdown from "@/components/lead-as-section/ASDropdown";
import BannerHeader from "@/components/ui/BannerHeader";
import DataTable from "@/components/ui/DataTable";

import { THEMES } from "@/constants/themes";
import { useAuth } from "@/hooks/useAuth";
import { updateAsMutationOptions } from "@/mutation-options/asLead-quotations/updateAsMutationOptions";
import { asQuotationsQueryOptions } from "@/query-options/asLead-quotations/asQuotationsQueryOptions";
import { asQueryOptions } from "@/query-options/users/asQueryOptions";
import type { TableHeader } from "@/types";
import type { UpdateAsArgs } from "@/types/quotations";
import { showToast } from "@/utils/showToast";

const TABLE_HEADERS: TableHeader[] = [
  {
    title: "Date",
  },
  {
    title: "Commodity",
    cellTextStyle: { textTransform: "uppercase" },
  },
  {
    title: "Person in Charge",
  },
];

export default function RequestList() {
  const { role } = useAuth();
  const router = useRouter();

  const { clientId } = useLocalSearchParams<{ clientId: string }>();

  const isLeadAS = role === "Lead Account Specialist";

  const { data: asUsers, isPending: isAsUsersPending } = useQuery({
    ...asQueryOptions,
    select: (data) => {
      const formattedNames = data.data.account_specialists.map((user) => ({
        id: String(user.id),
        title: user.full_name.split(" ")[0],
      }));
      return { ...data, data: formattedNames };
    },
    enabled: isLeadAS,
  });

  const { data: quotationsData } = useQuery(
    asQuotationsQueryOptions({
      filter: "REQUESTED",
      client_id: Number(clientId),
    }),
  );

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

  const navigateToQuotation = (quotationId: number) => {
    router.push({
      pathname: "/dashboard/request-quotation/[quotationId]",
      params: { quotationId },
    });
  };

  const userQuotations = quotationsData?.data[0];

  return (
    <ScrollView style={styles.container}>
      <BannerHeader variant="light" title="List of Request for Quotation" />

      <View style={styles.table}>
        <DataTable
          headers={TABLE_HEADERS}
          data={userQuotations?.quotations ?? []}
          keyExtractor={(item) => item.id.toString()}
          extractCells={(quotation) => {
            const formattedDate = format(
              parse(quotation.date, "yyyy/MM/dd", new Date()),
              "MM/dd/yyyy",
            );

            const commodity =
              quotation.service === "LOGISTICS"
                ? quotation.logistics_service.commodity
                : quotation.regulatory_service.application_type;

            const personInCharge =
              quotation.assignment_status === "AVAILABLE"
                ? "Available"
                : quotation.as_full_name;

            const disabled =
              quotation.assignment_status !== "REASSIGNMENT REQUESTED";

            return [
              formattedDate,
              commodity,
              isLeadAS ? (
                <ASDropdown
                  key={quotation.id}
                  quotationId={quotation.id}
                  personInChargeName={personInCharge}
                  dataSet={asUsers?.data ?? null}
                  loading={isAsUsersPending || updatingId === quotation.id}
                  handleChangeAs={handleChangeAs}
                  disabled={disabled}
                  editable={!disabled}
                  showChevron={!disabled}
                />
              ) : (
                personInCharge
              ),
            ];
          }}
          onRowPress={(quotation) => navigateToQuotation(quotation.id)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEMES.pageBackgroundColor,
  },
  table: {
    marginTop: 20,
  },
});
