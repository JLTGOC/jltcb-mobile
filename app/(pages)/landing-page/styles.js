import { StyleSheet } from "react-native";

export default StyleSheet.create({
  //LANDING PAGE

  //logo image
  logoContainer: {
    flex: 1,
    alignItems: "center",
    gap: 5,
  },
  outerGradient: {
    padding: 3,
    borderRadius: 50,
  },
  innerGradient: {
    width: 250,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    width: 350
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
    width: "100%",
    justifyContent:"space-between",
    height: "100%",
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject, // fill entire ImageBackground
    backgroundColor: "rgba(255, 255, 255, 0.64)",
  },

  //button
  buttonContainer: {
    alignItems: "center",
    justifyContent:"center",
    flexDirection: "column"
  }, 
  buttonText: {
    color: "#EE9034",
    fontSize: 16,
    fontWeight: "bold",
  },
  icons: {
    height: 50,
    width: 50,
  },

  //social icons style
  socialIconsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 80,
        marginTop: 20
    }
});
