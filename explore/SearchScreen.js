import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MusicPlayerBar from './MusicPlayerBar';
import thumbnail from '../assets/unavailable.png';


const SearchScreen = () => {
  return (
    <View style={styles.page}>
      {/* Main content of ExploreScreen */}
      <View style={styles.mainContent}>
        <Text style={styles.text}>Search Screen Content..</Text>
      </View>
      
      {/* MusicPlayerBar at the bottom */}
      <MusicPlayerBar
  thumbnail={thumbnail}
  songName="Unavailable"
  artistName="Davido"
/>

    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#000', // Set black background
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Set black background
  },
  text: {
    color: '#fff', // Set white text color
  },
});

export default SearchScreen;
