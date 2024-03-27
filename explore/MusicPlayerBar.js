import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome icons
import thumbnail from '../assets/unavailable.png'; // Import the image

const MusicPlayerBar = ({ songName, artistName }) => {
  // Function to handle previous song
  const handlePrev = () => {
    // Add logic for previous song here
  };

  // Function to handle next song
  const handleNext = () => {
    // Add logic for next song here
  };

  return (
    // Container with a linear gradient background
    <LinearGradient
      colors={['#ff7959', '#3b2a1f']} // Define gradient colors
      start={[0, 0]} // Define start point (top-left)
      end={[1, 1]} // Define end point (bottom-right)
      style={styles.container}
    >
      {/* Music thumbnail */}
      <Image source={thumbnail} style={styles.thumbnail} />

      {/* Container for song information */}
      <View style={styles.infoContainer}>
        <Text style={styles.songName}>{songName}</Text>
        <Text style={styles.artistName}>{artistName}</Text>
      </View>

      {/* Controls for playing and skipping songs */}
      <View style={styles.controls}>
        {/* Play button */}
        <TouchableOpacity style={styles.playButton}>
          <FontAwesome5 name="play" size={16} color="#fff" />
        </TouchableOpacity>

        {/* Next button */}
        <TouchableOpacity style={styles.controlButton} onPress={handleNext}>
          <FontAwesome5 name="forward" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Stylesheet for the MusicPlayerBar component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    borderRadius: 7, // Add border radius for a rounded appearance
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10, // Add border radius for a rounded thumbnail
  },
  infoContainer: {
    flex: 1,
  },
  songName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Set text color to white
  },
  artistName: {
    fontSize: 14,
    color: '#fff', // Set text color to white
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: 'transparent', // Set button background color to transparent
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  playButton: {
    backgroundColor: 'transparent', // Set button background color to transparent
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default MusicPlayerBar;
