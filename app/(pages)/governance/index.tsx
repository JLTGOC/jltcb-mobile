import {
  Text,
  ImageBackground,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function Index() {
  const logos = [
    {
      logo: require("../../../assets/government/birLogo.png"),
      name: "BUREAU OF INTERNAL REVENUE",
      url: "https://www.bir.gov.ph/home",
    },
    {
      logo: require("../../../assets/government/bocLogo.png"),
      name: "BUREAU OF CUSTOMS",
      url: "https://customs.gov.ph/",
    },
    {
      logo: require("../../../assets/government/dofLogo.png"),
      name: "DEPARTMENT OF FINANCE",
      url: "https://www.dof.gov.ph/services/customs-modernization-and-tariff-act/",
    },
    {
      logo: require("../../../assets/government/dtiLogo.png"),
      name: "DEPARTMENT OF TRADE & INDUSTRY",
      url: "https://www.dti.gov.ph/",
    },
    {
      logo: require("../../../assets/government/pccbiLogo.png"),
      name: "PHILIPPINE CHAMBER OF CUSTOMS BROKERS INC",
      url: "https://pccbi.com.ph/ccbi-cogs/",
    },
    {
      logo: require("../../../assets/government/pezaLogo.png"),
      name: "PHILIPPINE ECONOMIC ZONE AUTHORITY",
      url: "https://www.peza.gov.ph/peza-online",
    },
    {
      logo: require("../../../assets/government/ppaLogo.png"),
      name: "PHILIPPINE PORTS AUTHORITY",
      url: "https://www.ppa.com.ph/",
    },
    {
      logo: require("../../../assets/government/prcLogo.png"),
      name: "PROFESSIONAL REGULATION COMISION ",
      url: "https://online.prc.gov.ph/",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/banners/small.png")}
        style={{
          aspectRatio: 3,
          paddingVertical: 30,
          paddingHorizontal: 40,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: "500",
          }}
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
            <Image source={item.logo} style={styles.logoImage} />
            <Text style={{ textAlign: "center", fontWeight: 700 }}>
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
    resizeMode: "contain",
    marginBottom: 8,
  },
  logoText: {
    textAlign: "center",
  },
});
