import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
