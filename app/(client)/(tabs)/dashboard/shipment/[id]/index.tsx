import Details from "@/src/components/client-section/shipment/Details";
import Documents from "@/src/components/client-section/shipment/Documents";
import Billing from  "@/src/components/client-section/shipment/Billing";  
import BannerHeader from "@/src/components/ui/BannerHeader";

import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ShipmentDetails() {
  const { id, reference_number } = useLocalSearchParams<{
    id: string;
    reference_number?: string;
  }>();
  const shipmentId = Number(id);
  const referenceNumber =
    reference_number && !Number.isNaN(Number(reference_number))
      ? Number(reference_number)
      : undefined;
  const headerTitle =
    referenceNumber !== undefined
      ? String(referenceNumber)
      : (reference_number ?? "Shipment Details");

  const [active, setActive] = useState(0);

  const tabs = ["DETAILS", "DOCUMENTS", "BILLING", ""];

  const screenWidth = Dimensions.get("screen").width;

  const renderTabContent = () => {
    switch (active) {
      case 0:
        return <Details shipment={shipmentId}/>;
      case 1:
        return (
          <View style={styles.placeholder}>
            <Documents/>
          </View>
        );
      case 2:
        return (
          <View style={styles.placeholder}>
            <Billing/>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={[0]}
      keyExtractor={(item) => item.toString()}
      renderItem={({}) => (
        <>
          <BannerHeader title={headerTitle} variant="dark" />

          <View style={styles.buttonContainer}>
            {tabs.map((t, i) => (
              <TouchableOpacity
                key={i}
                style={styles.button}
                onPress={() => setActive(i)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { fontSize: screenWidth * 0.03 },
                    active === i && styles.activeText,
                  ]}
                  allowFontScaling={false}
                >
                  {t}
                </Text>
                {active === i && <View style={styles.underline} />}
              </TouchableOpacity>
            ))}
          </View>

          {renderTabContent()}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderColor: "#9D9D9D",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 10,
    color: "#555",
  },
  activeText: {
    color: "#000",
    fontWeight: "600",
  },
  underline: {
    height: 3,
    width: "100%",
    backgroundColor: "#EE9034",
    position: "absolute",
    bottom: -3,
  },
  placeholder: {
    padding: 20,
    alignItems: "center",
  },
});
