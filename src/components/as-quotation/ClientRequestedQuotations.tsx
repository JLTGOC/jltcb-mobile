import { useQuery } from "@tanstack/react-query";
import { format, parse } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ASDropdown from "@/components/lead-as-section/ASDropdown";
import BannerHeader from "@/components/ui/BannerHeader";
import DataTable from "@/components/ui/DataTable";

import { THEMES } from "@/constants/themes";
import { useReassignASMutation } from "@/hooks/mutations/quotations/useReassignASMutation";
import { useAuth } from "@/hooks/useAuth";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { quotationQueries } from "@/queries/quotations";
import { reassignmentRequestQueries } from "@/queries/reassignment-requests";
import type { TableHeader } from "@/types";
import type {
  ASRequestedQuotationSummary,
  ReassignASRequestBody,
} from "@/types/quotations";
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

export default function ClientRequestedQuotations() {
  const { role } = useAuth();
  const router = useRouter();

  const { clientId } = useLocalSearchParams<{ clientId: string }>();

  const isLeadAS = role === "Lead Account Specialist";

  const {
    data: asUsers,
    isPending: isAsUsersPending,
    refetch: refetchAsUsers,
  } = useQuery({
    ...reassignmentRequestQueries.enums({ as: true }),
    select: (data) => {
      const formattedNames = data.data.account_specialists.map((user) => ({
        id: String(user.id),
        title: user.full_name.split(" ")[0],
      }));
      return formattedNames;
    },
    enabled: isLeadAS,
  });

  const {
    data: quotationsData,
    isPending,
    refetch: refetchQuotations,
  } = useQuery(
    quotationQueries.list<ASRequestedQuotationSummary[]>({
      filter: { status: "REQUESTED" },
      client_id: Number(clientId),
    }),
  );

  const refetch = () => {
    if (isLeadAS) refetchAsUsers();
    return refetchQuotations();
  };

  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(refetch);
  useRefreshOnFocus(refetch);

  const {
    mutate,
    variables,
    isPending: isUpdatingAs,
  } = useReassignASMutation();

  const handleChangeAs = async (data: ReassignASRequestBody) => {
    mutate(data, {
      onSuccess: () =>
        showToast(
          `Changed AS to ${asUsers?.find((user) => Number(user.id) === data.asId)?.title}`,
        ),
      onError: (error) => {
        console.error(error);
        showToast("Failed to change AS");
      },
    });
  };

  const navigateToQuotation = (quotationId: number) => {
    router.push({
      pathname: "/quotations/[quotationId]",
      params: { quotationId, status: "requested" },
    });
  };

  const userQuotations = quotationsData?.data[0];

  return (
    <ScrollView
      overScrollMode="never"
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
    >
      <BannerHeader variant="light" title="List of Request for Quotation" />

      {isPending && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {userQuotations && (
        <View style={styles.table}>
          <DataTable
            headers={TABLE_HEADERS}
            data={userQuotations.quotations ?? []}
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
                    dataSet={asUsers ?? null}
                    loading={
                      isAsUsersPending ||
                      (variables?.quotationId === quotation.id && isUpdatingAs)
                    }
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
  table: {
    marginTop: 20,
  },
});
