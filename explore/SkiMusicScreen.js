import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Modal, Button, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DocumentPicker, DocumentPickerOptions } from 'expo-document-picker';
// Import the environment variable
import { LASTFM_API_KEY } from '@env';

const SkiMusicScreen = () => {
  // State for user's name
  const [userName, setUserName] = useState('Gee Brain');
  // State to track if the user is editing their name
  const [editing, setEditing] = useState(false);
  // State to control modal visibility
  const [modalVisible, setModalVisible] = useState(false);
  // State to handle new user name input
  const [newUserName, setNewUserName] = useState(userName);
  // State to store the fetched albums
  const [albums, setAlbums] = useState([]);
  // State to handle the track upload form fields
  const [trackTitle, setTrackTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [genre, setGenre] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // Hook to handle navigation
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch top albums when the component mounts
    fetchTopAlbums();
  }, []);

  const fetchTopAlbums = async () => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=afrobeats&api_key=${LASTFM_API_KEY}&format=json&limit=8`;

    try {
      // Fetch data from Last.fm API
      const response = await fetch(url);
      // Parse the JSON response
      const result = await response.json();
      const fetchedAlbums = result.albums.album.map(item => ({
        id: item.mbid || item.name,
        title: item.name,
        artist: item.artist.name,
        thumbnail: item.image[2]['#text'],
      }));
      // Set the albums state with the fetched data
      setAlbums(fetchedAlbums); 
    } catch (error) {
      // Log any errors
      console.error('Error fetching albums:', error); 
    }
  };

  const handleEdit = () => {
    // Update the user's name
    setUserName(newUserName); 
    // Exit editing mode
    setEditing(false); 
  };

  // Handle song upload
  const handleUploadSong = () => {
    // You can add logic to handle the upload here
    console.log('Track Title:', trackTitle);
    console.log('Artist Name:', artistName);
    console.log('Album Name:', albumName);
    console.log('Genre:', genre);
    console.log('Month:', month);
    console.log('Year:', year);
    console.log('Selected File:', selectedFile);
    // Close the modal
    setModalVisible(false); 
  };

  const handleAlbumPress = (album) => {
    // Navigate to MusicView with the selected album
    navigation.navigate('MusicView', { music: album }); 
  };

  // Handle file selection
  const handleFilePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*', // Limit to audio files
    });

    if (result.type === 'success') {
      setSelectedFile(result);
      console.log('Selected File:', result);
    }
  };

  // Handle the structure and layout of the music list
  const renderAlbumItem = ({ item }) => (
    <TouchableOpacity style={styles.albumItem} onPress={() => handleAlbumPress(item)}>
      {/* Thumbnail */}
      <Image source={{ uri: item.thumbnail }} style={styles.albumThumbnail} />
      <View style={styles.albumDetails}>
        {/* Title and artist */}
        <Text style={styles.albumTitle}>{item.title}</Text>
        <Text style={styles.albumArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Logout button at the top right corner */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Profile picture and upload icon */}
      <View style={styles.profileContainer}>
        <Image
          // Placeholder image, replace with profile picture URL
          source={require('../assets/burna.png')}
          style={styles.profilePicture}
        />
        {/* Plus icon to change dp */}
        <TouchableOpacity style={styles.uploadIcon}>
          <FontAwesome name="plus-circle" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* User name section with edit functionality */}
      <View style={styles.userNameContainer}>
        {editing ? (
          // Display if in editing mode
          <TextInput
            style={styles.userNameInput}
            value={newUserName}
            onChangeText={setNewUserName}
          />
        ) : (
          // Display username if in default mode
          <Text style={styles.userName}>{userName}</Text>
        )}
        {/* Button to edit */}
        <TouchableOpacity style={styles.editButton} onPress={() => setEditing(!editing)}>
          {/* Show pencil to edit or check to submit */}
          <FontAwesome name={editing ? "check" : "pencil"} size={24} color="white" />
        </TouchableOpacity>
        {editing && (
          // Use button to save edited name
          <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Subscription section with upload button */}
      <View style={styles.subscriptionContainer}>
        {/* Subscription */}
        <Text style={styles.subscriptionText}>Subscription: Free</Text>
        {/* Button to upload song */}
        <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.uploadButtonText}>Upload Song</Text>
        </TouchableOpacity>
      </View>

      {/* Section title for top albums */}
      <Text style={styles.sectionTitle}>Most Played Tracks</Text>

      {/* FlatList to render the list of albums */}
      <FlatList
        data={albums}
        renderItem={renderAlbumItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.albumList}
      />

      {/* Modal for song upload */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Upload a Song</Text>
            {/* close button */}
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <FontAwesome name="close" size={24} color="white" />
            </TouchableOpacity>

            {/* Button to open file picker */}
            <TouchableOpacity style={styles.filePickerButton} onPress={handleFilePicker}>
              <Text style={styles.filePickerButtonText}>
                {selectedFile ? selectedFile.name : 'Select File'}
              </Text>
            </TouchableOpacity>

            {/* Track title */}
            <TextInput
              style={styles.input}
              placeholder="Track Title"
              placeholderTextColor="#ccc"
              value={trackTitle}
              onChangeText={setTrackTitle}
            />

            {/* Artiste Name */}
            <TextInput
              style={styles.input}
              placeholder="Artist Name"
              placeholderTextColor="#ccc"
              value={artistName}
              onChangeText={setArtistName}
            />

            {/* Album Name */}
            <TextInput
              style={styles.input}
              placeholder="Album Name"
              placeholderTextColor="#ccc"
              value={albumName}
              onChangeText={setAlbumName}
            />

            {/* Genre */}
            <TextInput
              style={styles.input}
              placeholder="Genre"
              placeholderTextColor="#ccc"
              value={genre}
              onChangeText={setGenre}
            />

            {/* Month */}
            <TextInput
              style={styles.input}
              placeholder="Month"
              placeholderTextColor="#ccc"
              value={month}
              onChangeText={setMonth}
            />

            {/* Year */}
            <TextInput
              style={styles.input}
              placeholder="Year"
              placeholderTextColor="#ccc"
              value={year}
              onChangeText={setYear}
            />
            {/* Accepted format and Upload button */}
            <Text style={styles.uploadFormats}>Accepted formats: mp3, wav</Text>
            <Button title="Upload" onPress={handleUploadSong} color="#c6654a" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 80,
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#c6654a',
    borderRadius: 12,
  },
  userNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  userNameInput: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  editButton: {
    marginLeft: 10,
  },
  saveButton: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#c6654a',
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subscriptionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  subscriptionText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  uploadButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#c6654a',
    borderRadius: 5,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  albumList: {
    paddingBottom: 20,
  },
  albumItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Ensure thumbnail and details are on opposite ends
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    width: '100%',
  },
  albumThumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  albumDetails: {
    flex: 1,
    marginLeft: 10, // Add space between the thumbnail and details
  },
  albumTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  albumArtist: {
    color: '#aaa',
    fontSize: 14,
  },
  logoutButton: {
    position: 'absolute',
    top: 60,
    right: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)', // Black background
  },
  modalView: {
    width: '90%', // Make the modal wider
    padding: 20,
    backgroundColor: '#333', // Dark background for modal content
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#555',
    color: '#fff',
    borderRadius: 5,
  },
  uploadFormats: {
    color: '#ccc',
    marginTop: 10,
    marginBottom: 20,
  },
  filePickerButton: {
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
    marginBottom: 10,
  },
  filePickerButtonText: {
    color: '#fff',
  },
});

export default SkiMusicScreen;
