import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NewPass = ({ navigation }) => {
    // State variables for email, password, and confirm password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const goBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };

    // Function to handle continue button press
    const handleContinue = () => {
        // Validate email and password
        if (password.trim() !== '' && password === confirmPassword) {
            // Navigate to HomeScreen if all fields are valid and passwords match
            navigation.navigate('HomeScreen');
            // Show success alert
            Alert.alert('Success', 'Password changed successfully!');
        } else {
            // Show error message if any field is empty or passwords don't match
            Alert.alert('Error', 'Please enter matching passwords.');
        }
    };

    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image
                source={require('../assets/otp.png')}
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
                {/* Black gradient */}
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                />

                {/* Forget Password content */}
                <View style={styles.accordionButtonLogin}>
                    <Text style={styles.accordionButtonTextLog}>Change your password</Text>
                    <View style={styles.formContainer}>
                        {/* Title: New Password */}
                        <Text style={styles.title}>New Password</Text>
                        {/* Password Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {/* Title: Confirm Password */}
                        <Text style={styles.title}>Confirm Password</Text>
                        {/* Confirm Password Input */}
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        {/* Continue Button */}
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                            <Text style={styles.continueButtonText}>Continue</Text>
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
        marginTop: 30,
    },
    accordionButtonLogin: {
        backgroundColor: '#ffffff',
        paddingLeft: 50,
        paddingBottom: 80,
        paddingTop: 80,
        width: '100%',
        borderTopRightRadius: 200,
        overflow: 'hidden',
    },
    accordionButtonTextLog: {
        color: '#C54436',
        fontSize: 26,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
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

export default NewPass;
