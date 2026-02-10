import { MoveLeft } from "lucide-react-native"
import { View } from "react-native";
import { Text } from "react-native-paper";
import { ImageBackground } from "expo-image";

import { useNavigate } from "@/src/hooks/useNavigate";

type Props ={
    title: string,
    route: string
}

export default function Header({title, route} : Props){
      const {replace} = useNavigate()
    return(

    <ImageBackground
        source={require("../../../src/assets/banners/small.png")}
        contentFit="cover"
        style={{
          padding: 25,
          aspectRatio: 3,
          width: "100%",
          marginBottom: -25,
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <MoveLeft color={"#EE9034"} onPress={() => replace(route)}/>
          <Text
            style={{
              color: "#EE9034",
              fontSize: 20,
              fontWeight: 500,
              marginBottom: 4,
            }}
            allowFontScaling={false}
          >
            {title}
          </Text>
        </View>
      </ImageBackground>
    )
}