import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { useEffect, useRef } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function GovermentLogos() {
  const logos = [
    {
      logo: require("../../../src/assets/government/birLogo.png"),
      name: "BUREAU OF INTERNAL REVENUE",
      url: "https://www.bir.gov.ph/home",
    },
    {
      logo: require("../../../src/assets/government/bocLogo.png"),
      name: "BUREAU OF CUSTOMS",
      url: "https://customs.gov.ph/",
    },
    {
      logo: require("../../../src/assets/government/dofLogo.png"),
      name: "DEPARTMENT OF FINANCE",
      url: "https://www.dof.gov.ph/services/customs-modernization-and-tariff-act/",
    },
    {
      logo: require("../../../src/assets/government/dtiLogo.png"),
      name: "DEPARTMENT OF TRADE & INDUSTRY",
      url: "https://www.dti.gov.ph/",
    },
    {
      logo: require("../../../src/assets/government/pccbiLogo.png"),
      name: "PHILIPPINE CHAMBER OF CUSTOMS BROKERS INC",
      url: "https://pccbi.com.ph/ccbi-cogs/",
    },
    {
      logo: require("../../../src/assets/government/pezaLogo.png"),
      name: "PHILIPPINE ECONOMIC ZONE AUTHORITY",
      url: "https://www.peza.gov.ph/peza-online",
    },
    {
      logo: require("../../../src/assets/government/ppaLogo.png"),
      name: "PHILIPPINE PORTS AUTHORITY",
      url: "https://www.ppa.com.ph/",
    },
    {
      logo: require("../../../src/assets/government/prcLogo.png"),
      name: "PROFESSIONAL REGULATION COMISION ",
      url: "https://online.prc.gov.ph/",
    },
  ];

  const screenWidth = Dimensions.get("window").width

  const flatListRef = useRef<FlatList>(null);
  const loopedLogos = [...logos, ...logos]; // duplicate for seamless loop
  const itemWidth = 100 + 40; // logo width + spacing
  const totalWidth = logos.length * itemWidth;

  useEffect(() => {
    let offset = 0;

    const animate = () => {
      offset += .3; // pixels per frame
      flatListRef.current?.scrollToOffset({ offset, animated: false });

      if (offset >= totalWidth) offset = 0; // reset for seamless loop
      requestAnimationFrame(animate);
    };

    animate();
  }, [totalWidth]);

  return (
    <View style={{paddingVertical:5}}>
      <FlatList
        ref={flatListRef}
        data={loopedLogos}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openLink(item.url)}>
            <Image source={item.logo} style={{height: screenWidth * .08, width: screenWidth * .08}} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}


