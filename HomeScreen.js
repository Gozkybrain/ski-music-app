import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SignUp from './authentication/SignUp'; // Import the SignUp component
import SignIn from './authentication/SignIn'; // Import the SignIn component

const HomeScreen = ({ navigation }) => {
  // State variables to manage the visibility of login and register forms
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Function to toggle the visibility of the login form
  const toggleLoginAccordion = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false);
  };

  // Function to toggle the visibility of the register form
  const toggleRegisterAccordion = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false);
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={require('./assets/In.png')}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <Image source={require('./assets/hLogo.png')} style={styles.logo} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Background image */}
        <Image
          source={require('./assets/myBg.png')}
          style={styles.backgroundImage}
        />
        {/* Black gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        {/* Title */}
        <Text style={styles.title}>Everything Music!</Text>

        {/* Accordions */}
        <View style={styles.accordionBox}>
          {/* Register Accordion */}
          <TouchableOpacity onPress={toggleRegisterAccordion} style={styles.accordionButtonRegister}>
            <Text style={styles.accordionButtonTextReg}>Sign Up</Text>
          </TouchableOpacity>
          {isRegisterOpen && (
            <View style={styles.accordionContentReg}>
              {/* Implement Registration form here */}
              <SignUp  navigation={navigation} />
            </View>
          )}

          {/* Login Accordion */}
          <TouchableOpacity onPress={toggleLoginAccordion} style={styles.accordionButtonLogin}>
            <Text style={styles.accordionButtonTextLog}>Sign In</Text>
          </TouchableOpacity>
          {isLoginOpen && (
            <View style={styles.accordionContentLog}>
              {/* Implement Login form here and define navigation */}
              <SignIn navigation={navigation} />
            </View>
          )}
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
    fontSize: 60,
    fontFamily: 'Trebuchet MS',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  accordionButtonLogin: {
    backgroundColor: '#ffffff',
    paddingLeft: 50,
    paddingBottom: 30,
    paddingTop: 30,
    width: '100%',
    borderTopRightRadius: 300,
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
  accordionContentLog: {
    backgroundColor: '#ffffff',
    padding: 25,
    width: '100%',
  },
});

export default HomeScreen;
