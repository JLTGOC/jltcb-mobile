import { Alert, Linking } from "react-native";

export const handleFileOpen = async (url?: string) => {
  if (!url) {
    return;
  }

  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    Alert.alert("Unable to open file", "Invalid file URL.");
    return;
  }

  await Linking.openURL(url);
};

