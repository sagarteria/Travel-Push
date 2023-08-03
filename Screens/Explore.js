import { StyleSheet, Text, View } from 'react-native';
import ScrollableCardList from '../components/ScrollableCardList';

export default function Explore({ navigation }) {
  return (
      <View style={styles.container}>
        <View style={styles.cardListContainer}>
          <ScrollableCardList navigation={navigation} />
        </View>
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
  cardListContainer: {
    flex: 1, // Allow the card list to take the full available space
    alignSelf: 'stretch',
  },
});