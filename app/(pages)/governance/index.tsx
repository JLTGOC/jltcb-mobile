import { Image, ImageBackground } from "expo-image";
import * as Linking from "expo-linking";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function Index() {
  const logos = [
    {
      logo: require("../../../src/assets/government/birLogo.png"),
      name: "BUREAU OF INTERNAL REVENUE",
      url: "https://www.bir.gov.ph/home",
    },
    {
      logo: require("../../../src/assets/government/bocLogo.png"),
      name: "BUREAU OF CUSTOMS",
      url: "https://customs.gov.ph/",
    },
    {
      logo: require("../../../src/assets/government/dofLogo.png"),
      name: "DEPARTMENT OF FINANCE",
      url: "https://www.dof.gov.ph/services/customs-modernization-and-tariff-act/",
    },
    {
      logo: require("../../../src/assets/government/dtiLogo.png"),
      name: "DEPARTMENT OF TRADE & INDUSTRY",
      url: "https://www.dti.gov.ph/",
    },
    {
      logo: require("../../../src/assets/government/pccbiLogo.png"),
      name: "PHILIPPINE CHAMBER OF CUSTOMS BROKERS INC",
      url: "https://pccbi.com.ph/ccbi-cogs/",
    },
    {
      logo: require("../../../src/assets/government/pezaLogo.png"),
      name: "PHILIPPINE ECONOMIC ZONE AUTHORITY",
      url: "https://www.peza.gov.ph/peza-online",
    },
    {
      logo: require("../../../src/assets/government/ppaLogo.png"),
      name: "PHILIPPINE PORTS AUTHORITY",
      url: "https://www.ppa.com.ph/",
    },
    {
      logo: require("../../../src/assets/government/prcLogo.png"),
      name: "PROFESSIONAL REGULATION COMISION ",
      url: "https://online.prc.gov.ph/",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../src/assets/banners/small.png")}
        style={{
          aspectRatio: 3,
          paddingVertical: 30,
          paddingHorizontal: 40,
        }}
        contentFit="cover"
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: "500",
          }}
          allowFontScaling={false}
        >
          GOVERNANCE
        </Text>
      </ImageBackground>

      <FlatList
        data={logos}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openLink(item.url)}
            style={styles.itemContainer}
          >
            <Image source={item.logo} style={styles.logoImage} contentFit="contain" />
            <Text
              style={{ textAlign: "center", fontWeight: 700 }}
              allowFontScaling={false}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1, // important for numColumns
    alignItems: "center",
    padding: 10,
    marginTop: -20,
  },
  logoImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  logoText: {
    textAlign: "center",
  },
});
