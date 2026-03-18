import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface Props {
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
}
