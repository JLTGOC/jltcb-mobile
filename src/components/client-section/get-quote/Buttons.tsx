import { Dispatch, SetStateAction, useMemo } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { QuoteForm,Field } from "../../../types/client";

type Props = {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
  formData: QuoteForm;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  stepFields: Record<number, Field[]>;
};

export default function Buttons({
  currentPosition,
  setCurrentPosition,
  setError,
  formData,
  stepFields,
}: Props) {

  const isStepInvalid = useMemo(() => {
    const currentStepFields = stepFields[currentPosition] || [];

   return currentStepFields.some((field) => {
    const value = formData[field.key as keyof QuoteForm] ?? "";
    return typeof value === 'string' && value.trim() === "";
  });
  }, [formData, currentPosition, stepFields]);

  const handleNext = () => {
    if (isStepInvalid) {
      setError(true);
      return;
    }

    setError(false);

    if (currentPosition < 2) {
      setCurrentPosition((prev) => prev + 1);
    } else {
      console.log("SUBMIT", formData);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      {currentPosition > 0 ? (
        <Button
          mode="outlined"
          onPress={() =>
            setCurrentPosition((prev) => (prev > 0 ? prev - 1 : prev))
          }
        >
          Back
        </Button>
      ) : (
        <View style={{ width: 100 }} />
      )}

      <Button
        style={{ backgroundColor: isStepInvalid ? "#999" : "#161F3C" }}
        mode="contained"
        onPress={handleNext}
      >
        {currentPosition === 3 ? "Submit" : "Next"}
      </Button>
    </View>
  );
}
