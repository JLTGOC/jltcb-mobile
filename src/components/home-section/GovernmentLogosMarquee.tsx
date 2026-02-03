import { useIsFocused } from "@react-navigation/native";
import { Image } from "expo-image";
import * as Linking from "expo-linking";
import { type PropsWithChildren, useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from "react-native-reanimated";

// --- Data ---
const LOGOS = [
  {
    logo: require("../../../src/assets/government/birLogo.png"),
    url: "https://www.bir.gov.ph/home",
  },
  {
    logo: require("../../../src/assets/government/bocLogo.png"),
    url: "https://customs.gov.ph/",
  },
  {
    logo: require("../../../src/assets/government/dofLogo.png"),
    url: "https://www.dof.gov.ph/services/customs-modernization-and-tariff-act/",
  },
  {
    logo: require("../../../src/assets/government/dtiLogo.png"),
    url: "https://www.dti.gov.ph/",
  },
  {
    logo: require("../../../src/assets/government/pccbiLogo.png"),
    url: "https://pccbi.com.ph/ccbi-cogs/",
  },
  {
    logo: require("../../../src/assets/government/pezaLogo.png"),
    url: "https://www.peza.gov.ph/peza-online",
  },
  {
    logo: require("../../../src/assets/government/ppaLogo.png"),
    url: "https://www.ppa.com.ph/",
  },
  {
    logo: require("../../../src/assets/government/prcLogo.png"),
    url: "https://online.prc.gov.ph/",
  },
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const LOGO_SIZE = SCREEN_WIDTH * 0.08;
const GAP = 30;

// --- Helper Components ---

const MeasureElement = ({
  onLayout,
  children,
}: { onLayout: (width: number) => void } & PropsWithChildren) => (
  <Animated.ScrollView
    horizontal
    style={marqueeStyles.hidden}
    pointerEvents="box-none"
  >
    <View
      onLayout={(ev) => onLayout(ev.nativeEvent.layout.width)}
      style={marqueeStyles.row}
    >
      {children}
    </View>
  </Animated.ScrollView>
);

const TranslatedElement = ({
  index,
  children,
  offset,
  childrenWidth,
}: {
  index: number;
  offset: SharedValue<number>;
  childrenWidth: number;
} & PropsWithChildren) => {
  const animatedStyle = useAnimatedStyle(() => ({
    left: (index - 1) * childrenWidth,
    transform: [{ translateX: -offset.value }],
  }));
  return (
    <Animated.View style={[styles.animatedStyle, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const Marquee = ({
  duration = 10000,
  reverse = true,
  children,
}: { duration?: number; reverse?: boolean } & PropsWithChildren) => {
  const isFocused = useIsFocused();
  console.log(isFocused);
  const [parentWidth, setParentWidth] = useState(0);
  const [childrenWidth, setChildrenWidth] = useState(0);
  const offset = useSharedValue(0);
  const coeff = useSharedValue(reverse ? 1 : -1);

  useEffect(() => {
    coeff.value = reverse ? 1 : -1;
  }, [reverse]);

  useFrameCallback((i) => {
    if (!childrenWidth) return;
    const delta = (i.timeSincePreviousFrame ?? 1) * (childrenWidth / duration);
    offset.value = (offset.value + coeff.value * delta) % childrenWidth;
  }, isFocused);

  const count =
    childrenWidth > 0 ? Math.ceil(parentWidth / childrenWidth) + 2 : 0;

  return (
    <View
      style={styles.marqueeContainer}
      onLayout={(ev) => setParentWidth(ev.nativeEvent.layout.width)}
    >
      <View style={marqueeStyles.row}>
        <MeasureElement onLayout={setChildrenWidth}>{children}</MeasureElement>
        {childrenWidth > 0 &&
          parentWidth > 0 &&
          Array.from({ length: count }).map((_, i) => (
            <TranslatedElement
              key={i}
              index={i}
              offset={offset}
              childrenWidth={childrenWidth}
            >
              {children}
            </TranslatedElement>
          ))}
      </View>
    </View>
  );
};

// --- Main Component ---
export default function GovernmentLogosMarquee() {
  const openLink = (url: string) => Linking.openURL(url);

  return (
    <View style={styles.container}>
      <Marquee duration={20000}>
        <View style={marqueeStyles.row}>
          {LOGOS.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openLink(item.url)}
              style={{ marginRight: GAP }}
            >
              <Image
                source={item.logo}
                style={{ height: LOGO_SIZE, width: LOGO_SIZE }}
                contentFit="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </Marquee>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    backgroundColor: "#fff",
  },
  marqueeContainer: {
    width: "100%",
    minHeight: LOGO_SIZE,
    overflow: "hidden",
    justifyContent: "center",
  },
  animatedStyle: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
});

const marqueeStyles = StyleSheet.create({
  hidden: {
    opacity: 0,
    position: "absolute",
    zIndex: -1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
});
