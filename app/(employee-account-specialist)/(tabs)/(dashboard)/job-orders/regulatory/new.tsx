import { AntDesign } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button, Checkbox, HelperText, Portal } from "react-native-paper";

import AutocompleteDropdown from "@/components/ui/AutocompleteDropdown";
import BannerHeader from "@/components/ui/BannerHeader";
import ConfirmModal from "@/components/ui/ConfirmModal";
import FloatingLabelInput from "@/components/ui/FloatingLabelTextInput";
import FormTextInput from "@/components/ui/FormTextInput";
import KeyboardAwareScrollView from "@/components/ui/KeyboardAwareScrollView";
import SuccesModal from "@/components/ui/SuccessModal";

import { useCreateJobOrderMutation } from "@/hooks/mutations/job-orders/useCreateJobOrderMutation";
import { jobOrderFormQueries } from "@/queries/job-orders/form";
import {
  type RegulatoryServiceFormSchema,
  regulatoryServiceFormSchema,
} from "@/schemas/job-order/regulatory-service-form-schema";
import { useJobOrderFormStore } from "@/stores/useJobOrderFormStore";
import { transformToRegulatoryJobOrderPayload } from "@/utils/jobOrderForm";
import { showToast } from "@/utils/showToast";

export default function RegulatoryJobOrderForm() {
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegulatoryServiceFormSchema>({
    resolver: zodResolver(regulatoryServiceFormSchema),
    defaultValues: {
      subject: "",
      client_type: undefined,
      service: "",
      accredited: undefined,
      email_body: "",
      remarks: "",
    },
  });

  const quotationReference = useJobOrderFormStore(
    (state) => state.quotationReference,
  );
  const { data, isPending } = useQuery(
    jobOrderFormQueries.enums(quotationReference ?? undefined),
  );

  const { mutate, isPending: isCreatingJobOrder } = useCreateJobOrderMutation();

  const onSubmit = handleSubmit(async () => {
    setModalVisible(true);
  });

  const handleCreateRegulatoryJobOrder = (
    data: RegulatoryServiceFormSchema,
  ) => {
    if (!quotationReference) return;

    const payload = transformToRegulatoryJobOrderPayload({
      data,
      quotationReference,
    });

    mutate(payload, {
      onSuccess: () => setSuccessModalVisible(true),
      onError: (err) => {
        if (isAxiosError(err)) {
          showToast(err.response?.data.message || "Failed to create job order");
        }
      },
      onSettled: () => setModalVisible(false),
    });
  };

  const onConfirmCreateRegulatoryJobOrder = handleSubmit(
    handleCreateRegulatoryJobOrder,
  );

  const bannerHeaderTitle = modalVisible
    ? "Confirmation of Job Order"
    : successModalVisible
      ? "Job Order to Operations"
      : "Regulatory Services";

  return (
    <KeyboardAwareScrollView stickyHeaderIndices={[0]}>
      <BannerHeader title={bannerHeaderTitle} variant="light" />

      <View style={styles.content}>
        {/* Subject */}
        <View>
          <Controller
            control={control}
            name="subject"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="SUBJECT"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={styles.textColor}
                labelStyle={styles.textColor}
              />
            )}
          />
          {errors.subject && (
            <HelperText type="error">{errors.subject.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="client_type"
            render={({ field: { onChange, value } }) => (
              <AutocompleteDropdown
                textInputProps={{
                  placeholder: "CLIENT TYPE",
                  placeholderTextColor: "#898989",
                  style: [{ fontSize: 12 }, styles.textColor],
                }}
                dataSet={data?.client_types ?? null}
                loading={isPending}
                onSelectItem={(item) => onChange(item?.id)}
                initialValue={value}
              />
            )}
          />
          {errors.client_type && (
            <HelperText type="error">{errors.client_type.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="accredited"
            render={({ field: { onChange, value } }) => (
              <View style={styles.checkboxRow}>
                {data?.accredited.map((item, i) => (
                  <View key={item.id} style={styles.checkboxItemContainer}>
                    <Checkbox.Item
                      label={item.title}
                      position="leading"
                      mode="android"
                      color="#00960A"
                      status={value === item.id ? "checked" : "unchecked"}
                      labelStyle={styles.checkboxLabel}
                      style={styles.checkboxItem}
                      onPress={() =>
                        value === item.id
                          ? onChange(undefined)
                          : onChange(item.id)
                      }
                    />
                  </View>
                ))}
              </View>
            )}
          />
          {errors.accredited && (
            <HelperText type="error">{errors.accredited.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="service"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormTextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="SERVICE"
              />
            )}
          />
          {errors.service && (
            <HelperText type="error">{errors.service.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="email_body"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="EMAIL BODY"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={styles.textColor}
                labelStyle={styles.textColor}
                multiline
                numberOfLines={4}
              />
            )}
          />
          {errors.email_body && (
            <HelperText type="error">{errors.email_body.message}</HelperText>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="remarks"
            render={({ field: { onChange, onBlur, value } }) => (
              <FloatingLabelInput
                label="REMARKS"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                labelStyle={styles.textColor}
                multiline
                style={[styles.textColor, { minHeight: 60 }]}
                numberOfLines={2}
              />
            )}
          />
          {errors.remarks && (
            <HelperText type="error">{errors.remarks.message}</HelperText>
          )}
        </View>

        <Button
          theme={{ colors: { primary: "#1C213B" } }}
          mode="contained"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={onSubmit}
        >
          GENERATE SHIPMENT
        </Button>
      </View>

      <Portal>
        <ConfirmModal
          icon={<AntDesign name="warning" size={100} color="red" />}
          confirmButtonText="Yes"
          cancelButtonText="Cancel"
          loading={isCreatingJobOrder}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onConfirm={onConfirmCreateRegulatoryJobOrder}
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
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  textColor: {
    color: "black",
  },
  checkboxRow: {
    flexDirection: "row",
  },
  checkboxItem: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  checkboxItemContainer: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 12,
    color: "black",
    textAlign: "left",
  },
  button: {
    borderRadius: 6,
  },
  buttonLabel: {
    paddingVertical: 4,
  },
});
