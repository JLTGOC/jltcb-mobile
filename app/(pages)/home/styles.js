import VideoConatainer from "@/app/(pages)/home/VideoContainer";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //home style
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
  },
  //SegmentedButton
  buttonContainer: {
    flexDirection: "row",
    borderBottomWidth: 3,
    borderColor: "#9D9D9D",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
    paddingTop: 10,
  },
  buttonText: {
    fontSize: 10,
    color: "#555",
  },
  activeText: {
    color: "#000",
    fontWeight: "600",
  },
  underline: {
    height: 3,
    width: "100%",
    backgroundColor: "#EE9034",
    position: "absolute",
    bottom: -3,
  },
  //CardTempate
  cardContainer: {
    marginTop: 5,
    height: 90,
    justifyContent: "center",
    elevation: 0,
    borderWidth: 0,
    backgroundColor: "#ffffff",
  },
  title_1: {
    backgroundColor: "gray",
    fontSize: 9,
    paddingHorizontal: 5,
    color: "white",
  },
  title_2: { fontSize: 9, fontWeight: 700 },
  description: { fontSize: 8 },
  //Logos
  logosContainer: {
    justifyContent: "space-between",
  },
  logoSize: { height: 30, width: 30 },
  //Video
  videoContainer:{
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  videoSize:{
    width: 70,
    marginRight: 5,
    height: 130,
    borderRadius: 5,
    overflow: "hidden",
  }
});
