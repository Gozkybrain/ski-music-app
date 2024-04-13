// * The ArtisteView screen will house a music play mode with play next queue embedded
// ! This screen is up for amendment 
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ArtisteMusic = ({ route }) => {
  // Extract the 'music' object from the 'route.params' passed from navigation
  const { music } = route.params;

  return (
    <View style={styles.container}>
      {/* Display the album cover image */}
      <Image source={{ uri: music.image[2]['#text'] }} style={styles.thumbnail} />

      {/* Display the album title */}
      <Text style={styles.title}>{music.name}</Text>

      {/* Display the artist's name */}
      <Text style={styles.artist}>{music.artist.name}</Text>

      {/* Add more details or components as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000', // Set background color to black
  },
  thumbnail: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Set text color to white
    marginBottom: 10,
  },
  artist: {
    fontSize: 18,
    color: '#ccc', // Set text color to light gray
  },
});

export default ArtisteMusic;
