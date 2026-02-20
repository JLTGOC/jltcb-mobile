import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigate } from "@/src/hooks/useNavigate";
import { routes } from "@/src/constants/routes";
export default function NewsTabButtons() {
  const { navigate } = useNavigate();

  const [active, setActive] = useState(0);

  const tabs = ["LATEST", "CAREERS", ""];
  
  // const tabs = ["LATEST", "ARTICLES", "CAREERS", ""];

  const screenWidth = Dimensions.get("screen").width;

  return (
    <View style={styles.buttonContainer}>
      {tabs.map((t, i) => (
        <TouchableOpacity
          key={i}
          style={styles.button}
          onPress={() => {
            setActive(i);
            if (t === "CAREERS") {
              navigate(routes.CAREERS);
            }
          }}
        >
          <Text
            style={[
              styles.buttonText,
              { fontSize: screenWidth * 0.025 },
              active === i && styles.activeText,
            ]}
            allowFontScaling={false}
          >
            {t}
          </Text>
          {active === i && <View style={styles.underline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
