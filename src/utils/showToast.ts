import { Alert, Platform, ToastAndroid } from "react-native";

export function showToast(message: string) {
<<<<<<< HEAD
	if (Platform.OS === "android") {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	} else {
		Alert.alert("", message);
	}
=======
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert("", message);
  }
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
}
