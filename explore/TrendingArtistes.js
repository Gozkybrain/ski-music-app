// * This screen shows top rated artistes streams in nigeria
// ! A component is required when an artist is clicked [ViewArtiste]
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const API_KEY = '76a2c19dc353fda867366b17336fdab1';

const TrendingArtistes = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const flatListRef = useRef(null);
  const navigation = useNavigation(); // Initialize useNavigation

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=nigeria&api_key=${API_KEY}&format=json&limit=100`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (!data || !data.topartists || !data.topartists.artist) {
          throw new Error('Response data structure is incorrect');
        }

        const topArtistsData = data.topartists.artist.map(artist => ({
          id: artist.url,
          name: artist.name,
          image: getArtistImageUrl(artist.image),
        }));

        setTopArtists(topArtistsData);
      } catch (error) {
        console.error('Error fetching top artists:', error);
      }
    };

    fetchTopArtists();
  }, []);

  const getArtistImageUrl = (images) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i]['size'] === 'large') {
        return images[i]['#text'];
      }
    }
    return images[0]['#text'];
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    // Navigate to ViewArtiste screen with the selected artist's name
    navigation.navigate('ViewArtiste', { artistName: item.name });
  };

  const scrollForward = () => {
    if (flatListRef.current && scrollIndex < topArtists.length - 1) {
      flatListRef.current.scrollToIndex({ index: scrollIndex + 1, animated: true });
      setScrollIndex(prevIndex => prevIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sliderTitle}>Trending Artists</Text>
      <FlatList
        ref={flatListRef}
        data={topArtists}
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: 'relative',
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
    borderBottomColor: '#ff7959',
    marginVertical: 10,
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
    maxWidth: 150,
  },
  arrowContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: '100%',
    transform: [{ translateY: -25 }], // Adjust to vertically center the arrow
  },
  arrow: {
    fontSize: 24,
    color: '#ff7959',
  },
});

export default TrendingArtistes;
