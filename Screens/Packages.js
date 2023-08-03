import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Packages({ navigation }) {
  const handleButtonPress = (eventData) => {
    console.log('eventData', eventData)
    navigation.navigate('EventDetails');
  };
  
  return (
      <View style={styles.container}>
        <Text>Check travel packages</Text>
        <Button mode="contained" color="#ff6600" onPress={() => handleButtonPress()}>
          Book Now
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});