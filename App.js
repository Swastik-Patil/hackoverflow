import React from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen, { SocialButton } from "react-native-login-screen";

export default function App() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View style={styles.container}>
      <LoginScreen
        className="bg-white"
        logoImageSource={require("./assets/social/logo.png")}
        onLoginPress={() => {}}
        onSignupPress={() => {}}
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
      >
        <SocialButton
          text="Continue with Google"
          imageSource={require("./assets/social/Google.png")}
          onPress={() => {}}
        />
      </LoginScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
