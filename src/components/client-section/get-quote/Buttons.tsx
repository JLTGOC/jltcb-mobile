import { Dispatch, SetStateAction, useMemo } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { QuoteForm, FieldConfig } from "../../../types/client";

type Props = {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  formData: QuoteForm;
  setError: Dispatch<SetStateAction<boolean>>;
  handleSumbit: () => void
  loading: boolean;

  stepConfigs: Record<
    number,
    { fields: FieldConfig[]; section: keyof QuoteForm }
  >;
};

export default function Buttons({
  currentPosition,
  setCurrentPosition,
  setError,
  formData,
  stepConfigs,
  handleSumbit,
  loading,
}: Props) {
  const isStepInvalid = useMemo(() => {
    const config = stepConfigs[currentPosition];
    if (!config) return false;

    const sectionData = formData[config.section];
    const hasEmptyRequiredFields = config.fields.some((field) => {
      const value = (sectionData as any)?.[field.key];
      return field.required && (!value || value.trim() === "");
    });

    if (hasEmptyRequiredFields) return true;

    if (currentPosition === 1) {
      const service = formData.service;
      const commodity = formData.commodity;
      const shipment = formData.shipment
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

    return false;
  }, [formData, currentPosition, stepConfigs]);

  const handleNext = () => {
    if (isStepInvalid) {
      setError(true);
      return;
    }

    setError(false);
    if (currentPosition < 2) {
      setCurrentPosition((prev) => prev + 1);
    } 
  };

  return (
    <View style={styles.buttonRow}>
      {currentPosition > 0 ? (
        <Button
          mode="outlined"
          disabled={loading}
          onPress={() => setCurrentPosition((prev) => prev - 1)}
          style={styles.backBtn}
        >
          Back
        </Button>
      ) : (
        <View style={{ width: 100 }} />
      )}

      <Button
        style={{ backgroundColor: isStepInvalid ? "#C5C9D6" : "#161F3C" }}
        mode="contained"
        loading={loading}
        onPress={() => {
          if (currentPosition < 2) {
            handleNext();
          } else {
            console.log(formData)
            handleSumbit()
          }
        }}
      >
        {currentPosition === 2 ? "Submit" : "Next"}
      </Button>
    </View>
  );
}

const styles = {
  buttonRow: {
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
    marginTop: 20,
    paddingBottom: 10,
  },
  backBtn: {
    borderColor: "#161F3C",
  },
};
