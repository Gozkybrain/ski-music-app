// * This screen contains random songs from around the world, my personal best artistes lol
// ! It also requires a [ViewSong] component on click
// Import necessary components and hooks from React and React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// Define the API key
const API_KEY = "APIKEYHERE";

// Define the RandomTrackSlider component
const RandomTrackSlider = () => {
  const [recentlyAdded, setRecentlyAdded] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation(); // Initialize useNavigation

  useEffect(() => {
    // Function to fetch the latest albums for a given artist up to the specified limit
    const fetchLatestAlbum = async (artist, limit) => {
      try {
        // Fetch data from the Last.fm API for the top albums of the artist
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${API_KEY}&format=json&limit=${limit}`
        );

        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the response data
        const data = await response.json();

        // Check if the response data structure is as expected
        if (!data || !data.topalbums || !data.topalbums.album) {
          throw new Error('Response data structure is incorrect');
        }

        // Extract information about the latest albums and filter based on the limit
        const latestAlbums = data.topalbums.album.slice(0, limit).map(album => ({
          id: album.url,
          title: album.name,
          artist: album.artist.name,
          thumbnail: getThumbnailUrl(album.image),
        }));

        // Return the array of latest albums
        return latestAlbums;
      } catch (error) {
        console.error(`Error fetching latest albums for ${artist}:`, error);
        return [];
      }
    };

    // Function to fetch recently added albums
    const fetchRecentlyAdded = async () => {
      try {
        // Array of artist names whose latest albums will be fetched
        const artistNames = ['passenger', 'eminem', 'dean lewis', 'christina perri', 'ed sheeran', 'alec benjamin', 'demi lovato', 'sia', 'imagine dragons'];
        const limit = 10;
        const albumRequests = artistNames.map(artist => fetchLatestAlbum(artist, limit));
        const albumResponses = await Promise.all(albumRequests);
        let recentlyAddedAlbums = albumResponses.flat();
        recentlyAddedAlbums = shuffle(recentlyAddedAlbums);
        setRecentlyAdded(recentlyAddedAlbums);
      } catch (error) {
        console.error('Error fetching recently added albums:', error);
      }
    };

    // Call the function to fetch recently added albums
    fetchRecentlyAdded();
  }, []);

  // Helper function to extract the URL for the thumbnail image
  const getThumbnailUrl = (images) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i]['size'] === 'large') {
        return images[i]['#text'];
      }
    }
    return images[0]['#text'];
  };

  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
    </TouchableOpacity>
  );

  // Handle press event when an item is clicked
  const handlePress = (item) => {
    // Navigate to MusicView screen with the selected music item
    navigation.navigate('MusicView', { music: item });
  };

  // Handle scrolling to the next item
  const scrollForward = () => {
    if (flatListRef.current && scrollIndex < recentlyAdded.length - 1) {
      const nextIndex = scrollIndex + 1;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      setScrollIndex(nextIndex);
    }
  };

  // Helper function to shuffle an array
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // JSX structure of the component
  return (
    <View style={styles.container}>
      <Text style={styles.sliderTitle}>Recommended</Text>
      <FlatList
        ref={flatListRef}
        data={recentlyAdded}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.arrowContainer} onPress={scrollForward}>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>
      <View style={styles.horizontalLine} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: 'relative', // Ensure the arrow stays on top
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    marginLeft: 10,
  },
  item: {
    marginRight: 10,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 30,
    borderBottomColor: '#ff7959', // Horizontal line color
    marginVertical: 10, // Adjust margin as needed
  },
  thumbnail: {
    width: 150,
    height: 200,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    maxWidth: 150, // Adjust this value as needed
  },
  artist: {
    color: '#fff',
    fontSize: 14,
  },
  arrowContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -25 }], // Adjust to vertically center the arrow
  },
  arrow: {
    fontSize: 24,
    color: '#ff7959', // Change arrow color to black
  },
});

// Export the component as the default export
export default RandomTrackSlider;
