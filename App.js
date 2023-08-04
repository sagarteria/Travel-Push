import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Login'; // Import your LoginScreen component
import MainAppNavigator from './Screens/MainAppNavigator'; // Import your MainAppNavigator component

// Add these imports for Firebase and Crashlytics
import firebase from 'firebase/app';
import 'firebase/crashlytics';

const Stack = createStackNavigator();

const App = () => {
  // Use the state to track the user's login status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase config object here
      apiKey: "AIzaSyDApMNR2B2M_-og4Co74MJqHM_zQtOHRo8",
      authDomain: "travel-push.firebaseapp.com",
      projectId: "travel-push",
      storageBucket: "travel-push.appspot.com",
      messagingSenderId: "293593945104",
      appId: "1:293593945104:web:b8056db5f40baa802be695",
      measurementId: "G-Z3HD01KMDX"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Check user authentication status here and set loggedIn accordingly
    // For simplicity, I'll set loggedIn to true initially to show the main app screens
    setLoggedIn(false);
  }, []);

   // Add global error handling to report crashes
   useEffect(() => {
    const handleGlobalError = (error, isFatal) => {
      if (isFatal) {
        // Log the error to Crashlytics
        firebase.crashlytics().recordError(error);
      }
    };

    const previousHandler = ErrorUtils.getGlobalHandler();
    ErrorUtils.setGlobalHandler(handleGlobalError);

    return () => {
      ErrorUtils.setGlobalHandler(previousHandler);
    };
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {loggedIn ? (
          // If the user is logged in, show the MainAppNavigator
          <Stack.Screen name="MainApp" component={MainAppNavigator} />
        ) : (
          // If the user is not logged in, show the LoginScreen
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="MainApp" component={MainAppNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
