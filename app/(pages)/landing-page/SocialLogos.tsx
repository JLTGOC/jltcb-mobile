import { TouchableOpacity, Image, View } from "react-native";
import styles from "./styles";
import * as Linking from "expo-linking";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function SocialLogos() {
  return (
    <>
      <View style={styles.socialIconsContainer}>
        <TouchableOpacity
          onPress={() => openLink("https://www.facebook.com/jltcb.ph")}
        >
          <Image source={require("../../assets/social_logos/facebook.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink("https://www.instagram.com/jltcustomsbrokerage/</View>")
          }
        >
          <Image source={require("../../assets/social_logos/instagram.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink("https://www.youtube.com/@jilll.tolentinocustomsbrok4791")
          }
        >
          <Image source={require("../../assets/social_logos/youtube.png")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openLink("https://www.tiktok.com/@jltcustomsbrokerage")
          }
        >
          <Image source={require("../../assets/social_logos/tiktok.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://x.com/jltcb_ph")}>
          <Image source={require("../../assets/social_logos/twitter.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openLink("https://x.com/jltcb_ph")}>
          <Image source={require("../../assets/social_logos/linkedIn.png")} />
        </TouchableOpacity>
      </View>
    </>
  );
}
