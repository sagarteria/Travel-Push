import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LoginPage = ({navigation}) => {
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
        <TouchableOpacity style={styles.googleLoginButton} onPress={handleGoogleLogin}>
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
