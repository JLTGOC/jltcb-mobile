import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  outerGradient: {
    padding: 3, // thickness of the gradient border
    borderRadius: 50,
  },
  innerGradient: {
    width: 200,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
