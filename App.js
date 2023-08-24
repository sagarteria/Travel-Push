import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Login'; // Import your LoginScreen component
import MainAppNavigator from './Screens/MainAppNavigator'; // Import your MainAppNavigator component

// android SHA-1 google: 902BA1A575DBD9795A313603FA8E585AFAD876D7
// android oauth client id google: 917856360906-roaddemnd0fn03vhn467uq12ei2bt01e.apps.googleusercontent.com
// web: 917856360906-e4sgjeav3iiftdjae4db0ctpueres5ec.apps.googleusercontent.com
// ios: 917856360906-e4e8omhl85kbq1mikc23o6l9uqu0n7n1.apps.googleusercontent.com
const Stack = createStackNavigator();

const App = () => {
  // Use the state to track the user's login status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(false);
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
