import { useState } from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/navigation-bar/navigationBar-styles";
import leftCurveStyles from "../styles/navigation-bar/left-curve-styles";
import { LinearGradient } from "react-native-svg";
import rightCurveStyles from "../styles/navigation-bar/right-curve-styles";
import RightCurveMenu from "../styles/navigation-bar/right-curve-menu";

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
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            toggleMenu("left");
          }}
        >
          <Ionicons name="newspaper" size={25} color="#898989" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/home");
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
        <View style={leftCurveStyles.container}>
          <View
            style={{
              backgroundColor: "red",
              height: 210,
              width: "60%",
              borderTopRightRadius: 200,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                router.push("/governance");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={leftCurveStyles.modalOption}>Governance</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/about_us");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={leftCurveStyles.modalOption}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/contact_us");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={leftCurveStyles.modalOption}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/services");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={leftCurveStyles.modalOption}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/ports_catered");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={leftCurveStyles.modalOption}>Ports Catered</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* Curve Right */}
      {rightMenuVisible && (
        <View style={rightCurveStyles.container}>
          <RightCurveMenu style={rightCurveStyles.curve} />
          <View style={rightCurveStyles.menuOptions}>
            <TouchableOpacity
              onPress={() => {
                router.push("/get_qoute");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={rightCurveStyles.modalOption}>Get Qoute</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/get_appointment");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={rightCurveStyles.modalOption}>Get Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("/ahtn_checker");
                setLeftMenuVisible(false);
                setRightMenuVisible(false);
              }}
            >
              <Text style={rightCurveStyles.modalOption}>AHTN Checker</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={rightCurveStyles.modalOption}>Calculator</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}
