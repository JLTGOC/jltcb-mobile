import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";

export default function ColumnServices() {
  const data = [
    {
      image: require("../../../assets/services/column/1.png"),
      title: "IMPORT EXPORT CUSTOMS CLEARANCE",
      description:
        "24/7 customs clearance for all shipment types, ensuring fast compliance with Philippine regulations.",
    },
    {
      image: require("../../../assets/services/column/2.png"),
      title: "PEZA PROCESSING & COMPLIANCE",
      description:
        "Full support for PEZA-registered businesses permits, documentation, and tax incentive processing.",
    },
    {
      image: require("../../../assets/services/column/3.png"),
      title: "PERMITS AND LICENSES",
      description:
        "End-to-end management of trade permits, accreditations, renewals, and government approvals.",
    },
    {
      image: require("../../../assets/services/column/4.png"),
      title: "CUSTOMS DISPUTE RESOLUTION",
      description:
        "Expert handling of seizures, abandoned shipments, manifest errors, and complex customs cases.",
    },
    {
      image: require("../../../assets/services/column/5.png"),
      title: "POST-CLEARANCE SERVICES",
      description:
        "Audit-ready support beyond release, including Post-Clearance Audit (PCA) compliance.",
    },
    {
      image: require("../../../assets/services/column/6.png"),
      title: "CUSTOMS & TRADE CONSULTANCY",
      description:
        "Guidance on tariffs, trade rules, and logistics for cost-efficient, compliant operations.",
    },
  ];
  return (
    <View style={{ height: "61%", margin: 0 }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    // Remove outline
    borderWidth: 0,
    padding: 5,
    marginBottom: 5,

    //IOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 2 }, // Bottom shadow only

    // Android shadow
    elevation: 6,
  },
  image: {
    height: 75,
    width: 75,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
  },
  description: {
    fontSize: 12,
    fontWeight: 500,
    flexWrap: "wrap",
    width: 200,
  },
});
