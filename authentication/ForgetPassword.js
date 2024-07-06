import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const goBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };

  const handleContinue = () => {
    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if email matches the pattern
    if (!emailPattern.test(email.trim())) {
      // Show error message for invalid email
      Alert.alert('Error', 'Please enter a valid email address.');
      return; // Stop execution if email is invalid
    }

    // Navigate to OTP screen with email as parameter
    navigation.navigate('OTP', { email: email });
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={require('../assets/passBG.png')}
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
        {/* Background image */}

        <Image
          source={require('../assets/girlBG.png')}
          style={styles.backgroundImage}
        />
        {/* Black gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        {/* Forget Password content */}
        <View style={styles.accordionButtonLogin}>
          <Text style={styles.accordionButtonTextLog}>Change your password</Text>
          <View style={styles.formContainer}>

            {/* enter email address to recover password */}
            <Text style={styles.title}>Enter Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="johndoe@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
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
    borderTopRightRadius: 300,
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
    // fontWeight: 'bold',
    // color: 'white',
    marginBottom: 20,
    marginTop: 30,
  },
  accordionButtonLogin: {
    backgroundColor: '#ffffff',
    paddingLeft: 50,
    // paddingRight: 10,
    paddingBottom: 80,
    paddingTop: 80,
    width: '100%',
    borderTopRightRadius: 200,
    overflow: 'hidden',
  },
  accordionButtonRegister: {
    backgroundColor: '#C54436',
    paddingLeft: 50,
    paddingBottom: 30,
    paddingTop: 30,
    width: '100%',
  },
  accordionButtonTextLog: {
    color: '#C54436',
    fontSize: 26,
  },
  accordionButtonTextReg: {
    color: '#ffffff',
    fontSize: 26,
  },
  accordionBox: {
    backgroundColor: '#c54436',
    width: '100%',
    borderTopRightRadius: 200,
    overflow: 'hidden',
    marginTop: 10,
  },
  accordionContentReg: {
    backgroundColor: '#c54436',
    width: '100%',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    // alignItems: 'center',
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
  accordionContentLog: {
    backgroundColor: '#ffffff',
    padding: 25,
    width: '100%',
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

export default ForgetPassword;
