import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { ShipmentCard } from "@/components/shipments/ShipmentCard";
import BannerHeader from "@/components/ui/BannerHeader";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RecordCard } from "@/components/ui/RecordCard";
import Search from "@/components/ui/Search";

import { useShipmentsQuery } from "@/hooks/shipments/useShipmentsQuery";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { searchSchema, type SearchForm } from "@/schemas/searchSchema";
import type { ShipmentQueryStatus } from "@/types/shipments";
import { capitalize } from "@/utils/capitalize";

export default function Shipments() {
  const { status } = useLocalSearchParams<{
    status: Lowercase<ShipmentQueryStatus>;
  }>();

  const { control, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  });

  const [submittedSearch, setSubmittedSearch] = useState("");

  const { data, isPending, error, refetch } = useShipmentsQuery({
    ...(submittedSearch && { search: submittedSearch }),
    filter: { status: status.toUpperCase() as ShipmentQueryStatus },
  });

  useRefreshOnFocus(refetch);
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const handleSearch = handleSubmit(({ search }) => {
    setSubmittedSearch(search);
  });

  return (
    <View style={{ flex: 1 }}>
      <BannerHeader variant="light" title={`${capitalize(status)} Shipment`} />
      <Controller
        control={control}
        name="search"
        render={({ field: { onChange, onBlur, value } }) => (
          <Search
            placeholder="ENTER REFERENCE NUMBER"
            variant="dark"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            onSearch={handleSearch}
          />
        )}
      />

      <FlatList
        data={data?.data.shipments}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
          />
        }
        contentContainerStyle={styles.listContentContainer}
        renderItem={({ item }) => (
          <ShipmentCard.Provider shipment={item}>
            <Card.Root>
              <Card.Header>
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={24}
                />
                <ShipmentCard.Title />
                <Card.Action>
                  <ShipmentCard.Status />
                </Card.Action>
              </Card.Header>

              <Card.Content>
                <ShipmentCard.ContentTitle />

                <RecordCard.Details>
                  <RecordCard.Detail
                    label={
                      <RecordCard.DetailText>Origin</RecordCard.DetailText>
                    }
                    value={
                      <ShipmentCard.DetailValue
                        numberOfLines={2}
                        getValue={(s) => s.shipment_information.origin}
                      />
                    }
                  />

                  <RecordCard.Detail
                    label={
                      <RecordCard.DetailText>Destination</RecordCard.DetailText>
                    }
                    value={
                      <ShipmentCard.DetailValue
                        numberOfLines={2}
                        getValue={(s) => s.shipment_information.destination}
                      />
                    }
                  />

                  <RecordCard.Detail
                    label={<RecordCard.DetailText>PIC</RecordCard.DetailText>}
                    value={
                      <ShipmentCard.DetailValue
                        getValue={(s) => s.general_info.person_in_charge}
                      />
                    }
                  />

                  <RecordCard.Detail
                    label={
                      <RecordCard.DetailText>
                        Service Type
                      </RecordCard.DetailText>
                    }
                    value={
                      <ShipmentCard.DetailValue
                        getValue={(s) => s.shipment_information.service_type}
                      />
                    }
                  />
                </RecordCard.Details>
              </Card.Content>

              <RecordCard.Footer>
                <Link
                  asChild
                  href={{
                    pathname: "/shipments/[shipmentId]",
                    params: { shipmentId: item.general_info.id },
                  }}
                >
                  <RecordCard.FooterButton>
                    View Details
                  </RecordCard.FooterButton>
                </Link>
                {/* TODO: Implement update status functionality */}
                {/* <RecordCard.FooterButton>Update Status</RecordCard.FooterButton> */}
              </RecordCard.Footer>
            </Card.Root>
          </ShipmentCard.Provider>
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListEmptyComponent={() => {
          if (isPending) {
            return <ActivityIndicator style={{ flex: 1 }} size="large" />;
          }

          if (error) {
            return (
              <View style={{ marginTop: 20, alignItems: "center", gap: 12 }}>
                <Text>Something went wrong.</Text>
                <Button onPress={() => refetch()}>Retry</Button>
              </View>
            );
          }

          return (
            <Text style={{ textAlign: "center" }}>No shipments found.</Text>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  itemSeparator: {
    height: 16,
  },
});
