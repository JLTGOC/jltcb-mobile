import { Text, ImageBackground, View, Image } from "react-native";

export default function Governance() {
  const logos = [
    require("../../assets/government/birLogo.png"),
    require("../../assets/government/bocLogo.png"),
    require("../../assets/government/dofLogo.png"),
    require("../../assets/government/dtiLogo.png"),
    require("../../assets/government/pccbiLogo.png"),
    require("../../assets/government/pezaLogo.png"),
    require("../../assets/government/ppaLogo.jpg"),
    require("../../assets/government/prcLogo.png"),
  ];
  return (
    <>
      <ImageBackground
        source={require("../../assets/banners/small.png")}
        style={{
          aspectRatio: 3, 
          paddingVertical: 20,
          paddingHorizontal: 40,
        }}
        imageStyle={{ resizeMode: "cover" }}
      >
        <Text
          style={{
            color: "#EE9034",
            fontSize: 20,
            fontWeight: 500,
          }}
        >
          GOVERNANCE
        </Text>
      </ImageBackground>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {logos.map((logo, i) => (
          <Image key={i} source={logo} style={{ height: 25, width: 25 }} />
        ))}
      </View>
    </>
  );
}
