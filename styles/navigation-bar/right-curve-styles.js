import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    alignSelf: "flex-end",
  },
  curve: {
    position: "absolute",
    bottom: 0,
    alignSelf: "end",
  },
  menuOptions: {
    position: "absolute",
      left: 50,
    bottom: 30,
    paddingLeft: 20,
    width: "80%",
    gap: 15,
    alignItems: "flex-end",
  },
  modalOption: {
    fontSize: 18,
    color: "#6D6D6D",
  },
});
