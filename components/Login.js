import React, { useState, useAuth, useMounted } from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen, { SocialButton } from "react-native-login-screen";

export default function Login() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <LoginScreen
        className="bg-white"
        logoImageSource={require("./assets/social/logo.png")}
        onLoginPress={() => {}}
        onSignupPress={() => {}}
        onEmailChange={(e) => {}}
        onPasswordChange={(e) => {}}
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
