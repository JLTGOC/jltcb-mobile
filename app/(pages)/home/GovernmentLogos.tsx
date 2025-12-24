import * as Linking from "expo-linking";
import { useEffect, useRef } from "react";
import {
  Animated,
  FlatList,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./styles";

const openLink = (url: string) => {
  Linking.openURL(url);
};

export default function GovermentLogos() {
  const logos = [
    {
      logo: require("../../../assets/government/birLogo.png"),
      name: "BUREAU OF INTERNAL REVENUE",
      url: "https://www.bir.gov.ph/home",
    },
    {
      logo: require("../../../assets/government/bocLogo.png"),
      name: "BUREAU OF CUSTOMS",
      url: "https://customs.gov.ph/",
    },
    {
      logo: require("../../../assets/government/dofLogo.png"),
      name: "DEPARTMENT OF FINANCE",
      url: "https://www.dof.gov.ph/services/customs-modernization-and-tariff-act/",
    },
    {
      logo: require("../../../assets/government/dtiLogo.png"),
      name: "DEPARTMENT OF TRADE & INDUSTRY",
      url: "https://www.dti.gov.ph/",
    },
    {
      logo: require("../../../assets/government/pccbiLogo.png"),
      name: "PHILIPPINE CHAMBER OF CUSTOMS BROKERS INC",
      url: "https://pccbi.com.ph/ccbi-cogs/",
    },
    {
      logo: require("../../../assets/government/pezaLogo.png"),
      name: "PHILIPPINE ECONOMIC ZONE AUTHORITY",
      url: "https://www.peza.gov.ph/peza-online",
    },
    {
      logo: require("../../../assets/government/ppaLogo.png"),
      name: "PHILIPPINE PORTS AUTHORITY",
      url: "https://www.ppa.com.ph/",
    },
    {
      logo: require("../../../assets/government/prcLogo.png"),
      name: "PROFESSIONAL REGULATION COMISION ",
      url: "https://online.prc.gov.ph/",
    },
  ];
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
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
  }, []);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={loopedLogos}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={{ width: 40 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openLink(item.url)}>
            <Image source={item.logo} style={styles.logoSize} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
