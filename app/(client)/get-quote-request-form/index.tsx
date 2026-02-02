import React, { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Check, MoveLeft } from "lucide-react-native";
import { ImageBackground } from "expo-image";
import StepIndicator from "react-native-step-indicator";

import Step_1 from "../../../src/components/client-section/get-quote/Step_1";
import Step_2 from "../../../src/components/client-section/get-quote/Step_2";
import Step_3 from "../../../src/components/client-section/get-quote/Step_3";
import Buttons from "../../../src/components/client-section/get-quote/Buttons";

export default function StepperExample() {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [error, setError] = useState<boolean>(false);

  return (
    <>
      <ImageBackground
        source={require("../../../src/assets/banners/small.png")}
        contentFit="cover"
        style={{
          padding: 10,
          aspectRatio: 3,
          width: "100%",
          marginBottom: -35,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <MoveLeft color={"#EE9034"} />
          <Text
            style={{
              color: "#EE9034",
              fontSize: 20,
              fontWeight: 500,
              marginBottom: 4,
            }}
            allowFontScaling={false}
          >
            Get Qoute
          </Text>
        </View>
      </ImageBackground>

      <View style={{ padding: 10 }}>
        <StepIndicator
          customStyles={stepIndicatorStyles}
          currentPosition={currentPosition}
          stepCount={3}
          renderStepIndicator={(params) => {
            if (params.stepStatus === "finished") {
              return <Check color="#FFFFFF" width={20} height={20} />;
            } else {
              return null;
            }
          }}
        />
        {currentPosition === 0 && <Step_1 error={error} ssetError={setError}/>}
        {currentPosition === 1 && <Step_2 />}
        {currentPosition === 2 && <Step_3 />}
        <Buttons
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          error={error}
        />
      </View>
    </>
  );
}

const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 3,

  // Circle borders
  stepStrokeCurrentColor: "#161F3C",
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: "#161F3C",
  stepStrokeUnFinishedColor: "#C5C9D6",

  // Line colors
  separatorFinishedColor: "#161F3C",
  separatorUnFinishedColor: "#C5C9D6",

  // Circle fill
  stepIndicatorFinishedColor: "#161F3C",
  stepIndicatorUnFinishedColor: "#FFFFFF",
  stepIndicatorCurrentColor: "#FFFFFF",
};
