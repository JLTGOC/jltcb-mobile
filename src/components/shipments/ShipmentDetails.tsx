import Box from "@material-symbols/svg-500/outlined/box.svg";
import CorporateFare from "@material-symbols/svg-500/outlined/corporate_fare.svg";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

import ClientCard, {
  type ClientCardProps,
} from "@/components/details/ClientCard";
import { DetailCard } from "@/components/details/DetailCard";

import { shipmentQueries } from "@/queries/shipments";

export default function ShipmentDetails() {
  const { shipmentId } = useLocalSearchParams<{
    shipmentId: string;
  }>();

  const { data } = useQuery(shipmentQueries.detail(Number(shipmentId)));

  if (!data) return null;

  const clientCardData: ClientCardProps = {
    fullName: data.data.general_info.client.full_name,
    userImage: data.data.general_info.client.image_path,
    companyName: data.data.general_info.client.company_name,
    contactNumber: data.data.general_info.client.contact_number,
    email: data.data.general_info.client.email,
  };

  const detailSections = [
    {
      title: "Consigneee Details",
      icon: CorporateFare,
      content: [
        {
          label: "Company Name",
          value: data.data.consignee_details.company_name,
        },
        {
          label: "Company Address",
          value: data.data.consignee_details.company_address,
        },
        {
          label: "Contact Person",
          value: data.data.consignee_details.contact_person,
        },
        {
          label: "Contact Number",
          value: data.data.consignee_details.contact_number,
        },
        {
          label: "Email",
          value: data.data.consignee_details.email,
        },
      ],
    },
    {
      title: "Shipment Details",
      icon: Box,
      content: [
        {
          label: "Service Type",
          value: data.data.shipment_information.service_type,
        },
        {
          label: "Freight Transport Mode",
          value: data.data.shipment_information.transport_mode,
        },
        {
          label: "Service",
          value: data.data.shipment_information.sub_services.join(" \n"),
        },
        { label: "Commodity", value: data.data.commodity_details.commodity },
        {
          label: "Volume (Dimension)",
          value: `${data.data.commodity_details.cargo_type} ${data.data.commodity_details.container_size}`,
        },
        {
          label: "Origin",
          value: data.data.shipment_information.origin,
        },
        {
          label: "Destination",
          value: data.data.shipment_information.destination,
        },
        { label: "Details", value: data.data.shipment_information.remarks },
      ],
    },
    {
      title: "Person in Charge",
      icon: Box,
      content: [
        {
          label: "Person in Charge",
          value: data.data.general_info.person_in_charge.full_name,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <ClientCard {...clientCardData} />

      {detailSections.map((section) => (
        <DetailCard.Root key={section.title}>
          <DetailCard.Title title={section.title} icon={section.icon} />
          <DetailCard.Content>
            {section.content.map((item) => (
              <DetailCard.Detail key={item.label + item.value}>
                <DetailCard.Label>{item.label}</DetailCard.Label>
                <DetailCard.Value>{item.value}</DetailCard.Value>
              </DetailCard.Detail>
            ))}
          </DetailCard.Content>
        </DetailCard.Root>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flex: 1,
    gap: 12,
  },
});
