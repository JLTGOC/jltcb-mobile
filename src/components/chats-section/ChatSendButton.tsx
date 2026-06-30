import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface Props {
<<<<<<< HEAD
	onPress: () => void;
	disabled?: boolean;
}

export default function ChatSendButton({ onPress, disabled = false }: Props) {
	return (
		<TouchableOpacity
			style={{ opacity: disabled ? 0.3 : undefined }}
			disabled={disabled}
			onPress={onPress}
		>
			<MaterialCommunityIcons
				name="send-variant-outline"
				size={32}
				color="#0000f5"
			/>
		</TouchableOpacity>
	);
=======
  onPress: () => void;
  disabled: boolean;
}

export default function ChatSendButton({ onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={{ opacity: disabled ? 0.3 : undefined }}
      disabled={disabled}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="send-variant-outline"
        size={32}
        color="#0000f5"
      />
    </TouchableOpacity>
  );
>>>>>>> debe4b59798b3afe392bfc7cd7307455f160aaf0
}
