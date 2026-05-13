import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { ImageBackground } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { HelperText } from "react-native-paper";

import Button from "@/src/components/ui/Button";
import KeyboardAwareScrollView from "@/src/components/ui/KeyboardAwareScrollView";
import TextInput from "@/src/components/ui/TextInput";

import { useAuth } from "@/src/hooks/useAuth";
import {
	type LoginFormSchema,
	loginFormSchema,
} from "@/src/schemas/loginFormSchema";

export default function Login() {
	const { loginContext } = useAuth();

	const {
		control,
		handleSubmit,
		clearErrors,
		setError,
		formState: { errors },
	} = useForm<LoginFormSchema>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const loginMutation = useMutation({
		mutationFn: loginContext,
		onError: (err) => {
			if (isAxiosError(err)) {
				if (err.response?.status === 401) {
					setError("root", {
						type: "manual",
						message: err.response.data.message,
					});
				} else if (!err.response) {
					setError("root", {
						type: "manual",
						message: "Network error. Please try again.",
					});
				}
			}
		},
	});

	const onSubmit = handleSubmit((data) => {
		loginMutation.mutate(data);
	});

	return (
		<KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
			<ImageBackground
				source={require("@/src/assets/banners/large.png")}
				style={styles.imageBackground}
				contentFit="cover"
			>
				<Text style={styles.title} allowFontScaling={false}>
					Login
				</Text>
				<Text style={styles.subtitle} allowFontScaling={false}>
					Welcome back you&apos;ve been missed!
				</Text>
			</ImageBackground>

			<View style={styles.main}>
				<View style={styles.field}>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, onBlur, value }, fieldState }) => (
							<TextInput
								invalid={fieldState.invalid}
								value={value}
								onChangeText={(text) => {
									clearErrors("root");
									onChange(text);
								}}
								onBlur={onBlur}
								placeholder="Username or email"
							/>
						)}
					/>
					<HelperText style={styles.fieldError} type="error">
						{errors.email?.message}
					</HelperText>
				</View>

				<View style={styles.field}>
					<Controller
						control={control}
						name="password"
						render={({ field: { onChange, onBlur, value }, fieldState }) => (
							<TextInput
								invalid={fieldState.invalid}
								value={value}
								onChangeText={(text) => {
									clearErrors("root");
									onChange(text);
								}}
								onBlur={onBlur}
								placeholder="Password"
								secureTextEntry
								onSubmitEditing={onSubmit}
							/>
						)}
					/>
					{errors.password ? (
						<>
							<HelperText style={styles.fieldError} type="error">
								{errors.password.message}
							</HelperText>
							{errors.root && (
								<HelperText style={styles.fieldError} type="error">
									{errors.root.message}
								</HelperText>
							)}
						</>
					) : (
						<HelperText style={styles.fieldError} type="error">
							{errors.root?.message}
						</HelperText>
					)}
				</View>

				<Button
					mode="contained"
					onPress={onSubmit}
					loading={loginMutation.isPending}
					disabled={loginMutation.isPending}
				>
					Sign In
				</Button>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	imageBackground: {
		paddingHorizontal: 36,
		paddingVertical: 20,
		aspectRatio: 2.25,
		gap: 12,
	},
	main: {
		paddingHorizontal: 30,
		paddingVertical: 10,
		gap: 14,
	},
	title: {
		color: "#EE9034",
		textTransform: "uppercase",
		fontWeight: "bold",
		fontSize: 33,
	},
	subtitle: {
		color: "white",
		fontSize: 15,
		borderLeftWidth: 3,
		borderLeftColor: "#EE9034",
		paddingLeft: 10,
	},
	field: {},
	fieldError: {
		minHeight: 28,
	},
});
