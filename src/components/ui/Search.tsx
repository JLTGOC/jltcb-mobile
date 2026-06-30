import SearchSvg from "@material-symbols/svg-500/outlined/search.svg";
import {
<<<<<<< HEAD
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
=======
  type GestureResponderEvent,
  Pressable,
  type StyleProp,
  StyleSheet,
  TextInput,
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
  type TextInputProps,
  View,
  type ViewStyle,
} from "react-native";

import { THEMES } from "@/constants/themes";

type Props = {
  onSearch?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  searchButtonStyle?: StyleProp<ViewStyle>;
  searchButtonDisabled?: boolean;
  variant: "dark" | "light";
};

export default function Search({
  onSearch,
  containerStyle,
  style,
  searchButtonStyle,
  searchButtonDisabled,
  variant,
  ...props
}: TextInputProps & Props) {
  return (
    <View style={[styles.inputContainer, styles.boxShadow, containerStyle]}>
<<<<<<< HEAD
      <TextInput {...props} style={[styles.input, style]} />
=======
      <TextInput
        placeholderTextColor="black"
        {...props}
        style={[styles.input, style]}
      />
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      <Pressable
        onPress={onSearch}
        style={({ pressed }) => [
          styles.searchButton,
          {
            backgroundColor:
              variant === "dark"
                ? THEMES.darkAccentColor
                : THEMES.lightAccentColor,
          },
          searchButtonStyle,
          searchButtonDisabled && styles.disabledSearchButton,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        disabled={searchButtonDisabled}
      >
<<<<<<< HEAD
        <Ionicons name="search" size={16} color="white" />
=======
        <SearchSvg width={30} height={30} fill="white" />
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: "10%",
    borderRadius: 999,
    flexDirection: "row",
    marginBottom: 32,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
    color: "black",
  },
  boxShadow: {
    boxShadow: "0 4px 4px #BEBEBE",
  },
  searchButton: {
    paddingHorizontal: 25,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    justifyContent: "center",
  },
  disabledSearchButton: {
    opacity: 0.4,
  },
});
