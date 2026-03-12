import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ContactFormData } from "../../../src/types/get-quote";

type ImageInputBoxProps = {
  setFormData: Dispatch<SetStateAction<ContactFormData>>;
  formData: ContactFormData;
};

export default function SubForm_ImageInput({
  setFormData,
  formData,
}: ImageInputBoxProps) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData((prev) => ({ ...prev, imageUri: result.assets[0].uri }));
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={pickImage}
    >
      <View style={styles.container}>
        {formData.imageUri ? (
          <Image
            source={{ uri: formData.imageUri }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <Ionicons name="image-outline" size={40} color="#888" />
        )}
      </View>
    </Pressable>
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
