import {
  Text,
  ImageBackground,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import * as Linking from "expo-linking";

export default function Governance() {
  const logos = [
    {
      logo: require("../../assets/government/birLogo.png"),
      name: "BUREAU OF INTERNAL REVENUE",
    },
    {
      logo: require("../../assets/government/bocLogo.png"),
      name: "BUREAU OF CUSTOMS",
    },
    {
      logo: require("../../assets/government/dofLogo.png"),
      name: "DEPARTMENT OF FINANCE",
    },
    {
      logo: require("../../assets/government/dtiLogo.png"),
      name: "DEPARTMENT OF TRADE & INDUSTRY",
    },
    {
      logo: require("../../assets/government/pccbiLogo.png"),
      name: "PHILIPPINE CHAMBER OF CUSTOMS BROKERS INC",
    },
    {
      logo: require("../../assets/government/pezaLogo.png"),
      name: "PHILIPPINE ECONOMIC ZONE AUTHORITY",
    },
    {
      logo: require("../../assets/government/ppaLogo.jpg"),
      name: "PHILIPPINE PORTS AUTHORITY",
    },
    {
      logo: require("../../assets/government/prcLogo.png"),
      name: "PROFESSIONAL REGULATION COMISION ",
    },
  ];

  return (
    <View style={{ flex: 1,}}>
      <ImageBackground
        source={require("../../assets/banners/small.png")}
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
          <TouchableOpacity style={styles.itemContainer}>
            <Image source={item.logo} style={styles.logoImage} />
            <Text style={{textAlign:"center", fontWeight:700}}>{item.name}</Text>
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
    marginTop: -20
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
