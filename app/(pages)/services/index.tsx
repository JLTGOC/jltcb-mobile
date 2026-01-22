import { ImageBackground } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
import ColumnServices from "./ColumnServices";
import RowServices from "./RowServices";

export default function Index() {
  return (
    <>
      <ImageBackground
        source={require("../../../src/assets/banners/small.png")}
        style={{
          aspectRatio: 3,
          paddingVertical: 30,
          paddingHorizontal: 40,
        }}
        contentFit="cover"
      >
        <Text style={{ color: "#EE9034", fontSize: 20, fontWeight: 500 }} allowFontScaling={false}>
          SERVICES
        </Text>
      </ImageBackground>
      <View style={{ paddingHorizontal: 25, marginTop: -30 }}>
        <Text style={styles.textTop} allowFontScaling={false}>SERVICES</Text>
        <ProgressBar
          progress={0.2}
          color="#EE9034" // progress fill
          style={styles.progressBar}
        />
        <Text style={{ color: "#EE9034", fontSize: 20, fontWeight: 500 }} allowFontScaling={false}>
          SERVICES
        </Text>
        <ColumnServices />

        <Text style={styles.textTop} allowFontScaling={false}>ADDITIONAL SERVICES</Text>
        <ProgressBar
          progress={0.4}
          color="#EE9034" // progress fill
          style={styles.progressBar}
        />
        <RowServices />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 3,
    borderRadius: 10,
    backgroundColor: "#9D9D9D",
    marginBottom: 10,
    marginTop: 2,
  },
  textTop: {
    marginTop: 5,
  },
});
