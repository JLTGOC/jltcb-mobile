import { useState } from "react";
import { useRouter } from "expo-router";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/navigation-bar/navigationBar-styles";
import leftCurveStyles from "../styles/navigation-bar/left-curve-styles";
import LeftCurveMenu from "../styles/navigation-bar/left-curve-menu";
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

  const navigateTo = (route: string) => {
    setLeftMenuVisible(false);
    setRightMenuVisible(false);
    router.push(route);
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
        <TouchableOpacity onPress={() => navigateTo("/home")}>
          <Ionicons name="home" size={25} color="#EE9034" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleMenu("right")}>
          <Ionicons name="clipboard" size={25} color="#898989" />
        </TouchableOpacity>
      </View>

      {/* Curve Left */}
      {leftMenuVisible && (
        <View style={leftCurveStyles.container}>
          <LeftCurveMenu style={leftCurveStyles.curve} />
          <View style={leftCurveStyles.menuOptions}>
            <TouchableOpacity onPress={() => navigateTo("/governance")}>
              <Text style={leftCurveStyles.modalOption}>Governance</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("/about_us")}>
              <Text style={leftCurveStyles.modalOption}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("/contact_us")}>
              <Text style={leftCurveStyles.modalOption}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("/services")}>
              <Text style={leftCurveStyles.modalOption}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("/ports_catered")}>
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
            <TouchableOpacity onPress={() => navigateTo("/get_qoute")}>
              <Text style={rightCurveStyles.modalOption}>Get Qoute</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("/get_appointment")}>
              <Text style={rightCurveStyles.modalOption}>Get Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateTo("/ahtn_checker")}>
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
