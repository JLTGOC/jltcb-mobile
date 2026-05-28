import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Portal, Text } from "react-native-paper";
import { useShallow } from "zustand/react/shallow";

import BannerHeader from "@/components/ui/BannerHeader";
import ConfirmModal from "@/components/ui/ConfirmModal";
import SubjectCard from "@/components/ui/SubjectCard";
import SuccesModal from "@/components/ui/SuccessModal";
import SummaryCard from "@/components/ui/SummaryCard";

import { useAuth } from "@/hooks/useAuth";
import { useJobOrderEnums } from "@/hooks/useJobOrderEnums";
import { createJobOrderMutationOptions } from "@/mutation-options/job-orders/createJobOrderMutationOptions";
import { logisticsJobOrderFormSchema } from "@/schemas/job-order/logistics-service-form-schema";
import { useJobOrderFormStore } from "@/stores/useJobOrderFormStore";
import type { SummaryCardData } from "@/types/job-order";
import {
  formatTargetDeliveryDate,
  transformToLogisticsJobOrderPayload,
} from "@/utils/jobOrderForm";
import { showToast } from "@/utils/showToast";
import { buildSummaryItems } from "@/utils/summaryItems";

const COLOR = "#4E6174";

export default function Summary() {
  const router = useRouter();
  const { userData } = useAuth();
  const { quotationReference, logisticsFormData, reset } = useJobOrderFormStore(
    useShallow((state) => ({
      quotationReference: state.quotationReference,
      logisticsFormData: state.logisticsFormData,
      reset: state.reset,
    })),
  );
  const { data } = useJobOrderEnums(quotationReference ?? "");

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

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
          value: logisticsFormData.client_type,
        },
        {
          label: "Accredited",
          value: logisticsFormData.accredited,
        },
        {
          label: "Shipper",
          value: data?.autofill_details?.full_name.toUpperCase(),
        },
        {
          label: "Remarks On Handling Client",
          value: logisticsFormData.remarks,
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
        {
          label: "Service Level",
          value: logisticsFormData.service_level,
        },
        { label: "BL NO", value: logisticsFormData.bl_no },
        {
          label: "ETA",
          value: logisticsFormData.eta
            ? format(logisticsFormData.eta, "P")
            : "",
        },
        {
          label: "ETD",
          value: logisticsFormData.etd
            ? format(logisticsFormData.etd, "P")
            : "",
        },
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
          value: logisticsFormData.hs_code,
        },
        { label: "ROD", value: logisticsFormData.rod },
        { label: "Permits Needed", value: logisticsFormData.permits },
        {
          label: "If Coordinated:",
          value: logisticsFormData.if_coordinated,
        },
        {
          label: "Special Remarks",
          value: logisticsFormData.shipment_special_remarks,
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
          value:
            logisticsFormData.delivery_date && logisticsFormData.eta
              ? formatTargetDeliveryDate(
                  logisticsFormData.delivery_date,
                  logisticsFormData.eta,
                )
              : "",
        },
        {
          label: "Target Completion Period",
          value: logisticsFormData.completion_date
            ? format(logisticsFormData.completion_date, "P")
            : "",
        },
        {
          label: "Special Remarks",
          value: logisticsFormData.target_special_remarks,
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
          value: logisticsFormData.terms_of_payment,
        },
        {
          label: "When To Bill",
          value: logisticsFormData.billing_date
            ? format(logisticsFormData.billing_date, "P")
            : "",
        },
        {
          label: "Shall Be Billed",
          value: logisticsFormData.shall_be_billed,
        },
        {
          label: "Availbale Docs Attached",
        },
      ],
    },
  ];

  const listData = buildSummaryItems(summaryCardsData);

  const handleConfirm = () => {
    setModalVisible(true);
  };

  const { mutateAsync, isPending: isCreatingJobOrder } = useMutation(
    createJobOrderMutationOptions(String(userData?.id)),
  );

  const handleCreateJobOrder = async () => {
    if (!quotationReference) return;

    const { success, data, error } =
      logisticsJobOrderFormSchema.safeParse(logisticsFormData);

    if (!success) {
      console.error("Form data validation failed:", error);
      return;
    }

    const payload = transformToLogisticsJobOrderPayload({
      data,
      quotationReference,
    });

    try {
      await mutateAsync(payload);
      reset();
      setSuccessModalVisible(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        showToast(err.response?.data.message || "Failed to create job order");
      }
    } finally {
      setModalVisible(false);
    }
  };

  const bannerHeaderTitle = modalVisible
    ? "Confirmation of Job Order"
    : successModalVisible
      ? "Job Order to Operations"
      : "Logistics Services";

  return (
    <View style={{ flex: 1 }}>
      <BannerHeader title={bannerHeaderTitle} variant="light" />

      <FlatList
        data={listData}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <Text variant="titleMedium" style={styles.title}>
            Summary
          </Text>
        }
        renderItem={({ item }) => {
          if (item.type === "subject") {
            return (
              <SubjectCard
                subject={logisticsFormData.subject ?? ""}
                body={logisticsFormData.email_body ?? ""}
              />
            );
          }

          return <SummaryCard item={item.item} />;
        }}
        ListFooterComponent={
          <Button
            theme={{ colors: { primary: "#1C213B" } }}
            mode="contained"
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={handleConfirm}
          >
            SUBMIT
          </Button>
        }
      />

      <Portal>
        <ConfirmModal
          icon={<AntDesign name="warning" size={100} color="red" />}
          confirmButtonText="Yes"
          cancelButtonText="Cancel"
          loading={isCreatingJobOrder}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={handleCreateJobOrder}
          title="Send Job Order?"
          description="You're about to sent this Job Order to Operations. Please review all details carefully. Changes after sending will require a revised Job Order."
        />

        <SuccesModal
          onConfirm={() => {
            setSuccessModalVisible(false);
            router.dismissTo("/");
            router.push("/job-orders");
          }}
          visible={successModalVisible}
          title="SUCCESSFULLY SENT!"
          description="The generated Job Order is successfully sent to Operations. They will receive a notification of the created Job Order."
        />
      </Portal>
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
  },
  buttonLabel: {
    paddingVertical: 4,
  },
});
