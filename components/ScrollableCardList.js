import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const ScrollableCardList = ({navigation}) => {
  const scaleValue = useRef(new Animated.Value(1)).current; // Initialize the scale animation value

  const handleButtonPress = (eventData) => {
    navigation.navigate('EventDetails', {
      title: eventData.title,
      content: eventData.content,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      entryFee: eventData.entryFee,
      location: eventData.location,
      description: eventData.description,
      imageUrl: eventData.imageUrl,
      upcomingEvent: eventData.upcomingEvent,
    });
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
      startDate: 'Aug 12, 2023, 11:00 AM',
      endDate: 'Aug 15, 2023, 12:00 PM',
      entryFee: 'Rs. 10000',
      location: "Jungle Lore Ganga Beach Retreat, Rishikesh",
      imageUrl: require('../assets/Retreat-Osho-Anandamaya.jpg'),
      description: "Osho Anandamaya - Freedom Demystified Retreat. There is no greater ecstasy than to know who you are",
      url: 'eventDetails',
      upcomingEvent: false
    },
    {
      title: 'World Music Festival',
      content: 'World Music Festival',
      date: '15-16 September, 2023',
      startDate: 'Sept 15, 2023, 4:00 PM',
      endDate: 'Sept 16, 2023, 11:00 PM',
      entryFee: 'Rs. 6000',
      location: "Gipsy Cafe, Rishikesh",
      imageUrl: require('../assets/Festival-World-Music-Festival.jpg'),
      description: "One of the biggest music festival about to happen in Rishikesh",
      url: 'eventDetails',
      upcomingEvent: true
    },
    // Add more card objects as needed
  ];

  // Sort the cardData array to display upcomingEvent: true cards on top
  const sortedCardData = [...cardData].sort((a, b) => {
    if (a.upcomingEvent && !b.upcomingEvent) {
      return -1; // a comes before b
    }
    if (!a.upcomingEvent && b.upcomingEvent) {
      return 1; // b comes before a
    }
    return 0; // no change in order
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Divider with Styled "Upcoming Events" Text */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <View style={styles.dividerTextContainer}>
          <Text style={styles.dividerText}>Upcoming Events</Text>
        </View>
        <View style={styles.divider} />
      </View>
      {sortedCardData.map((card, index) => (
         card.upcomingEvent && (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => handleButtonPress(card)} // Call the function on card press
          >
        <Card key={index} style={styles.card}>
          <View style={{ flex: 1, alignItems: "center"}}>
            <Card.Cover source={card.imageUrl} style={[styles.cardImage, card.upcomingEvent ? styles.upcomingCard : styles.pastCard]} 
                resizeMode="stretch" // Use resizeMode to adjust how the image fits the container
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph>
                <Text style={styles.cardContentText}>{card.content}</Text>
              </Paragraph>
              <Paragraph>
                <Text>{card.date}</Text>
              </Paragraph>
            </Card.Content>
          </View>
          
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]} >
              {/* Conditionally render the "Book Now" button */}
            {card.upcomingEvent && (
              <Card.Actions style={styles.buttonContainer}>
                <Button mode="contained" color="#800000" labelStyle={styles.buttonLabel} onPress={() => handleButtonPress(card)} >
                  Book Now
                </Button>
              </Card.Actions>
            )}
          </Animated.View>
          </TouchableWithoutFeedback>
        </Card>
        </TouchableWithoutFeedback>
        )
      ))}

      {/* Divider with Styled "Past Events" Text */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <View style={styles.dividerTextContainer}>
          <Text style={styles.dividerText}>Past Events</Text>
        </View>
        <View style={styles.divider} />
      </View>

    {sortedCardData.map((card, index) => (
      // Render cards for past events using the same mapping logic
      // Use the pastCard style for styling
      !card.upcomingEvent && (
        <TouchableWithoutFeedback
            key={index}
            onPress={() => handleButtonPress(card)} // Call the function on card press
          >
        <Card key={index} style={[styles.card, styles.pastCard]}>
          <View style={{ flex: 1, alignItems: "center"}}>
            <Card.Cover source={card.imageUrl} style={styles.cardImage}
              resizeMode="stretch" // Use resizeMode to adjust how the image fits the container
            />
            <Card.Content style={styles.cardContent}>
              <Paragraph>
                <Text style={styles.cardContentText}>{card.content}</Text>
              </Paragraph>
              <Paragraph>
                <Text>{card.date}</Text>
              </Paragraph>
            </Card.Content>
          </View>
        </Card>
        </TouchableWithoutFeedback>
      )
    ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
  },
  card: {
    // flex: 1,
    marginVertical: 8,
    width: '90%', // Adjust the width of the card here
    alignSelf: 'center', // Center the card horizontally
  },
  cardContent: {
    flex: 1,
    alignItems: "center",
  },
  upcomingCard: {
    // Style for upcoming events
  },
  pastCard: {
    // Style for past events
  },
  cardImage: {
    width: '100%',
    height: 320,
    // resizeMode: 'cover',
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
    fontSize: 18,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ECECEC', // Lighter background color
    borderBottomWidth: 1,
    borderBottomColor: '#CCC', // Lighter border color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeading: {
    fontSize: 22, // Larger font size
    fontWeight: 'bold',
    color: '#444', // Slightly darker text color
    textShadowColor: '#FFF', // Add a subtle text shadow
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 2,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#CCC',
  },
  dividerTextContainer: {
    paddingHorizontal: 10,
  },
  dividerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 2,
  },
});

export default ScrollableCardList;
