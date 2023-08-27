import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { encode } from 'base-64';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import the useNavigation hook

const EventDetailsScreen = () => {
  const navigation = useNavigation(); // Get the navigation object using the hook
  const route = useRoute(); // Get the route object using the hook
  const { title, content, startDate, endDate, entryFee, location, description, imageUrl, upcomingEvent, userEmail } = route.params; // Extract the passed data
  const [showWebView, setShowWebView] = useState(false);
  const apiKey = "rzp_test_UtSSnR6A0S3aTi";
  const apiSecret = "g3BKh5S7TFmKHKTorThebEER";

  const apiData = { key_id: apiKey, key_secret: apiSecret }
  const razorpayBaseEndpoint = 'https://api.razorpay.com/v1/';
  const razorpayPaymentsEndpoint = 'payments';
  const razorpayOrdersEndpoint = 'orders';
  const razorpayCreatePaymentlinksEndpoint = 'payment_links';
  const razorpayFetchPaymentlinksEndpoint = 'payment_links';
  const currency = "INR"

  const [paymentData, setPaymentData] = useState([]); // State to hold payment data
  const [filteredAmount, setFilteredAmount] = useState(null);
  const [webviewUrl, setWebviewUrl] = useState(null);

  const fetchPaymentData = async () => {
    try {
      // const apiKey = 'YOUR_KEY_ID';
      // const apiSecret = 'YOUR_SECRET';

      const credentials = encode(`${apiKey}:${apiSecret}`);
      const response = await axios.get(`${razorpayBaseEndpoint}${razorpayPaymentsEndpoint}`, {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      const contactToFilter = '+919876543210'; // Change this to the desired contact number
      const filteredPayments = response.data.items.filter(item => item.contact === contactToFilter);
      console.log('response--2', response.data, 'filtered', filteredPayments[0].contact)
      // setPaymentData(response.data.items); // Assuming "items" is the array of payments in the API response
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const orderData = {
    amount: entryFee,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2"
    }
  }

  // generate orders data
  const generateOrderData = (amount, currency, receipt, notes) => {
    return {
      amount: parseInt(amount), // Convert amount to an integer
      currency,
      receipt,
      notes,
    };
  };

  // generate payment link data
  const generatePaymentLinkData = (entryFee, currency, title, userEmail) => {
    return {
      amount: parseInt(entryFee)*100,
      currency: currency,
      accept_partial: false,
      description: title,
      customer: {
        name: "Gaurav Kumar",
        email: userEmail,
        contact: "+919000090000"
      },
      notify: {
        sms: true,
        email: true
      },
      notes: {
        policy_name: "Music Festival"
      },
      options: {
        checkout: {
          name: "Travel Push",
        }
      },
      // callback_url: "https://example-callback-url.com/",
      // callback_method: "get"
    };
  };

  const createOrder = async () => {
    try {

      const credentials = encode(`${apiKey}:${apiSecret}`);
      const response = await axios.post(`${razorpayBaseEndpoint}${razorpayOrdersEndpoint}`,
      generateOrderData(entryFee, "INR", "receipt#1", {
        eventTitle: title,
        key2: "value2"
      }),
       {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });
      
      if(response.data.status == "created") {
        console.log('order created');
        // const orderData = generateOrderData(response.data.amount, "INR", response.data.receipt, {
        //   eventTitle: title,
        //   key2: "value2"
        // });
        createPaymentLink(generatePaymentLinkData(entryFee, currency, title, userEmail))
      } else {
        console.log('order not created');
      }
      // setPaymentData(response.data.items); // Assuming "items" is the array of payments in the API response
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const createPaymentLink = async (paymentLinkInfo) => {
    try {

      const credentials = encode(`${apiKey}:${apiSecret}`);
      const response = await axios.post(`${razorpayBaseEndpoint}${razorpayCreatePaymentlinksEndpoint}`,
      paymentLinkInfo,
       {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('response--create payment link--', response.data.short_url)
      // Assuming you have a "url" property in the response containing the URL to open
      setWebviewUrl(response.data.short_url);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const fetchPaymentLink = async () => {
    try {

      const credentials = encode(`${apiKey}:${apiSecret}`);
      const response = await axios.get(`${razorpayBaseEndpoint}${razorpayFetchPaymentlinksEndpoint}`,
       {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
      });

      const contactToFilter = '+919876543210'; // Change this to the desired contact number
      // const filteredPayments = response.data.items.filter(item => item.contact === contactToFilter);
      console.log('response--orders--', response.data)
      // setPaymentData(response.data.items); // Assuming "items" is the array of payments in the API response
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const handlePayNow = () => {
    // setShowWebView(true);
    createOrder();
    // createPaymentLink();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
    {webviewUrl ? (
        <WebView source={{ uri: webviewUrl }} style={styles.webView} />
      ) : (
        <>
      <Image
        source={imageUrl} // Replace with the actual image path
        style={styles.eventImage}
        resizeMode="stretch"
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
            <Text style={styles.detailValue}>Rs. {entryFee}</Text>
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
        {upcomingEvent && (
          <TouchableOpacity style={styles.payNowButton} onPress={handlePayNow}>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
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
    padding: 8,
  },
  title: {
    fontSize: 22,
    // fontWeight: 'bold',
    marginBottom: 10,
    color: '#800000', // Maroon color
  },
  eventImage: {
    width: '100%',
    height: 348,
    borderRadius: 8,
    marginBottom: 10,
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
    marginBottom: 4, // Reduced marginBottom for better spacing
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
