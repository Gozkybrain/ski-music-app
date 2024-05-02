// * This component contains recently added Nigerian music will serve as recommended
// Import necessary components and hooks from React and React Native
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

// Define the API key
const API_KEY = 'yourApiKeyHere';

// Define the Recommended component
const Recommended = () => {
    const [recentlyAdded, setRecentlyAdded] = useState([]);
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
                const artistNames = ['asake', 'davido', 'wizkid', 'burna boy', 'omah lay', 'timaya', 'tiwa savage', 'rema', 'ruger', 'ayra starr'];
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

    // Define the renderItem function
    const renderItem = ({ item }) => (
        // Render each item in the FlatList
        <TouchableOpacity style={styles.item} onPress={() => handlePress(item)}>
            {/* If item.thumbnail exists and is not empty, display the image with the specified URI. Otherwise, render an empty image. */}
            <View style={styles.row}>
                <Image source={item.thumbnail ? { uri: item.thumbnail } : null} style={styles.thumbnail} />
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.artist}>{item.artist}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    // Handle press event when an item is clicked
    const handlePress = (item) => {
        // Navigate to MusicView screen with the selected music item
        navigation.navigate('MusicView', { music: item });
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
            {/* Option to go back */}
            <View style={styles.artistContainer}>
                <View style={styles.goBackButton}>
                    <Text style={styles.sliderTitle}>Recommended</Text>
                </View>
                {/* Go Back Button */}
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="times" size={18} color="#FFFFFF" />
                </TouchableOpacity>

            </View>

            <FlatList
                data={recentlyAdded}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#000',
    },
    sliderTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    item: {
        marginBottom: 20,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
    },
    details: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: '70%',
    },
    artist: {
        color: '#fff',
        fontSize: 14,
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

// Export the component as the default export
export default Recommended;
