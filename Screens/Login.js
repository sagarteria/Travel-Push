import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

const LoginPage = ({navigation}) => {

  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "917856360906-e4sgjeav3iiftdjae4db0ctpueres5ec.apps.googleusercontent.com",
    androidClientId: "917856360906-roaddemnd0fn03vhn467uq12ei2bt01e.apps.googleusercontent.com",
    iosClientId: "917856360906-e4e8omhl85kbq1mikc23o6l9uqu0n7n1.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user--", user);
    if (!user) {
      if (response?.type === "success") {
        console.log("user--", user, response);
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
      navigation.navigate('MainApp');
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
      navigation.navigate('MainApp');
    } catch (error) {
      // Add your own error handler here
    }
  };

  const handleGoogleLogin = () => {
    navigation.navigate('MainApp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo-24-August-2023-v2.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Travel Push</Text>
      </View>
      <View style={styles.loginButtonContainer}>
        <TouchableOpacity style={styles.googleLoginButton} onPress={() => {
            promptAsync();
          }}>
          <Image
            source={require('../assets/google-login-icon.png')}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleLoginText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  loginButtonContainer: {
    marginTop: 40,
  },
  googleLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41', // Google's red color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleLoginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginPage;
