import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AuthMain = ({ navigation }) => {
    // State variables to manage form inputs
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

    // Function to handle form submission
    const handleContinue = () => {
        // Check if all required fields are filled
        if (username.trim() !== '') {
            // Navigate to NewPage if all fields are filled
            navigation.navigate('NewPage');
        } else {
            // Display error message if username field is empty
            Alert.alert('Error', 'You will need a username to continue.');
        }
    };

    const goBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };

    // Function to handle profile picture upload
    const handleProfilePictureUpload = (image) => {
        // Logic to handle profile picture upload
        setProfilePicture(image);
    };

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image
                source={require('../assets/In.png')}
                style={styles.backgroundImage}
            />

            {/* Header */}
            <View style={styles.header}>

                {/* Go Back Button */}
                <TouchableOpacity style={styles.goBackButton} onPress={goBack}>
                    <Text style={styles.goBackButtonText}>&#x2190;</Text>
                </TouchableOpacity>

                {/* logo image */}
                <Image source={require('../assets/whiteLG.png')} style={styles.logo} />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Gradient */}
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                />

                {/* Form */}
                <View style={styles.accordionButtonLogin}>
                    <View style={styles.formContainer}>
                        {/* Title: Upload Profile Picture */}
                        <Text style={styles.title}>Upload Profile Picture</Text>
                        {/* Profile Picture Upload */}
                        <TouchableOpacity
                            style={styles.profilePictureContainer}
                            onPress={() => handleProfilePictureUpload(/* Pass image parameter here */)}>
                            {/* Show selected profile picture or placeholder */}
                            {profilePicture ? (
                                <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                            ) : (
                                <Image source={require('../assets/user-dp.jpg')} style={styles.profilePicture} />
                            )}
                        </TouchableOpacity>

                        {/* Title: Choose a Username */}
                        <Text style={styles.title}>Choose a Username</Text>
                        {/* Username Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="johndoe123"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {/* Continue Button */}
                        <TouchableOpacity
                            style={[styles.continueButton, username.trim() === '' && styles.disabledButton]}
                            onPress={handleContinue}
                            disabled={username.trim() === ''}>
                            <Text style={styles.continueButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    header: {
        paddingTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 70,
    },
    body: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    accordionLogin: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: 100,
        overflow: 'hidden',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Trebuchet MS',
        marginBottom: 20,
        color: '#C54436',
        marginTop: 30,
    },
    accordionButtonLogin: {
        backgroundColor: '#ffffff',
        paddingLeft: 50,
        paddingBottom: 20,
        paddingTop: 20,
        width: '100%',
        borderTopRightRadius: 200,
        overflow: 'hidden',
    },
    formContainer: {
        borderRadius: 10,
        width: '80%',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    continueButton: {
        backgroundColor: '#C54436',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    disabledButton: {
        opacity: 0.5,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    profilePictureContainer: {
        width: 150,
        height: 150,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 60,
    },

    goBackButton: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        alignSelf: 'flex-start',
      },
      
      goBackButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'left',
        fontWeight: 'bold',
      },
});

export default AuthMain;
