import { useState } from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function NavigationBar() {
  const router = useRouter();
  const [leftMenuVisible, setLeftMenuVisible] = useState(false);
  const [rightMenuVisible, setRightMenuVisible] = useState(false);

  const toggleMenu = (position: string) => {
    if (position === "left") {
      setLeftMenuVisible((prev) => !prev);
      setRightMenuVisible(false);
    } else {
      setRightMenuVisible((prev) => !prev);
      setLeftMenuVisible(false);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          onPress={() => {
            toggleMenu("left");
          }}
        >
          <Ionicons name="newspaper" size={25} color="#898989" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/(pages)/home");
            setLeftMenuVisible(false);
            setRightMenuVisible(false);
          }}
        >
          <Ionicons name="home" size={25} color="#EE9034" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMenu("right")}>
          <Ionicons name="clipboard" size={25} color="#898989" />
        </TouchableOpacity>
      </View>
          
      {/* Curve Left */}
      {leftMenuVisible && (
        <View style={styles.borderContainer}>
          <LinearGradient
            colors={["#1d2b5b", "#d5893c", "#ffffff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.leftBorder}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                height: 200,
                borderTopRightRadius: 300,
                justifyContent: "center",
                gap: 10,
                paddingLeft: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/governance");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>Governance</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/about-us");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>About Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/contact-us");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>Contact Us</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/services");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>Services</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/ports-catered");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>Ports Catered</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
      {/* Curve Right */}
      {rightMenuVisible && (
        <View style={styles.borderContainer}>
          <LinearGradient
            colors={["#1d2b5b", "#d5893c", "#ffffff"]}
            start={{ x: 1, y: 0 }}
             end={{ x: 0, y: 1 }}
             style={styles.rightBorder}
          >
            <View style={{
                backgroundColor: "#ffffff",
                height: 200,
                borderTopLeftRadius: 300,
                justifyContent: "center",
                gap: 10,
                paddingRight: 20,
                alignItems: "flex-end"
              }}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/get-quote");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>Get Qoute</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/get-appointment");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>
                  Get Appointment
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(pages)/ahtn-checker");
                  setLeftMenuVisible(false);
                  setRightMenuVisible(false);
                }}
              >
                <Text style={styles.text} allowFontScaling={false}>AHTN Checker</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.text} allowFontScaling={false}>Calculator</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffffff",
    height: 60,
  },
    borderContainer: {
    position: "absolute",
    alignContent: "flex-end",
    bottom: 60, // adjust according to nav bar
    width: "100%",
    justifyContent: "space-between"
  },
  leftBorder: {
    height: 217,
    width: 240,
    borderTopRightRadius: 360,
    paddingTop: 16,
    paddingRight: 2,
    paddingBottom:6,
  },
  rightBorder: {
    height: 217,
    width: 240,
    borderTopLeftRadius: 360,
    paddingTop: 16,
    paddingLeft: 2,
    paddingBottom:6,
    alignSelf: "flex-end",
  },
 text:{
   fontSize: 20,
    color: "#6D6D6D",
 },
 textPosition:{
  bottom: 30,
    paddingLeft: 20,
    gap: 12,
 }
});