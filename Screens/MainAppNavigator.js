import { Text, View, Image } from 'react-native';
import HomeScreen from './Home';
import Explore from './Explore';
import EventDetailsScreen from './EventDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={require('../assets/logo.jpg')}
        style={{ width: 40, height: 40, marginLeft: 95 }}
      />
      <Text style={{ marginLeft: 10 }}>Travel Push</Text>
    </View>
);

const MainAppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Explore" component={Explore} />
    <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
  </Stack.Navigator>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#9c0820', borderBottomWidth: 0, elevation: 0 },
        headerTitle: () => <CustomHeader />, headerShown: true,
        headerStyle: { backgroundColor: 'white' }, // Set header background color to white
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
            backgroundColor: 'white', // Set header background color to white
          },
          headerTintColor: '#f5f5f5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: (props) => (
            <Icon type='feather' name='home' color={'#ffffff'} />
          ),
        }}/>
      <Tab.Screen name="Explore" component={MainAppStack}
        options={{ 
          headerStyle: {
            backgroundColor: 'white', // Set header background color to white
          },
          headerTintColor: '#f5f5f5',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: (props) => (
            <Icon type='feather' name='compass' color={props.color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;
