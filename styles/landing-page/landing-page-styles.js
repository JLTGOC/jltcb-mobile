import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1, // Take full screen height
    justifyContent: "center", // Center vertically
    alignItems: "center",
    gap: 5,
  },
  outerGradient: {
    padding: 3, // thickness of the gradient border
    borderRadius: 50,
  },
  innerGradient: {
    width: 250,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  buttonText: {
    color: "#EE9034",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoImage: {
    width: 500,
    height: 250,
  },
  wordImage: {
    width: 250,
    height: 50,
    margin: 0,
    padding: 0,
  },
  image: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject, // fill entire ImageBackground
    backgroundColor: "rgba(255, 255, 255, 0.64)", // 0.5 is 50% transparent
  },
  buttonContainer: {
    marginVertical: 20,
    gap: 5,
  },
  icons: {
    height: 50,
    width: 50,
  },
});
