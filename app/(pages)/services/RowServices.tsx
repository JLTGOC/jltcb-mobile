import { Image } from "expo-image";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function RowServices() {
  const data = [
    {
      image: require("../../../src/assets/services/row/1.png"),
      title: "INTERNATIONAL FREIGHT FORWARDING",
    },
    {
      image: require("../../../src/assets/services/row/2.png"),
      title: "DOMESTIC FREIGHT FORWARDING",
    },
    {
      image: require("../../../src/assets/services/row/3.png"),
      title: "TRUCKING SERVICES",
    },
    {
      image: require("../../../src/assets/services/row/4.png"),
      title: "PROJECT CARGO",
    },
  ];
  return (
    <>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image source={item.image} style={styles.image} />
              <Text style={{ textAlign: "center" }} allowFontScaling={false}>{item.title}</Text>
            </View>
          </Card>
        )}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    // Remove outline
    borderWidth: 0,
    padding: 5,
    width: 150,
    height: 110,

    //IOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 }, // Bottom shadow only

    // Android shadow
    elevation: 6,

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 60,
    width: 60,
  },
  cardContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
