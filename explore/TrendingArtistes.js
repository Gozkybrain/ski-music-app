// * This screen shows top rated artistes streams in nigeria
// ! A component is required when an artist is clicked [ViewArtiste]
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const API_KEY = "your_api_key_here"; // Replace "your_api_key_here" with your actual API key

const TrendingArtistes = () => {
  const [topArtists, setTopArtists] = useState([]); // State to store top artists data
  const [scrollIndex, setScrollIndex] = useState(0); // State to track scroll position
  const flatListRef = useRef(null); // Ref for the FlatList component

  useEffect(() => {
    // Function to fetch top artists data from the API
    const fetchTopArtists = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=nigeria&api_key=${API_KEY}&format=json&limit=100`
        );
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse response data
        const data = await response.json();

        // Check if response data structure is as expected
        if (!data || !data.topartists || !data.topartists.artist) {
          throw new Error('Response data structure is incorrect');
        }

        // Extract relevant data from the response and format it
        const topArtistsData = data.topartists.artist.map(artist => ({
          id: artist.url,
          name: artist.name,
          image: getArtistImageUrl(artist.image), // Call a helper function to get the artist image URL
        }));

        // Set the top artists data in the state
        setTopArtists(topArtistsData);
      } catch (error) {
        // Handle errors
        console.error('Error fetching top artists:', error);
      }
    };

    // Call the fetchTopArtists function when the component mounts
    fetchTopArtists();
  }, []);

  // Helper function to get the appropriate artist image URL
  const getArtistImageUrl = (images) => {
    // Iterate through the images array to find the appropriate size
    for (let i = 0; i < images.length; i++) {
      if (images[i]['size'] === 'large') {
        return images[i]['#text'];
      }
    }
    // If no large size is found, return the first image URL
    return images[0]['#text'];
  };

  // Render item function for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  // Function to scroll forward in the FlatList
  const scrollForward = () => {
    if (flatListRef.current && scrollIndex < topArtists.length - 1) {
      flatListRef.current.scrollToIndex({ index: scrollIndex + 1, animated: true });
      setScrollIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.sliderTitle}>Trending Artists</Text>
      {/* FlatList to display top artists */}
      <FlatList
        ref={flatListRef}
        data={topArtists}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      {/* Button to scroll forward */}
      <TouchableOpacity style={styles.arrowContainer} onPress={scrollForward}>
        <Text style={styles.arrow}>➔</Text>
      </TouchableOpacity>

      {/* Horizontal line */}
      <View style={styles.horizontalLine} />
    </View>
  );
};

// Styles
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
    height: 150,
    borderRadius: 75,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    maxWidth: 150, // Adjust this value as needed
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

export default TrendingArtistes;
