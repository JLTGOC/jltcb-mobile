import { Text, ImageBackground, View, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import ColumnServices from "../../components/services/ColumnServices";
import RowServices from "../../components/services/RowServices";

export default function Services() {
  return (
    <>
      <ImageBackground
        source={require("../../assets/banners/small.png")}
        style={{
          aspectRatio: 3,
          paddingVertical: 30,
          paddingHorizontal: 40,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text style={{ color: "#EE9034", fontSize: 20, fontWeight: 500 }}>
          SERVICES
        </Text>
      </ImageBackground>

      <View style={{ paddingHorizontal: 25, marginTop: -30 }}>
        <Text style={styles.textTop}>SERVICES</Text>
        <ProgressBar
          progress={0.2}
          color="#EE9034" // progress fill
          style={styles.progressBar}
        />
        <ColumnServices />

        <Text style={styles.textTop}>ADDITIONAL SERVICES</Text>
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
    marginBottom:10,
    marginTop:2
  },
  textTop:{
    marginTop:5
  },
  
});
