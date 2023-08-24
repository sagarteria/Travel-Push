import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import the useNavigation hook

const EventDetailsScreen = () => {
  const navigation = useNavigation(); // Get the navigation object using the hook
  const route = useRoute(); // Get the route object using the hook
  const { title, content, startDate, endDate, entryFee, location, description, imageUrl } = route.params; // Extract the passed data
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
        source={imageUrl} // Replace with the actual image path
        style={styles.eventImage}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Start</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{startDate}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Ends</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{endDate}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Entry Fee</Text>
          <View style={styles.detailValueContainer}>
            <Text style={styles.detailValue}>{entryFee}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Location</Text>
          <View style={styles.detailValueContainer}>
            <Text numberOfLines={2} style={styles.locationValue}>
              {location}
            </Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailTitle}>Description</Text>
          <Text style={styles.descriptionValue}>
            {description}
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
