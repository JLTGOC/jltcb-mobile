import { ImageBackground } from "expo-image";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { routes } from "@/src/constants/routes";
import { Button } from "react-native-paper";

import { useAuth } from "@/src/hooks/useAuth";
import { useNavigate } from "@/src/hooks/useNavigate";

export default function Login() {
  const { navigate } = useNavigate();
  const { loginContext } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await loginContext(formData);

      if (data.user.role === "Client") {
        navigate(routes.CLIENT_DB);
      } else if (data.user.role === "Account Specialist") {
        navigate(routes.AS_DB);
      } else if (data.user.role === "Marketing") {
        navigate(routes.MARKETING_DB);
      } else
        console.log(
          "login component:  need a page that says unathorized access and ligin button to navigate in the login component",
        );
    } catch (err) {
      setError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.view}>
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
        <TextInput
          style={[styles.input, styles.boxShadow]}
          value={formData.email}
          onChangeText={(text) => {
            setFormData((f) => ({ ...f, email: text }));
          }}
          placeholder="Email"
          inputMode="email"
          placeholderTextColor="black"
          allowFontScaling={false}
        />

        <TextInput
          style={[styles.input, styles.boxShadow]}
          value={formData.password}
          onChangeText={(text) => {
            setFormData((f) => ({ ...f, password: text }));
          }}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="black"
          allowFontScaling={false}
        />

        <Button
          mode="contained"
          style={[styles.button, styles.boxShadow]}
          labelStyle={styles.buttonLabel}
          onPress={handleLogin}
          loading={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
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
    gap: 35,
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
  input: {
    borderRadius: 6,
    padding: 10,
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
