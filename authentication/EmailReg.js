import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EmailReg = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = (email) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = () => {
    // Validate email and password
    if (isEmailValid(email) && password.trim() !== '') {
      // Navigate to OTP screen with email and password as parameters
      navigation.navigate('VerifyEmail', { email: email, password: password });
    }
  };

  const goBack = () => {
    navigation.goBack(); // Go back to the previous screen
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
        {/* Background image */}

        {/* Black gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />

        {/* Forget Password content */}
        <View style={styles.accordionButtonLogin}>
          <Text style={styles.accordionButtonTextLog}>Register with Email</Text>
          <View style={styles.formContainer}>

            {/* Email Address Field */}
            <Text style={styles.title}>Enter Your Email</Text>
            <TextInput
              style={styles.input}
              placeholder="john-doe@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* Password field */}
            <Text style={styles.title}>Create a Password</Text>
            <TextInput
              style={styles.input}
              placeholder="xxxxxxxx"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* submit to continue button */}
            <TouchableOpacity
              style={[styles.continueButton, !(isEmailValid(email) && password.trim() !== '') && styles.disabledButton]}
              onPress={handleContinue}
              disabled={!(isEmailValid(email) && password.trim() !== '')}
            >
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
    marginBottom: 20,
    // marginTop: 30,
    color: '#000000',
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
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
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
  disabledButton: {
    opacity: 0.5,
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

export default EmailReg;
