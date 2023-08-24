import { StyleSheet, Text, View } from 'react-native';

export default function Events({ navigation }) {
  return (
      <View style={styles.container}>
        <Text>Check out events</Text>
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