// * THIS PAGE DISPLAYS LIST OF SONGS BY AN ARTISTE
// ! The music cards can open ArtisteMusic to play the song
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import MusicDetail from './MusicDetail';
import ArtisteMusic from './ArtisteMusic';

// Load environment variables from dotenv
import { LASTFM_API_KEY } from '@env'; 

// Declare all required variables
const ViewArtiste = ({ route, navigation }) => {
    const { artistName } = route.params;
    const [topAlbums, setTopAlbums] = useState([]);
    const [latestAlbumImage, setLatestAlbumImage] = useState('');
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    // Fetch top albums for the artist on component mount
    useEffect(() => {
        const fetchTopAlbums = async () => {
            try {
                const response = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${encodeURIComponent(
                        artistName
                    )}&api_key=${LASTFM_API_KEY}&format=json&limit=10`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch top albums');
                }

                const albumData = await response.json();

                // Check if albumData and its nested properties exist and are not null or undefined
                if (albumData && albumData.topalbums && albumData.topalbums.album) {
                    // If conditions are met, update the topAlbums state with the album array from the API response
                    setTopAlbums(albumData.topalbums.album);

                    // Set the latest album image
                    const latestAlbum = albumData.topalbums.album[0];
                    if (latestAlbum && latestAlbum.image && latestAlbum.image.length > 0) {
                        setLatestAlbumImage(latestAlbum.image[2]['#text']); // Use a specific image size (e.g., large)
                    }
                } else {
                    throw new Error('No top albums found for this artist');
                }
            } catch (error) {
                console.error('Error fetching top albums:', error);
            }
        };

        fetchTopAlbums();
    }, [artistName]);

    // Navigate to ArtisteMusic screen with the selected album
    const handleAlbumPress = (album) => {
        navigation.navigate('ArtisteMusic', { music: album });
    };

    // Set the selected album for modal display
    const handleAlbumModal = (album) => {
        setSelectedAlbum(album);
    };

    // Close the modal
    const closeModal = () => {
        setSelectedAlbum(null);
    };

    // Render each album item in the FlatList
    const renderAlbumItem = ({ item }) => (
        // Music Card, onPress opens the song in ArtisteMusic
        <TouchableOpacity style={styles.albumItem} onPress={() => handleAlbumPress(item)}>
            {/* Thumbnail Image Album Art */}
            <Image source={{ uri: item.image[2]['#text'] }} style={styles.albumThumbnail} />
            <View style={styles.albumDetails}>
                {/* Title of Song */}
                <Text style={styles.albumTitle}>{item.name}</Text>
                {/* Name of Artiste */}
                <Text style={styles.albumArtist}>{artistName}</Text>
            </View>
            <TouchableOpacity onPress={() => handleAlbumModal(item)} style={styles.iconContainer}>
                {/* Ellipsis that opens modal for song details. */}
                <FontAwesome6 name="ellipsis-vertical" size={18} color="#FFFFFF" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.artistContainer}>
                {/* Touchable container for Go Back button and artist name */}
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <FontAwesome6 name="chevron-left" size={18} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.artistName} onPress={() => navigation.goBack()}>{artistName}</Text>
            </View>
            {/* Display the latest album image if available */}
            {latestAlbumImage ? (
                <>
                    <Image source={{ uri: latestAlbumImage }} style={styles.latestAlbumImage} />
                    {/* Display the artist name below the latest album image */}
                    <Text style={styles.artistName}>{artistName}</Text>
                </>
            ) : null}
            {/* FlatList to render top albums */}
            <FlatList
                data={topAlbums}
                renderItem={renderAlbumItem}
                keyExtractor={(item) => item.name}
                ListEmptyComponent={<Text>No top albums found for this artist.</Text>}
            />

            {/* Modal to display the selected album image as info */}
            {selectedAlbum && (
                <Modal visible={true} transparent={true} onRequestClose={closeModal}>
                    <View style={styles.modalContainer}>
                        <Image source={{ uri: selectedAlbum.image[2]['#text'] }} style={styles.modalImage} />
                        {/* display music details */}
                        <MusicDetail />
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <FontAwesome6 name="times-circle" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}
        </View>
    );
};

// Styles for the ViewArtiste component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
    },
    latestAlbumImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    albumItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    albumThumbnail: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 10,
    },
    albumDetails: {
        flex: 1,
    },
    albumTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    albumArtist: {
        fontSize: 14,
        color: '#666',
    },
    artistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30, // Adjust margin top as needed
    },
    goBackButton: {
        paddingVertical: 15,
        paddingRight: 10,
    },
    artistName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        paddingVertical: 20,
        // textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222827',
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        width: 300,
        height: 300,
        marginVertical: 40,
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
    },
    iconContainer: {
        padding: 10,
    },
});

export default ViewArtiste;
