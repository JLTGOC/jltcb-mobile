import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider, Text } from "react-native-paper";
import {
  Truck,
  Package2,
  FileSpreadsheet,
  NotepadTextDashed,
} from "lucide-react-native";
import { ImageBackground } from "expo-image";

export default function Buttons() {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 600, fontSize: 20 }}>
        SHIPMENT
      </Text>
      <Divider />
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <ImageBackground
            source={require("./folder.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Truck color="black" size={30} />
            <Text style={{ fontWeight: 400 }}>ONGOING</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity>
          <ImageBackground
            source={require("./folder.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <Package2 size={30} color="black" />
            <Text style={{ fontWeight: 400 }}>COMPLETED</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <Text style={{fontWeight:600}} variant="titleLarge">QUOTATION</Text>
      <Divider />
      <View style={{ flexDirection: "row" }}>
        <Divider />
        <TouchableOpacity>
          <ImageBackground
            source={require("./folder.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <NotepadTextDashed size={30} color="black" />
            <Text style={{ fontWeight: 400 }}>REQUESTED</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity>
          <ImageBackground
            source={require("./folder.png")}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}
          >
            <FileSpreadsheet size={30} color="black" />
            <Text style={{ fontWeight: 400 }}>REPSONDED</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 15, // space between icons
    margin: 10
  },
  imageBackground: {
    width: 120,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "contain",
  },
});
