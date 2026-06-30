import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";

type ClientHeaderMenuLinkProps = {
<<<<<<< HEAD
	style?: StyleProp<ViewStyle>;
=======
  style?: StyleProp<ViewStyle>;
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
};

export default function ClientHeaderMenuLink({
  style,
  ...props
}: ClientHeaderMenuLinkProps & PressableProps) {
<<<<<<< HEAD
	return (
		<Pressable
			style={({ pressed }) => [
				styles.menuLink,
				{ opacity: pressed ? 0.7 : 1 },
				style,
			]}
			{...props}
		/>
	);
=======
  return (
    <Pressable
      style={({ pressed }) => [
        styles.menuLink,
        { opacity: pressed ? 0.7 : 1 },
        style,
      ]}
      {...props}
    />
  );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
}

const styles = StyleSheet.create({
  menuLink: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
