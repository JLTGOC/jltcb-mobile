import { useState, Dispatch, SetStateAction } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type ContactFormData = {
  fullName?: string;
  email?: string;
  contactNumber?: string;
  message?: string;
  imageUri?: string;
};

type ImageInputBoxProps = {
  setFormData: Dispatch<SetStateAction<ContactFormData>>;
};
export default function ImageInputBox({ setFormData }: ImageInputBoxProps) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFormData((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <TouchableOpacity onPress={pickImage}>
          <Ionicons name="image-outline" size={40} color="#888" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",

    // Android shadow
    elevation: 4,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  iconButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    backgroundColor: "white",
    borderRadius: 50,
    elevation: 5,
  },
});
