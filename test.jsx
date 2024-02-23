import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const NewPass = ({ navigation }) => {



  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={require('../assets/In.png')}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/hLogo.png')} style={styles.logo} />
      </View>

      {/* Body */}
      <View style={styles.body}>
        {/* Background image */}
        <Image
          source={require('../assets/myBg.png')}
          style={styles.backgroundImage}
        />
        {/* Black gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
         {/* Forget Password content */}
         <View  style={styles.accordionButtonLogin}>
            <Text style={styles.accordionButtonTextLog}>...loading</Text>
            
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

export default NewPass;
