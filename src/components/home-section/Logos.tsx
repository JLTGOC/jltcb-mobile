
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

// --- Data ---
const logos = [
  {
    logo: require("../../../src/assets/landing-page/customs-brokerage.png"),
    url: "",
  },
  {
    logo: require("../../../src/assets/landing-page/global-trade.png"),
    url: "",
  },
  {
    logo: require("../../../src/assets/landing-page/world-wide-logistics.png"),
    url: "",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const LOGO_SIZE = SCREEN_WIDTH * 0.095;
const GAP = 30;

export default function GovernmentLogosMarquee() {
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <FlatList
        data={logos}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openLink(item.url)}
            style={{ marginRight: GAP }}
          >
            <Image
              source={item.logo}
              style={{ height: LOGO_SIZE, width: LOGO_SIZE }}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 2,
    backgroundColor: "#fff",
    alignItems:"center"
  },
});

const marqueeStyles = StyleSheet.create({
  hidden: {
    opacity: 0,
    position: "absolute",
    zIndex: -1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
});
