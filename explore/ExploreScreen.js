// == This explore screen contains components for displaying various songs like recent added, recommended, and artistes
// ! The thumbnail above needs to be linked to the profile
// ! The music player bar needs to be floated too
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import MusicPlayerBar from './MusicPlayerBar';
import thumbnail from '../assets/unavailable.png';
import RecentlyAddedSlider from './RecentlyAddedSlider';
import RandomTrackSlider from './RandomTrackSlider';
import TrendingArtistes from './TrendingArtistes';

const ExploreScreen = () => {
  return (
    <ScrollView style={styles.page}>
      {/* Profile Image and Text */}
      <View style={styles.profileContainer}>
        <Text style={styles.exploreText}>Explore</Text>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../assets/background-copy.png')} // Replace with actual profile image
            style={styles.profileImage}
          />
        </View>
      </View>

      {/* Recently added music slider */}
      <RecentlyAddedSlider />

      {/* Random Recommended Songs */}
      <RandomTrackSlider />

      {/* Recommended Artists */}
      <TrendingArtistes />


      {/* MusicPlayerBar at the bottom */}
      <MusicPlayerBar
        thumbnail={thumbnail}
        songName="Unavailable"
        artistName="Davido"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000', // Set black background
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 50,
  },
  profileImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 50, // Make it circular
    borderWidth: 1, // Add border
    borderColor: '#ff7959', // Set border color to white
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50, // Make it circular
  },
  exploreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff7959',
  },
});

export default ExploreScreen;
