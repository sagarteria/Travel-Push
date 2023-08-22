import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const EventDetailsScreen = () => {
  const [showWebView, setShowWebView] = useState(false);

  const handlePayNow = () => {
    setShowWebView(true);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
    {showWebView ? (
        <WebView source={{ uri: 'https://paytm.me/1FJ-TUq' }} style={styles.webView} />
      ) : (
        <>
      <Text style={styles.title}>Retreat Details</Text>
      <Image
        source={require('../assets/Retreat-Osho-Anandamaya.jpg')} // Replace with the actual image path
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Start</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>Aug 12, 2023, 11:00 AM</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Ends</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>Aug 15, 2023, 12:00 PM</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Entry Fee</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>Rs. 10000</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Location</Text>
          <View style={styles.detailValueContainer}>
            <Text numberOfLines={2} style={styles.locationValue}>
              Jungle Lore Ganga Beach Retreat,
              Rishikesh
            </Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.descriptionValue}>
            Osho Anandamaya - Freedom Demystified Retreat. There is no greater ecstasy than to know who you are
          </Text>
        </View>
        <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
          <Text style={styles.payNowButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
      </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#800000', // Maroon color
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12, // Reduced marginBottom for better spacing
  },
  detailTitle: {
    fontSize: 16, // Reduced font size for field labels
    fontWeight: 'bold',
    color: '#800000', // Maroon color
  },
  detailValueContainer: {
    flex: 1, // Take available space
    alignItems: 'flex-end', // Right-align the value text
  },
  detailValue: {
    fontSize: 16, // Reduced font size for field values
    color: '#333', // Dark text color
  },
  locationValue: {
    fontSize: 14, // Further reduced font size for location value
    lineHeight: 20, // Adjusted line height for better spacing
    color: '#333', // Dark text color
  },
  descriptionValue: {
    fontSize: 16, // Reduced font size for description
    lineHeight: 24,
    color: '#555', // Medium text color
  },
  payNowButton: {
    backgroundColor: '#800000', // Maroon color
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  webView: {
    flex: 1,
    height: 300, // Adjust the height as needed
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden', // Hide any overflow content
  },
});

export default EventDetailsScreen;
