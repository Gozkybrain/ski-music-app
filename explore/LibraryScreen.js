import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Load environment variables from dotenv
import { LASTFM_API_KEY } from '@env'; 

const categories = [
  // * handle categories by title and value
  { title: 'All', value: 'all' },
  { title: 'Artists', value: 'artist' },
  { title: 'Albums', value: 'album' },
  { title: 'Songs', value: 'track' },
  { title: 'Playlists', value: 'playlist' }
];

const LibraryScreen = () => {
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState('all');
  // State to store fetched data
  const [data, setData] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(false);
  // Navigation hook to navigate between screens
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data whenever the selected category changes
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    // Start loading
    setLoading(true);
    // Initialize the URL for the API request
    let url = '';

    // Determine the API endpoint based on the selected category
    switch (selectedCategory) {
      case 'artist':
        url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${LASTFM_API_KEY}&format=json&limit=6`;
        break;
      case 'album':
        url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=pop&api_key=${LASTFM_API_KEY}&format=json&limit=5`;
        break;
      case 'track':
        url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json&limit=8`;
        break;
      case 'playlist':
        // Placeholder for playlist data
        setData([]);
        setLoading(false);
        return;
      case 'all':
      default:
        url = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${LASTFM_API_KEY}&format=json&limit=10`;
        break;
    }

    try {
      const response = await fetch(url);
      const result = await response.json();
      let fetchedData = [];

      // Parse the API response based on the selected category
      switch (selectedCategory) {
        case 'artist':
          if (result.artists) {
            fetchedData = result.artists.artist.map(item => ({
              id: item.mbid || item.name,
              title: item.name,
              thumbnail: item.image[2]['#text'] || null,
              type: 'artist'
            }));
          }
          break;
        case 'album':
          if (result.albums) {
            fetchedData = result.albums.album.map(item => ({
              id: item.mbid || item.name,
              title: item.name,
              artist: item.artist.name,
              thumbnail: item.image[2] ? item.image[2]['#text'] : null,
              type: 'album'
            }));
          }
          break;
        case 'track':
        case 'all':
          if (result.tracks) {
            fetchedData = result.tracks.track.map(item => ({
              id: item.mbid || item.name,
              title: item.name,
              artist: item.artist.name,
              thumbnail: item.image[2] ? item.image[2]['#text'] : null,
              type: 'track'
            }));
          }
          break;
        case 'playlist':
          // Placeholder for playlist data
          fetchedData = [];
          break;
      }
      // Update the data state with fetched data
      setData(fetchedData);
    } catch (error) {
      // Log any errors that occur
      // console.error('Error fetching data:', error); 
    } finally {
      // End loading
      setLoading(false);
    }
  };

  const handlePress = (item) => {
    // Navigate to MusicView screen with the selected item
    navigation.navigate('MusicView', { music: item });
  };


  // Render each item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
      {item.thumbnail ? (
        // if there is a thumbnail image
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      ) : (
        // if there is no thumbnail image
        <View style={[styles.thumbnail, styles.placeholderThumbnail]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.details}>
        {/* Title and artiste name */}
        <Text style={styles.title}>{item.title}</Text>
        {item.artist && <Text style={styles.artist}>{item.artist}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Category selection buttons */}
      <View style={styles.buttonContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.button,
              selectedCategory === category.value && styles.selectedButton
            ]}
            onPress={() => setSelectedCategory(category.value)}
          >
            <Text style={styles.buttonText}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Show loading indicator or data list */}
      {loading ? (
        // activity loader
        <ActivityIndicator size="large" color="#c6654a" />
      ) : selectedCategory === 'playlist' ? (
        <View style={styles.placeholderContainer}>
          {/* playlist won't be available due to the api */}
          <Text style={styles.placeholderText}>Playlist feature not available</Text>
        </View>
      ) : (
        // main details for the other items
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 50,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: '#c6654a',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  placeholderThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#555',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    color: '#aaa',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LibraryScreen;
