import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

export default function Home({ navigation }) {
  return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/home-page-banner.jpeg')}
          style={styles.imageBackground}
        >
          <Text
            style={styles.text}
          >
            Take your next trip with Travel Push
          </Text>
        </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize:35,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    alignSelf: 'center', // Align the text horizontally in the center
    marginTop: -400,
  },
});