import {
  KeyboardAwareScrollView as BaseKeyboardAwareScrollView,
  type KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function KeyboardAwareScrollView({
  ...props
}: KeyboardAwareScrollViewProps) {
  const { bottom } = useSafeAreaInsets();

  return <BaseKeyboardAwareScrollView bottomOffset={bottom} {...props} />;
}
