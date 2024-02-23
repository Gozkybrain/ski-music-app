import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const SignIn = ({ navigation }) => {
  const handleLogin = () => {
    // Handle login logic
  };

  const handleForgotPassword = () => {
    // Navigate to ForgetPassword screen
    navigation.navigate('ForgetPassword');
  };

  return (
    <View style={styles.container}>
      {/* Email Input */}
      <Text>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="johndoe@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        testID="emailInput"  // Add a test ID
      />

      {/* Password Input */}
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        testID="passwordInput"  // Add a test ID
      />

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          Welcome back  </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#C54436',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderRadius: 300,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  forgotPasswordLink: {
    color: '#C54436',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignIn;
