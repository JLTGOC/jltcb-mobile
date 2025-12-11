import { Text, StyleSheet, View, TouchableOpacity,  } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ContactDetails() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("");

  const tabs = ["MAIN", "BATAAN", "CLARK", ""];
  const contactDetails = [
    {
      icon: "location-outline",
      description:
        "SUITE 508, PACIFIC CENTRE, 460 QUINTIN PAREDE ST.\nBRGY. BINONDO, MANILA, PHILIPPINES 1006",
    },
    {
      icon: "call-outline",
      description: "+63 977 729 8029\n+63 998 599 5399",
    },
    {
      icon: "at-outline",
      description: "JILLTOLENTINO@JLTCB.COM\nINQUIRY@JLTCB.COM",
    },
    {
      icon: "calendar-outline",
      description: "MONDAY - FRIDAY\nINQUIRY@JLTCB.COM",
    },
  ];
  return (
    <View style={styles.container}>
      {/* tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((t, i) => (
          <TouchableOpacity
            key={i}
            style={styles.button}
            onPress={() => {
              setActive(i), setTab(t);
            }}
          >
            <Text
              style={[styles.buttonText, active === i && styles.activeText]}
            >
              {t}
            </Text>
            {active === i && <View style={styles.underline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* details */}
      <View>
        {contactDetails.map((detail, i) => (
          <View key={i} style={styles.contactContainer}>
            <View style={styles.iconsCotainer}>
              <Ionicons name={detail.icon} size={25} color="#ffffffff" />
            </View>
            <Text style={{fontSize:12}} >{detail.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    marginHorizontal: 25,
  },
  tabsContainer: {
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
  iconsCotainer: {
    backgroundColor: "#1D274E",
    borderRadius: 25,
    height: 50,
    width: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight:10
  },
  contactContainer: {
    flexDirection: "row",
    marginVertical: 2,
    alignItems: "center",
  },
});
