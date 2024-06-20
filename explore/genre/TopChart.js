import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

// Load environment variables from dotenv
import { LASTFM_API_KEY } from '@env'; 

const TopChart = () => {
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State to store pop songs
  const [popSongs, setPopSongs] = useState([]);
  // Hook to navigate between screens
  const navigation = useNavigation();

  // Fetch pop songs when component mounts
  useEffect(() => {
    fetchPopSongs();
  }, []);

  // Function to fetch pop songs from Last.fm API
  const fetchPopSongs = async () => {
    try {
      const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=amapiano&api_key=${LASTFM_API_KEY}&format=json`);
      setPopSongs(response.data.tracks.track);
    } catch (error) {
      console.error('Error fetching pop songs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to ArtisteMusic screen with selected item
  const handleItemPress = (item) => {
    navigation.navigate('ArtisteMusic', { music: item });
  };

  // Render function for each pop song item
  const renderPopSongItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleItemPress(item)}>
      {item.image[2]['#text'] ? (
        <Image source={{ uri: item.image[2]['#text'] }} style={styles.thumbnail} />
      ) : (
        <View style={styles.placeholderThumbnail} />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.artist}>{item.artist.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Genre card at the bottom */}
      <View style={styles.genreCard}>
        <Image source={require('../../assets/chart.png')} style={styles.genreImage} />
        <View style={styles.bg}> 
          <Text style={styles.genreCardText}>Pop</Text>
        </View>
      </View>

      {/* Show loading indicator or list of pop songs */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={popSongs}
          renderItem={renderPopSongItem}
          keyExtractor={(item) => item.url}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  goBackButton: {
    paddingVertical: 15,
    paddingTop: 50,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  genreCard: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  genreImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bg: {
    backgroundColor: '#000',
    position: 'absolute',
    bottom: 0,
    padding: 10,
  },
  genreCardText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    color: '#aaa',
    fontSize: 16,
  },
  genreText: {
    color: '#ff7958',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default TopChart;
