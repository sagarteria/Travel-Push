import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { encode } from 'base-64';
import axios from 'axios';
import { WebView } from 'react-native-webview';

const BookingsScreen = () => {

  const apiKey = "rzp_test_UtSSnR6A0S3aTi";
  const apiSecret = "g3BKh5S7TFmKHKTorThebEER";

  const apiData = { key_id: apiKey, key_secret: apiSecret }
  const razorpayBaseEndpoint = 'https://api.razorpay.com/v1/';
  const razorpayPaymentsEndpoint = 'payments';
  const razorpayOrdersEndpoint = 'orders';
  const razorpayCreatePaymentlinksEndpoint = 'payment_links';
  const razorpayFetchPaymentlinksEndpoint = 'payment_links';

  const paymentlinkData = {
    amount: 500,
    currency: "INR",
    accept_partial: false,
    // first_min_partial_amount: 100,
    description: "World Music Festival Ticket",
    customer: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "+919000090000"
    },
    notify: {
      sms: true,
      email: true
    },
    reminder_enable: true,
    notes: {
      policy_name: "Jeevan Bima"
    },
    options: {
      checkout: {
        name: "Travel Push"
      }
    },
    callback_url: "https://example-callback-url.com/",
    callback_method: "get"
    
  }

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
    amount: 50000,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2"
    }
  }

  const createOrder = async () => {
    try {
      // const apiKey = 'YOUR_KEY_ID';
      // const apiSecret = 'YOUR_SECRET';

      const credentials = encode(`${apiKey}:${apiSecret}`);
      const response = await axios.post(`${razorpayBaseEndpoint}${razorpayOrdersEndpoint}`,
      orderData,
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

  const createPaymentLink = async () => {
    try {

      const credentials = encode(`${apiKey}:${apiSecret}`);
      const response = await axios.post(`${razorpayBaseEndpoint}${razorpayCreatePaymentlinksEndpoint}`,
      paymentlinkData,
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
  useEffect(() => {
    // fetchPaymentData(); // Call the API when the component mounts
    // createOrder(); // Call the API when the component mounts
    createPaymentLink();
    // fetchPaymentLink();
  }, []); // The empty dependency array ensures this effect runs only once

  const renderBookingRow = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.title}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.startDate}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.endDate}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{item.entryFee}</Text>
      </View>
    </View>
  );

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

  return (
    <>
     {webviewUrl ? (
      <WebView source={{ uri: webviewUrl }} />
    ) : (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCellText}>Event Name</Text>
        <Text style={styles.headerCellText}>Start Date</Text>
        <Text style={styles.headerCellText}>End Date</Text>
        <Text style={styles.headerCellText}>Booking Amount</Text>
      </View>
      <FlatList
        data={cardData}
        renderItem={renderBookingRow}
        keyExtractor={(item) => item.title}
      />
    </View>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#9c0820',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerCellText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 10,
  },
});

export default BookingsScreen;
