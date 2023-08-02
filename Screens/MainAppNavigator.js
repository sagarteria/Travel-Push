import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './Login';
import HomeScreen from './Home';
import Explore from './Explore';
import Packages from './Packages';
import EventDetailsScreen from './EventDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Define Stack Navigator for Screen Explore and Screen EventDetails
const StackNavigator = createStackNavigator();
const StackNavigatorScreen = () => (
  <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
    <StackNavigator.Screen name="Explore" component={Explore} />
    <StackNavigator.Screen name="EventDetails" component={EventDetails} />
  </StackNavigator.Navigator>
);


const CustomHeader = () => (
  <>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/logo.jpg')}
        style={{ width: 40, height: 40, marginLeft: 45 }}
      />
      <Text style={{ marginLeft: 10 }}>Travel Push</Text>
    </View>
  </>
);

const MainAppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Explore" component={Explore} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
  </Stack.Navigator>
);

// bottom navigation bar
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#9c0820', borderBottomWidth: 0, elevation: 0 },
        headerTitle: () => <CustomHeader />, headerShown: false,
      }}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: 'lightgray',
        activeBackgroundColor: '#9c0820',
        inactiveBackgroundColor: '#d15c6f',
        style: {
          backgroundColor: '#072227',
          paddingBottom: 3
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}
        options={{ 
          headerStyle: {
          backgroundColor: '#072227',
          },
          headerTintColor: '#f5f5f5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: (props) => (
            <Icon type='feather' name='home' color={'#ffffff'} />
          ),
        }}>
          {(props) => <HomeScreen {...props} navigation={props.navigation} />}
        </Tab.Screen>
      <Tab.Screen name="Explore" component={MainAppStack}
        options={{ 
          headerStyle: {
          backgroundColor: '#072227',
          },
          headerTintColor: '#f5f5f5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: (props) => (
            <Icon type='feather' name='compass' color={props.color} />
          ),
        }}
      >
        {(props) => <MainAppStack {...props} navigation={props.navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Your Trips" component={Packages}
        options={{ 
          headerStyle: {
          backgroundColor: '#072227',
          },
          headerTintColor: '#f5f5f5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: (props) => (
            <Icon type='feather' name='package' color={props.color} />
          ),
        }}
      >
        {(props) => <Packages {...props} navigation={props.navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  )
}



const MainAppNavigator = () => (
  <Drawer.Navigator
    useLegacyImplementation
    initialRouteName="Home"
    screenOptions={{
      headerTitle: () => <CustomHeader />,
    }}
  >
    <Drawer.Screen name="Home" component={BottomTabNavigator} />
    <Drawer.Screen name="Women's Trip" component={BottomTabNavigator} />
    <Drawer.Screen name="Travel with Spirituality" component={BottomTabNavigator} />
    <Drawer.Screen name="Upcoming Trips" component={BottomTabNavigator} />
    <Drawer.Screen name="About Us" component={BottomTabNavigator} />
    <Drawer.Screen name="EventDetails" component={BottomTabNavigator} />
    {/* Add more screens as needed */}
  </Drawer.Navigator>
);

export default MainAppNavigator;
