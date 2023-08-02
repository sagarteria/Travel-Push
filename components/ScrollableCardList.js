import React, { useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const ScrollableCardList = ({navigation}) => {

  // const navigation = useNavigation(); // Get the navigation object using the hook
  const scaleValue = useRef(new Animated.Value(1)).current; // Initialize the scale animation value

  const handleButtonPress = (eventData) => {
    console.log('eventData', eventData)
    navigation.navigate('EventDetails');
    // Define the animation sequence
    // Animated.sequence([
    //   Animated.timing(scaleValue, {
    //     toValue: 1.2, // Increase the scale to 1.2
    //     duration: 100,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(scaleValue, {
    //     toValue: 1, // Return the scale to 1 (original size)
    //     duration: 100,
    //     useNativeDriver: true,
    //   }),
    // ]).start(() => {
    //   console.log('start clicked')
    //   // Navigate to the 'EventDetails' screen and pass the event details as params
    //   navigation.navigate('Packages');
    // });
  };

  // Dummy data for demonstration purposes. Replace this with your actual data.
  const cardData = [
    {
      title: 'Osho Anandamayaa',
      content: 'Freedom Demystified Retreat',
      date: '12-15 August, 2023',
      imageUrl: require('../assets/Retreat-Osho-Anandamaya.jpg'),
      url: 'eventDetails',
    },
    {
      title: 'World Music Festival',
      content: 'World Music Festival',
      date: '15-16 September, 2023',
      imageUrl: require('../assets/Festival-World-Music-Festival.jpg'),
      url: 'eventDetails',
    },
    // Add more card objects as needed
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cardData.map((card, index) => (
        <Card key={index} style={styles.card}>
          <Card.Cover source={card.imageUrl} style={styles.cardImage} />
          <Card.Content>
            <Paragraph>
              <Text style={styles.cardContentText}>{card.content}</Text>
            </Paragraph>
            <Paragraph>
              <Text>{card.date}</Text>
            </Paragraph>
          </Card.Content>
          
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
              {/* Add the "Book Now" button here */}
              <Card.Actions style={styles.buttonContainer}>
                <Button mode="contained" color="#800000" labelStyle={styles.buttonLabel} onPress={() => handleButtonPress()} >
                  Book Now
                </Button>
              </Card.Actions>
          </Animated.View>
          </TouchableWithoutFeedback>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 6,
  },
  card: {
    // flex: 1,
    marginVertical: 8,
    width: '90%', // Adjust the width of the card here
    alignSelf: 'center', // Center the card horizontally
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 2,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardContentText: {
    fontWeight: 'bold',
  },
});

export default ScrollableCardList;
