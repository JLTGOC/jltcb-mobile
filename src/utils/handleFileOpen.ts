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
<<<<<<< HEAD

=======
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
