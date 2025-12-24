import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles";

export default function NewsTabButtons() {
  const [active, setActive] = useState(0);
  const [tab, setTab] = useState("")

  const tabs = ["LATEST", "ARTICES", "CAREERS", ""];

  return (
    <View style={styles.buttonContainer}>
      {tabs.map((t, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => {setActive(i), setTab(t)}}
        >
          <Text style={[styles.buttonText, active === i && styles.activeText]}>
            {t}
          </Text>
          {active === i && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

