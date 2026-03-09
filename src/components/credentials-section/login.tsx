import { useAuth } from "@/src/hooks/useAuth";
import {
  loginFormSchema,
  LoginFormSchema,
} from "@/src/schemas/loginFormSchema";
import { ApiLoginResponse } from "@/src/types/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ImageBackground } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, HelperText } from "react-native-paper";

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
    onError: (err: AxiosError<ApiLoginResponse>) => {
      if (err.response?.data.code === 401) {
        setError("root", {
          type: "manual",
          message: err.response.data.message,
        });
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return (
    <ScrollView
      contentContainerStyle={styles.view}
      keyboardShouldPersistTaps="handled"
    >
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
                testID="email_input"
                accessibilityLabel="email_input"
                style={[
                  styles.input,
                  styles.boxShadow,
                  fieldState.invalid && {
                    borderColor: "#EF4444",
                  },
                ]}
                value={value}
                onChangeText={(text) => {
                  clearErrors("root");
                  onChange(text);
                }}
                onBlur={onBlur}
                placeholder="Email"
                inputMode="email"
                placeholderTextColor="black"
                allowFontScaling={false}
                autoCapitalize="none"
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
                testID="password_input"
                accessibilityLabel="password_input"
                style={[
                  styles.input,
                  styles.boxShadow,
                  fieldState.invalid && {
                    borderColor: "#EF4444",
                  },
                ]}
                value={value}
                onChangeText={(text) => {
                  clearErrors("root");
                  onChange(text);
                }}
                onBlur={onBlur}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor="black"
                allowFontScaling={false}
                autoCapitalize="none"
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
          style={[styles.button, styles.boxShadow]}
          labelStyle={styles.buttonLabel}
          onPress={onSubmit}
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
          theme={{ colors: { onSurfaceDisabled: "#c2c2c2" } }}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    paddingHorizontal: 36,
    paddingVertical: 20,
    aspectRatio: 2.25,
    gap: 12,
  },
  view: {
    flex: 1,
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
  input: {
    borderRadius: 6,
    padding: 10,
    color: "black",
    borderWidth: 1,
    borderColor: "transparent",
  },
  button: {
    backgroundColor: "#1D274E",
    borderRadius: 6,
    paddingVertical: 4,
  },
  buttonLabel: {
    fontSize: 16,
    textTransform: "uppercase",
  },
  boxShadow: {
    boxShadow: "0 4px 4px #BEBEBE",
  },
});
