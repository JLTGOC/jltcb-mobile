import { Image, View } from "react-native"
import styles from "../styles/header-style"

export default function Home(){
    return (
      <>
        <View style={styles.container}>
          <Image
            source={require("../assets/whiteLogo/fullLogo.png")}
            style={styles.logo}
          />
        </View>
      </>
    );
}