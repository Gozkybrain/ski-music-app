// * The ArtisteView screen will house a music play mode with play next queue embedded
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming you're using FontAwesome for icons

const ArtisteMusic = ({ route, navigation }) => {
  // Extract the 'music' object from the 'route.params' passed from navigation
  const { music } = route.params;

  // State variables
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the music is favorite
  const [isPause, setIsPause] = useState(false); // State to track play/pause
  const [progress, setProgress] = useState(0); // State to track playback progress
  const [latestAlbums, setLatestAlbums] = useState([]); // State to store latest albums

  // API key
  const API_KEY = '76a2c19dc353fda867366b17336fdab1';

  // Array of artist names whose latest albums will be fetched
  const artistNames = ['asake', 'davido', 'wizkid', 'burna boy', 'omah lay', 'timaya', 'tiwa savage', 'rema', 'ruger', 'ayra starr'];
        const limit = 10;

  // UseEffect to simulate track progress and update progress bar
  useEffect(() => {
    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 0.01;
        if (nextProgress >= 1) {
          clearInterval(intervalId);
          return 1;
        }
        return nextProgress;
      });
    }, 500);

    // Fetch latest albums on component mount
    fetchLatestAlbums();

    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []); // Run effect only once on component mount

  // Function to fetch latest albums from API
  const fetchLatestAlbums = async () => {
    try {
      // Array to store album promises
      const albumPromises = artistNames.map(async (artist) => {
        // Fetch data from the Last.fm API for the top albums of the artist
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${API_KEY}&format=json&limit=${limit}`
        );

        // Check if the response is ok
        if (!response.ok) {
          throw new Error(`Failed to fetch albums for ${artist}`);
        }

        // Parse the response data
        const data = await response.json();

        // Extract information about the latest album
        if (data && data.topalbums && data.topalbums.album && data.topalbums.album.length > 0) {
          const album = data.topalbums.album[0];
          return {
            id: album.url,
            title: album.name,
            artist: album.artist.name,
            thumbnail: getThumbnailUrl(album.image),
          };
        } else {
          console.error(`No albums found for ${artist}`);
          return null;
        }
      });

      // Wait for all album promises to resolve
      const albums = await Promise.all(albumPromises);

      // Filter out null values and update the state with the latest albums
      setLatestAlbums(albums.filter(album => album !== null));
    } catch (error) {
      console.error('Error fetching latest albums:', error);
    }
  };

  // Helper function to extract the URL for the thumbnail image
  const getThumbnailUrl = (images) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i]['size'] === 'large') {
        return images[i]['#text'];
      }
    }
    // Return the first image if no 'large' image is found
    return images[0]['#text'];
  };

  // Toggle play/pause state
  const handlePlay = () => {
    setIsPause(!isPause);
    console.log('Play music:', music.title);
  };

  // Handle next track action
  const handleNext = () => {
    console.log('Next track');
  };

  // Toggle favorite state
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

// Render each album item in the list
const handleAlbumPress = (album) => {
  navigation.push('MusicView', { music: album }); // Pass 'album' as the 'music' parameter
};


// Render each album item with TouchableOpacity
const renderAlbumItem = (album, index) => (
  <TouchableOpacity key={index} style={styles.albumContainer} onPress={() => handleAlbumPress(album)}>
    {/* Check if album image exists and has the required URI before setting the Image source */}
    <Image source={{ uri: album.thumbnail }} style={styles.albumThumbnail} />
    <View style={styles.albumDetails}>
      <Text style={styles.albumTitle}>{album.title}</Text>
      <Text style={styles.albumArtist}>{album.artist}</Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>

      {/* Option to go back */}
      <View style={styles.artistContainer}>
        {/* Go Back Button */}
        <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <FontAwesome name="chevron-left" size={18} color="#FFFFFF" />
        </TouchableOpacity>
        {/* Open Music Options */}
        {/* <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <FontAwesome6 name="ellipsis-vertical" size={18} color="#FFFFFF" />
        </TouchableOpacity> */}
      </View>

      {/* Main player controls */}
      <View style={styles.mainContainer}>
        {/* Display the album cover image */}
        <Image source={{ uri: music.image && music.image[2] && music.image[2]['#text'] }} style={styles.thumbnail} />

        {/* Display the title and artist's name */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{music.name}</Text>
          <Text style={styles.artist}>{music.artist.name}</Text>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </View>

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


      {/* Scrollable view to make the music bar always above */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Latest albums section */}
        <View style={styles.latestAlbumsContainer}>
          <Text style={styles.latestAlbumsTitle}>Playing Next</Text>
          {latestAlbums.map((album, index) => renderAlbumItem(album, index))}
        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    backgroundColor: '#232C26',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
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
  infoContainer: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  artist: {
    fontSize: 16,
    color: '#ccc',
  },
  iconContainer: {
    padding: 10,
  },
  latestAlbumsContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  latestAlbumsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  albumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  albumDetails: {
    flex: 1,
    marginLeft: 10,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  albumArtist: {
    fontSize: 14,
    color: '#ccc',
  },
  goBackButton: {
    paddingVertical: 15,
    paddingTop: 50,
    // paddingLeft: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  artistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // marginBottom: 20,
    width: '100%', // Adjust the width as needed
  },
});

export default ArtisteMusic;
