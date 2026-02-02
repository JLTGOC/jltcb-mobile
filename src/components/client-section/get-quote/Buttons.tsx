import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

type Props = {
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
};

export default function Buttons({
  currentPosition,
  setCurrentPosition,
}: Props) {
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
        style={{ backgroundColor: "#161F3C" }}
        mode="contained"
        onPress={() =>
          setCurrentPosition((prev) => (prev < 3 ? prev + 1 : prev))
        }
      >
        {currentPosition === 3 ? "Submit" : "Next"}
      </Button>
    </View>
  );
}
