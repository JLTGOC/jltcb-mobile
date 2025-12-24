import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingRight: 20,
    alignItems: "center", // centers the logo horizontally
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#161F3C", 
  
  },
  logo: {
    width: 200,
    height: 50,
  },
  profileContainer: {
    width: 30,
    height: 30,
    borderRadius: 20, // makes it a circle
    overflow: "hidden", // ensures image stays circular
    borderWidth: 1,
    borderColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  borderBottom: {
    height: 4,
     width: "100%",
  }
});