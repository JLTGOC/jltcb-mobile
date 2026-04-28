import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Details from "@/src/components/client-section/quotations/Details";
import Documents from "@/src/components/client-section/quotations/Documents";
import BannerHeader from "@/src/components/ui/BannerHeader";

export default function SharedClientQuotation() {
  const { id, title, status } = useLocalSearchParams<{
    id: string;
    title: string;
    status: string;
  }>();

  const [active, setActive] = useState(0);

  const tabs = ["DETAILS", "DOCUMENTS", "", ""];

  const screenWidth = Dimensions.get("screen").width;

  const renderTabContent = () => {
    switch (active) {
      case 0:
        return <Details quotationId={id} />;
      case 1:
        return (
          <View style={styles.placeholder}>
            <Documents quotationId={id} />
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
      contentContainerStyle={styles.listContent}
      renderItem={({}) => (
        <View style={styles.screenContent}>
          <BannerHeader
            title={title}
            variant="dark"
            titleProps={{ numberOfLines: 2 }}
          />

          <View style={styles.buttonContainer}>
            {tabs.map((t, i) => (
              <Pressable
                key={i}
                onPress={() => setActive(i)}
                style={({ pressed }) => [
                  styles.button,
                  {
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
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
              </Pressable>
            ))}
          </View>

          {renderTabContent()}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  screenContent: {
    flex: 1,
  },
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
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
});
