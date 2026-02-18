import Header from "@/src/components/client-section/Header";
import Details from "@/src/components/client-section/requested-quote/Details";

import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { routes } from "@/src/constants/routes";

export default function QuoteDetails() {
  const { id, title, mode } = useLocalSearchParams<{
    id: string;
    title: string;
    mode: string;
  }>();

  const [active, setActive] = useState(0);

  const tabs = ["DETAILS", "DOCUMENTS", "", ""];

  const screenWidth = Dimensions.get("screen").width;

  console.log("QuoteDetails", id,mode)

  const renderTabContent = () => {
    switch (active) {
      case 0:
        return <Details id={id} mode={mode} />;
      case 1:
        return (
          <View style={styles.placeholder}>
            <Text>Documents Content</Text>
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
          <Header title={title} route={routes.CLIENT_REQ_QUOTE_RECORDS} />

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
