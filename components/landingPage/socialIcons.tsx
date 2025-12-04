import { TouchableOpacity, Image, View } from "react-native";
import styles from "../../styles/landing-page/social-icons-styles";
import * as Linking from "expo-linking";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function socialMedia() {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => openLink("https://www.facebook.com/jltcb.ph")}
        >
          <Image source={require("../../assets/socialIcons/facebook.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink("https://www.instagram.com/jltcustomsbrokerage/</View>")
          }
        >
          <Image source={require("../../assets/socialIcons/instagram.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink("https://www.youtube.com/@jilll.tolentinocustomsbrok4791")
          }
        >
          <Image source={require("../../assets/socialIcons/youtube.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink("https://www.tiktok.com/@jltcustomsbrokerage")
          }
        >
          <Image source={require("../../assets/socialIcons/tiktok.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://x.com/jltcb_ph")}>
          <Image source={require("../../assets/socialIcons/twitter.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://x.com/jltcb_ph")}>
          <Image source={require("../../assets/socialIcons/linkedIn.png")} />
        </TouchableOpacity>
      </View>
    </>
  );
}
