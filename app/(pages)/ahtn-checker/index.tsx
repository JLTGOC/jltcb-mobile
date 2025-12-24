import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";

export default function AHTNChecker() {
  const [checked, setChecked] = useState(false);

  const data = [
    "SELECT ALL:",
    "AANZFTA - ASEAN-Australia-New Zealand Free Trade Agreement",
    "ACFTA - ASEAN-China Free Trade Agreement",
    "AHKFTA - ASEAN-Hong Kong, China Free Trade Agreement",
    "AIFTA - ASEAN-India Free Trade Agreement",
    "AJCEPA - ASEAN-Japan Comprehensive Economic Partnership Agreement",
    "AAKFTA - ASEAN-Korea Free Trade Agreement",
    "ATIGA - ASEAN Trade in Goods Agreement",
    "MFN - Most Favoured Nation",
    "PH-EFTA FTA (CHE/LIE) - Philippines-European Free Trade Association Free Trade Agreement FTA (Switzerland/Liechtenstein)",
    "PH-EFTA FTA (ISL) - Philippines-European Free Trade Association Free Trade Agreement (Iceland)",
    "H-EFTA FTA (NOR) - Philippines-European Free Trade Association Free Trade Agreement (Norway)",
    "PH-KR FTA - Philippines-Korea Free Trade Agreement",
    "Philippines-Japan Economic Partnership Agreement",
    "RCEP - Regional Comprehensive Economic Partnership Agreement",
  ];
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#888"
          textAlign="center"
          textAlignVertical="center"
          placeholder="ENTER AHTN 2022 CODE or KEYWORD(S):"
        />

        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 10,
          }}
        >
          SELECT TARIFF SCHEDULE(S):
        </Text>
        {data.map((data, i) => (
          <View style={{ flexDirection: "row", marginBottom: 10 }} key={i}>
            <TouchableOpacity
              style={[styles.checkbox, checked && styles.checked]}
              onPress={() => setChecked(!checked)}
            />
            <Text style={styles.label}>{data}</Text>
          </View>
        ))}
      </View>
      <Button
        mode="contained"
        style={{
          backgroundColor: "#161F3C", // button color
          borderRadius: 10, // round corners
          marginBottom: 30
        }}
      >
        SEARCH
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    margin: 20,
    height: "100%",
    justifyContent: "space-between"
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#EE9034",
  },
  label: {
    fontSize: 12,
  },
  input: {
    height: 50,
    backgroundColor: "#fff", // must have background for shadow
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Elevation for Android
    elevation: 5,
  },
});
