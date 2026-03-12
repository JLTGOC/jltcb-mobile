import Ionicons from "@expo/vector-icons/Ionicons";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

type Props = {
  onSearch: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
  searchButtonStyle?: StyleProp<ViewStyle>;
  searchButtonDisabled?: boolean;
};

export default function Search({
  onSearch,
  containerStyle,
  style,
  searchButtonStyle,
  searchButtonDisabled,
  ...props
}: TextInputProps & Props) {
  return (
    <View style={[styles.inputContainer, styles.boxShadow, containerStyle]}>
      <TextInput {...props} style={[styles.input, style]} />
      <Pressable
        onPress={onSearch}
        style={({ pressed }) => [
          styles.searchButton,
          searchButtonStyle,
          searchButtonDisabled && styles.disabledSearchButton,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        disabled={searchButtonDisabled}
      >
        <Ionicons name="search" size={16} color="white" />
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
    paddingRight: 20,
    paddingLeft: 30,
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
    justifyContent: "center",
    backgroundColor: "#1C213B",
  },
  disabledSearchButton: {
    opacity: 0.4,
  },
});
