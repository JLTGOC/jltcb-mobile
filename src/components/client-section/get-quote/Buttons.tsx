import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { FieldConfig, QuoteForm } from "../../../types/client-type";

const CONTACT_NUMBER_REGEX = /^09\d{9}$/;
const COMPANY_EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/i;

type Props = {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  formData: QuoteForm;
  handleSumbit: () => void;
  loading: boolean;

  stepConfigs: Record<
    number,
    { fields: FieldConfig[]; section: keyof QuoteForm }
  >;
};

export default function Buttons({
  currentPosition,
  setCurrentPosition,
  formData,
  stepConfigs,
  handleSumbit,
  loading,
}: Props) {
  const [isNextLoading, setIsNextLoading] = useState(false);

  const isStepInvalid = useMemo(() => {
    const config = stepConfigs[currentPosition];
    if (!config) return false;

    const sectionData = formData[config.section];
    const hasEmptyRequiredFields = config.fields.some((field) => {
      const value = (sectionData as any)?.[field.key];
      return field.required && (!value || value.trim() === "");
    });

    if (hasEmptyRequiredFields) return true;

    if (currentPosition === 0) {
      const company = formData.company;
      const isContactNumberValid = CONTACT_NUMBER_REGEX.test(
        (company?.contact_number || "").trim(),
      );
      const isEmailValid = COMPANY_EMAIL_REGEX.test(
        (company?.email || "").trim(),
      );

      return !isContactNumberValid || !isEmailValid;
    }

    if (currentPosition === 1) {
      const service = formData.service;
      const commodity = formData.commodity;
      const shipment = formData.shipment;

      return (
        !service?.type ||
        !commodity?.commodity ||
        !shipment?.origin ||
        !shipment?.destination ||
        (commodity?.commodity === "containerized" &&
          !commodity?.container_size) ||
        (service.options?.length ?? 0) === 0
      );
    }

    if (currentPosition === 2) {
      const hasUploadedDocuments = Array.isArray(formData.documents)
        ? formData.documents.some(
            (document) =>
              !!document &&
              typeof document.file_name === "string" &&
              document.file_name.trim().length > 0 &&
              typeof document.file_url === "string" &&
              document.file_url.trim().length > 0,
          )
        : false;

      return !hasUploadedDocuments;
    }

    return false;
  }, [formData, currentPosition, stepConfigs]);

  const isActionLoading = loading || isNextLoading;

  const handleNext = () => {
    if (isStepInvalid || isActionLoading) {
      return;
    }

    if (currentPosition < 2) {
      setIsNextLoading(true);
      setTimeout(() => {
        setCurrentPosition((prev) => prev + 1);
        setIsNextLoading(false);
      }, 500);
    }
  };

  const showNextLoading = currentPosition < 2 && isNextLoading;
  const showSubmitLoading = currentPosition === 2 && loading;
  const showButtonLoading = showNextLoading || showSubmitLoading;

  return (
    <View style={styles.buttonRow}>
      {currentPosition > 0 ? (
        <Button
          mode="outlined"
          disabled={isActionLoading}
          onPress={() => setCurrentPosition((prev) => prev - 1)}
          style={styles.backBtn}
        >
          Back
        </Button>
      ) : (
        <View style={{ width: 100 }} />
      )}

      {showButtonLoading ? (
        <View style={styles.loadingButton}>
          <View style={styles.loadingContent}>
            <ActivityIndicator color="#FFFFFF" size={16} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      ) : (
        <Button
          style={{ backgroundColor: isStepInvalid ? "#C5C9D6" : "#161F3C" }}
          mode="contained"
          disabled={isStepInvalid}
          onPress={() => {
            if (isStepInvalid || isActionLoading) {
              return;
            }
            if (currentPosition < 2) {
              handleNext();
            } else {
              handleSumbit();
            }
          }}
        >
          {currentPosition === 2 ? "Submit" : "Next"}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10,
  },
  backBtn: {
    borderColor: "#161F3C",
  },
  loadingContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingButton: {
    backgroundColor: "#161F3C",
    borderRadius: 20,
    minHeight: 40,
    minWidth: 130,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  loadingText: {
    color: "#FFFFFF",
    marginVertical: 0,
  },
});
