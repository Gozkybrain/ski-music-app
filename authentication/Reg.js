import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Reg = ({ navigation }) => {
  const handleEmailSignUp = () => {
    navigation.navigate('EmailReg');
  };

  const handleAppleSignUp = () => {
    // Handle Apple sign up logic
  };

  const handleFacebookSignUp = () => {
    // Handle Facebook sign up logic
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleEmailSignUp}>
        <View style={styles.buttonContent}>
          <FontAwesome name="envelope" size={20} color="#C54436" style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Email</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleAppleSignUp}>
        <View style={styles.buttonContent}>
          <FontAwesome name="apple" size={20} color="#C54436" style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleFacebookSignUp}>
        <View style={styles.buttonContent}>
          <FontAwesome name="facebook" size={20} color="#C54436" style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Facebook</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleGoogleSignUp}>
        <View style={styles.buttonContent}>
          <FontAwesome name="google" size={20} color="#C54436" style={styles.icon} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderRadius: 300,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#C54436',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reg;
