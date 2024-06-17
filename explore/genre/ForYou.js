import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const API_KEY = '76a2c19dc353fda867366b17336fdab1'; // Replace with your Last.fm API key

const ForYou = () => {
  // State for loading indicator
  const [loading, setLoading] = useState(true);
  // State to store songs by Ayra Starr
  const [songs, setSongs] = useState([]);
  // Hook to navigate between screens
  const navigation = useNavigation();

  // Fetch songs by Ayra Starr when component mounts
  useEffect(() => {
    fetchSongs();
  }, []);

  // Function to fetch songs by Ayra Starr from Last.fm API
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=ayra+starr&api_key=${API_KEY}&format=json`);
      setSongs(response.data.toptracks.track);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to ArtisteMusic screen with selected item
  const handleItemPress = (item) => {
    navigation.navigate('ArtisteMusic', { music: item });
  };

  // Render function for each song item
  const renderSongItem = ({ item }) => (
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
        <Image source={require('../../assets/ayra.png')} style={styles.genreImage} />
        <View style={styles.bg}> 
          <Text style={styles.genreCardText}>Ayra Starr my baby</Text>
        </View>
      </View>

      {/* Show loading indicator or list of songs */}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <FlatList
          data={songs}
          renderItem={renderSongItem}
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

export default ForYou;
