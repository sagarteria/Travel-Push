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

  const saveEmailToAirtable = async (email, userName) => {
    console.log('outside try', email)
    try {
      // Check if the email exists in Airtable
      const airtableApiKey = "keySGT1mPfz7drfJo";
      const airtableBaseId = "appkrR6Qmx4oxqAx1";
      const checkEmailUrl = `https://api.airtable.com/v0/${airtableBaseId}/user-table?'user-email'=${email})`;
      // const checkEmailUrl = `https://api.airtable.com/v0/${airtableBaseId}/user-table?filterByFormula=AND('user-email'%3D"${email}")`;
      // const checkEmailUrl = `https://api.airtable.com/v0/${airtableBaseId}/user-table`;

      const response = await fetch(checkEmailUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      });

      const data = await response.json();
      console.log('airtable data', data);
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const emailExists = data.records.length > 0;
      console.log('emailExists----', emailExists, data.records.length);

      if (!emailExists) {
        // Save the email to Airtable
        const saveEmailUrl = `https://api.airtable.com/v0/${airtableBaseId}/user-table`;
        const requestBody = {
          fields: {
            'user-email': email,
            'user-full-name': userName || "",
          },
        };
        console.log('Inserting New Record:', requestBody);

        const saveResponse = await fetch(saveEmailUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log('Save Email Response:', saveResponse);
      } else if (userName) {
        console.log('inside else--')
        const recordId = data.records[0].id;
        const updateUrl = `https://api.airtable.com/v0/${airtableBaseId}/user-table/${recordId}`;
        const updateBody = {
          fields: {
            'user-full-name': userName,
          },
        };
        console.log('Updating Record:', updateBody);

        const updateResponse = await fetch(updateUrl, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateBody),
        });
        console.log('Update Response:', updateResponse);
        
      }
    } catch (error) {
      console.error("Error saving email to Airtable:", error);
    }
  };

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user--", user);
    if (!user) {
      if (response?.type === "success") {
        console.log("user---2", user, response.email);
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally", user.email, user.name);
      saveEmailToAirtable(user.email, user.name);
      navigation.navigate('MainApp', { userEmail: user.email });
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
      saveEmailToAirtable(user.email, user.name);
      navigation.navigate('MainApp', { userEmail: user.email });
    } catch (error) {
      // Add your own error handler here
    }
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
