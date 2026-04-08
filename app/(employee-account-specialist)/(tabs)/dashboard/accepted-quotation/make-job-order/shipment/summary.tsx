import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/job-order-section/Card";
import BannerHeader from "@/src/components/ui/BannerHeader";
import { useJobOrderEnums } from "@/src/hooks/useJobOrderEnums";
import { useStore } from "@/src/stores/store";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { format, formatDistance } from "date-fns";
import { ReactNode } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const COLOR = "#4E6174";

interface SummaryCardContent {
  label: string;
  value?: string;
}

interface SummaryCardData {
  title: string;
  renderIcon: () => ReactNode;
  content: SummaryCardContent[];
}

export default function Summary() {
  const jobOrderFormData = useStore((state) => state.jobOrderFormData);
  const quotationReference = useStore((state) => state.quotationReference);
  const { data, isPending } = useJobOrderEnums(quotationReference);

  const containerSize = data?.autofill_details?.container_size;
  const volumeDimension = `${data?.autofill_details?.cargo_type} ${containerSize ? ` - ${containerSize}` : ""}`;

  const summaryCardsData: SummaryCardData[] = [
    {
      title: "Client Information",
      renderIcon: () => (
        <MaterialIcons name="person-outline" size={20} color={COLOR} />
      ),
      content: [
        {
          label: "Consignee",
          value: data?.autofill_details?.company_name.toUpperCase(),
        },
        {
          label: "Client Type",
          value: jobOrderFormData.client_type,
        },
        {
          label: "Accredited",
          value: jobOrderFormData.accredited,
        },
        {
          label: "Shipper",
          value: data?.autofill_details?.full_name.toUpperCase(),
        },
        {
          label: "Remarks On Handling Client",
          value: jobOrderFormData.remarks,
        },
      ],
    },
    {
      title: "Service Information",
      renderIcon: () => (
        <MaterialCommunityIcons
          name="briefcase-variant-outline"
          size={20}
          color={COLOR}
        />
      ),
      content: [
        { label: "Service Level", value: jobOrderFormData.service_level },
        { label: "BL NO", value: jobOrderFormData.bl_no },
        { label: "ETA", value: format(jobOrderFormData.eta ?? "", "P") },
        { label: "ETD", value: format(jobOrderFormData.etd ?? "", "P") },
      ],
    },
    {
      title: "Shipment Information",
      renderIcon: () => (
        <MaterialCommunityIcons
          name="package-variant-closed"
          size={20}
          color={COLOR}
        />
      ),
      content: [
        {
          label: "Commodity",
          value: data?.autofill_details?.commodity?.toUpperCase(),
        },
        { label: "Volume/Dimension", value: volumeDimension },
        {
          label: "Hs Code, As Verified By TWG:",
          value: jobOrderFormData.hs_code,
        },
        { label: "ROD", value: jobOrderFormData.rod },
        { label: "Permits Needed", value: jobOrderFormData.permits },
        { label: "If Coordinated:", value: jobOrderFormData.if_coordinated },
        {
          label: "Special Remarks",
          value: jobOrderFormData.shipment_special_remarks,
        },
      ],
    },
    {
      title: "Commitment Information",
      renderIcon: () => (
        <MaterialIcons name="linear-scale" size={20} color={COLOR} />
      ),
      content: [
        {
          label: "Target Delivery",
          value: `${formatDistance(
            jobOrderFormData.delivery_date ?? "",
            jobOrderFormData.eta ?? "",
          )} after arrival`,
        },
        {
          label: "Target Completion Period",
          value: jobOrderFormData.completion_date
            ? format(jobOrderFormData.completion_date ?? "", "P")
            : "",
        },
        {
          label: "Special Remarks",
          value: jobOrderFormData.target_special_remarks,
        },
      ],
    },
    {
      title: "Billing Information",
      renderIcon: () => (
        <MaterialCommunityIcons
          name="receipt-text-outline"
          size={20}
          color={COLOR}
        />
      ),
      content: [
        {
          label: "Terms of Payment",
          value: jobOrderFormData.terms_of_payment,
        },
        {
          label: "When To Bill",
          value: jobOrderFormData.billing_date
            ? format(jobOrderFormData.billing_date ?? "", "P")
            : "",
        },
        {
          label: "Availbale Docs Attached",
        },
      ],
    },
  ];

  const handleSubmit = () => {};

  return (
    <View style={{ flex: 1 }}>
      <BannerHeader title="Shipment" variant="light" />

      <FlatList
        data={summaryCardsData}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <Text variant="titleMedium" style={styles.title}>
              Summary
            </Text>

            <Card>
              <CardHeader>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    },
                    styles.flexLabel,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="sticker-text-outline"
                    size={20}
                    color="#4E6174"
                  />
                  <CardTitle variant="labelSmall" style={styles.upper}>
                    Subject
                  </CardTitle>
                </View>
                <CardTitle style={styles.flexContent}>
                  {jobOrderFormData.subject}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="bodySmall">{jobOrderFormData.email_body}</Text>
              </CardContent>
            </Card>
          </>
        }
        renderItem={({ item }) => (
          <Card>
            <CardHeader>
              {item.renderIcon()}
              <CardTitle variant="labelSmall" style={styles.upper}>
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {item.content.map((contentItem) => (
                <View
                  key={`${item.title}-${contentItem.label}`}
                  style={{ flexDirection: "row", gap: 4 }}
                >
                  <Text
                    variant="bodySmall"
                    style={[styles.contentLabel, styles.flexLabel]}
                  >
                    {contentItem.label}
                  </Text>
                  <Text variant="bodySmall" style={styles.flexContent}>
                    {contentItem.value}
                  </Text>
                </View>
              ))}
            </CardContent>
          </Card>
        )}
        ListFooterComponent={
          <Button
            theme={{ colors: { primary: "#1C213B" } }}
            mode="contained"
            style={styles.button}
            onPress={handleSubmit}
          >
            SUBMIT
          </Button>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  upper: {
    textTransform: "uppercase",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  contentLabel: {
    color: "#979797",
  },
  flexLabel: {
    width: "40%",
  },
  flexContent: {
    flex: 1,
  },
  button: {
    borderRadius: 6,
    paddingVertical: 4,
  },
});
