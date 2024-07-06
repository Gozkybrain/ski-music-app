// * Search Screen to handle Genre Cards and Search Bar
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, FlatList, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

// Load environment variables from dotenv
import { LASTFM_API_KEY } from '@env'; 

// Mock data for genres
// * Contains title, image, gradient, and screen
const genres = [
  { title: 'Pop', image: require('../assets/ddg-DZef1.png'), gradient: ['rgba(255,126,15,0.4)', 'rgba(254,180,123,0.4)'], screen: 'Pop' },
  { title: 'R&B', image: require('../assets/justin.png'), gradient: ['rgba(106,48,147,0.6)', 'rgba(160,68,255,0.6)'], screen: 'Rnb' },
  { title: 'Hip-Hop', image: require('../assets/chris.png'), gradient: ['rgba(241,39,17,0.4)', 'rgba(245,175,25,0.4)'], screen: 'HipHop' },
  { title: 'Trap', image: require('../assets/trap.png'), gradient: ['rgba(31,64,55,0.6)', 'rgba(153,242,200,0.6)'], screen: 'Trap' },
  { title: 'Afrobeats', image: require('../assets/burna.png'), gradient: ['rgba(252,74,26,0.6)', 'rgba(247,183,51,0.6)'], screen: 'Afrobeats' },
  { title: 'Party', image: require('../assets/bunny.png'), gradient: ['rgba(69,104,220,0.6)', 'rgba(176,106,179,0.6)'], screen: 'Party' },
  { title: 'Top Chart', image: require('../assets/chart.png'), gradient: ['rgba(101,78,163,0.6)', 'rgba(234,175,200,0.6)'], screen: 'TopChart' },
  { title: 'Country', image: require('../assets/country.png'), gradient: ['rgba(255,153,102,0.6)', 'rgba(255,94,98,0.6)'], screen: 'Country' },
  { title: 'Karaoke', image: require('../assets/karaoke.png'), gradient: ['rgba(0,198,255,0.6)', 'rgba(0,114,255,0.6)'], screen: 'Karaoke' },
  { title: 'Perfect for You', image: require('../assets/ayra.png'), gradient: ['rgba(67,206,162,0.6)', 'rgba(24,90,157,0.6)'], screen: 'ForYou' },
];

// Main GenreScreen component
const GenreScreen = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for search results
  const [searchResults, setSearchResults] = useState([]);
  // State for number of columns in FlatList
  const [numColumns, setNumColumns] = useState(2);
  // State for loading indicator
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();


  // Function to make search request to Last.fm API
  const searchMusic = async (query) => {
    try {
      const response = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${LASTFM_API_KEY}&format=json`);
      return response.data.results.trackmatches.track;
    } catch (error) {
      console.error('Error fetching search results:', error);
      return [];
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    setLoading(true); // Set loading to true
    console.log("Search Query:", searchQuery);
    const results = await searchMusic(searchQuery);
    console.log("Search Results:", results);
    setSearchResults(results);
    setNumColumns(results.length > 0 ? 1 : 2);
    setLoading(false); // Set loading to false after receiving results
  };

  // Function to handle "Enter" button press on TextInput
  const handleInputSubmit = () => {
    handleSearch();
  };

  // Function to render genre items
  const renderGenreItem = ({ item }) => (
    <TouchableOpacity style={styles.box} onPress={() => handleItemPress(item)}>
      <ImageBackground source={item.image} style={styles.imageBackground}>
        <LinearGradient colors={item.gradient} style={styles.gradientOverlay}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  // Function to handle item press and navigate to the respective screen
  const handleItemPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen); // Navigate to the respective screen
    }
  };

  // Function to handle item press and navigate to MusicView screen
  const handleResultPress = (item) => {
    navigation.navigate('ArtisteMusic', { music: item }); // Pass the selected item to MusicView
  };

  // Function to render search result items
  const renderSearchResultItem = ({ item }) => (
    <TouchableOpacity style={styles.searchResultItem} onPress={() => handleResultPress(item)}>
      <View key={item.name} style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item.image && typeof item.image === 'string' ? (
          <Image source={{ uri: item.image }} style={styles.thumbnail} />
        ) : (
          <View style={styles.placeholderThumbnail} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search music..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleInputSubmit} // Call handleSearch when "Enter" is pressed
        />
        <TouchableOpacity
          onPress={handleSearch}
          style={[styles.searchButton, !searchQuery && styles.disabledButton]} // Conditionally apply disabledButton style if searchQuery is empty
          disabled={!searchQuery} // Disable button if searchQuery is empty
        >
          <FontAwesome name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {loading ? ( // Display loader if loading state is true
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        searchResults.length > 0 ? (
          <FlatList
            key={'searchResults'} // Change key to force re-render
            data={searchResults}
            renderItem={renderSearchResultItem}
            keyExtractor={(item) => `${item.name}-${item.artist}`} // Use combination of name and artist for unique key
          />
        ) : (
          <FlatList
            key={'genres'} // Change key to force re-render
            data={genres}
            renderItem={renderGenreItem}
            keyExtractor={(item) => item.title}
            numColumns={numColumns}
            columnWrapperStyle={numColumns === 2 && styles.row} // Only apply column wrapper when numColumns is 2
            contentContainerStyle={styles.listContent}
          />
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#c6654a',
    borderRadius: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    borderTopStartRadius: 50,
    borderBottomEndRadius: 50,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  searchResultItem: {
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
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    color: '#aaa',
    fontSize: 16,
  },
  placeholderThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
});

export default GenreScreen;
