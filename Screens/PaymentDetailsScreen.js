import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PaymentDetailsScreen = () => {
  return (
    <View style={styles.detailsContainer}>
      <Text style={styles.infoText}>
        We accept payments through UPI. The details are mentioned below.
      </Text>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>Name</Text>
        <Text style={styles.detailValue}>Apurva Kaushik</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailTitle}>UPI Details</Text>
        <Text style={styles.detailValue}>8588037307@paytm</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <Image
          source={require('../assets/Payment-QR-Code.jpg')} // Provide the correct path to your QR code image
          style={styles.qrCode}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 20,
    elevation: 4,
    margin: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  qrCode: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default PaymentDetailsScreen;
