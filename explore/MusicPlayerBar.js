// * The Music Player Bar is not floating yet
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons
import thumbnail from '../assets/unavailable.png'; // Import the image

const MusicPlayerBar = ({ songName, artistName }) => {
  // state variables
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the music is favorite
  const [isPause, setIsPause] = useState(false); // State to track play/pause
  const [isShuffled, setIsShuffled] = useState(false); // State to track shuffle mode
  const [isRepeatOne, setIsRepeatOne] = useState(false); // State to track repeat mode
  const [progress, setProgress] = useState(0); // State to track playback progress
  
 // Toggle play/pause state
 const handlePlay = () => {
  setIsPause(!isPause);
};

// Handle next track action
const handleNext = () => {
  console.log('Next track');
};

// Handle previous track action
const handlePrev = () => {
  console.log('Previous track');
};

// Toggle favorite state
const handleToggleFavorite = () => {
  setIsFavorite(!isFavorite);
};

// Toggle shuffle state
const handleToggleShuffle = () => {
  setIsShuffled(!isShuffled);
};

// Toggle repeat state
const handleToggleRepeat = () => {
  setIsRepeatOne(!isRepeatOne);
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

            {/* Progress Bar */}
       <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>
      </View>

      {/* Controls for playing and skipping songs */}
      <View style={styles.controls}>
        {/* Toggle Pause and Play Button */}
        <TouchableOpacity style={styles.iconContainer} onPress={handlePlay}>
            <FontAwesome name={isPause ? 'play' : 'pause'} size={20} color={isPause ? '#FFF' : '#CCCCCC'} />
          </TouchableOpacity>
          {/* Next Song Button */}
          <TouchableOpacity style={styles.iconContainer} onPress={handleNext}>
            <FontAwesome name="step-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          {/* Favorite button */}
          <TouchableOpacity style={styles.iconContainer} onPress={handleToggleFavorite}>
            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={20} color={isFavorite ? '#FF495C' : '#CCCCCC'} />
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
    position: 'relative',
    bottom: 0, // Position at the top of the viewport
    left: 0,
    right: 0,
    borderRadius: 0, // Add border radius for a rounded appearance
    zIndex: 999, // Ensure the container stays above other elements
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
  progressBarContainer: {
    width: 200,
    height: 5,
    marginTop: 10,
    backgroundColor: '#fe7958',
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    padding: 10,
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
