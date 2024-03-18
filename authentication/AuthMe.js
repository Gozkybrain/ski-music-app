import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AuthMe = ({ navigation }) => {
    // State variables to manage form inputs
    const [gender, setGender] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [fullName, setFullName] = useState('');

    const goBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };

    // Function to handle form submission
    const handleContinue = () => {
        // Check if all required fields are filled
        if (gender.trim() !== '' && selectedDate.trim() !== '' && fullName.trim() !== '') {
            // Navigate to AuthMain component if all fields are filled
            navigation.navigate('AuthMain');
        } else {
            // Display error message if any required field is empty
            Alert.alert('Error', 'Please provide all information!');
        }
    };

    // Function to format the date as "dd/mm/yyyy" while typing
    const formatDateString = (text) => {
        // Remove non-numeric characters
        const numericText = text.replace(/\D/g, '');
        // Insert slashes at appropriate positions
        if (numericText.length > 2 && numericText.length <= 4) {
            return `${numericText.slice(0, 2)}/${numericText.slice(2)}`;
        } else if (numericText.length > 4) {
            return `${numericText.slice(0, 2)}/${numericText.slice(2, 4)}/${numericText.slice(4, 8)}`;
        } else {
            return numericText;
        }
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
                        {/* Title: What is your Birth date? */}
                        <Text style={styles.title}>What is your Birth date?</Text>
                        {/* Input field for birth date */}
                        <TextInput
                            style={styles.input}
                            placeholder="DD/MM/YYYY"
                            value={selectedDate}
                            onChangeText={(text) => setSelectedDate(formatDateString(text))}
                            keyboardType="numeric"
                            maxLength={10}
                        />

                        {/* Title: What is your Full Name? */}
                        <Text style={styles.title}>What is your Full Name?</Text>
                        {/* Input field for full name */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            value={fullName}
                            onChangeText={setFullName}
                            autoCapitalize="words"
                            autoCorrect={false}
                        />

                        {/* Title: Gender */}
                        <Text style={styles.title}>Gender</Text>
                        {/* Gender selection buttons */}
                        <View style={styles.genderSelector}>
                            <TouchableOpacity
                                style={[styles.genderOption, gender === 'male' && styles.selectedOption]}
                                onPress={() => setGender('male')}
                            >
                                <Text style={[styles.genderText, gender === 'male' && styles.selectedText]}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.genderOption, gender === 'female' && styles.selectedOption]}
                                onPress={() => setGender('female')}
                            >
                                <Text style={[styles.genderText, gender === 'female' && styles.selectedText]}>Female</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.genderOption, gender === 'others' && styles.selectedOption]}
                                onPress={() => setGender('others')}
                            >
                                <Text style={[styles.genderText, gender === 'others' && styles.selectedText]}>Others</Text>
                            </TouchableOpacity>
                        </View>

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
        color: '#FFFFFF',
        marginTop: 30,
    },
    accordionButtonLogin: {
        backgroundColor: '#C54436',
        paddingLeft: 50,
        paddingBottom: 50,
        paddingTop: 30,
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
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    genderSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    genderOption: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: '#ffffff',
        color: '#C54436',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
    },
    selectedOption: {
        backgroundColor: '#ffffff',
        borderColor: '#293c3b',
        borderWidth: 2
    },
    genderText: {
        color: '#293c3b',
    },
    continueButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    continueButtonText: {
        color: '#c54436',
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

export default AuthMe;
