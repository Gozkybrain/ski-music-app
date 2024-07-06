import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const SignIn = ({ navigation }) => {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = () => {
    // Navigate to NewPage screen after login
    navigation.navigate('NewPage');
  };

  const handleForgotPassword = () => {
    // Navigate to ForgetPassword screen
    navigation.navigate('ForgetPassword');
  };

  // dismiss the keyboard when tapping outside input fields
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        {/* Email Input */}
        <Text>Email Address</Text>
        <TextInput
          ref={emailInputRef}
          style={styles.input}
          placeholder="johndoe@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          // Add a test ID
          testID="emailInput"
          onSubmitEditing={() => passwordInputRef.current.focus()}
        />

        {/* Password Input */}
        <Text>Password</Text>
        <TextInput
          ref={passwordInputRef}
          style={styles.input}
          placeholder="********"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          // Add a test ID
          testID="passwordInput"
          onSubmitEditing={handleLogin}
        />

        {/* Forgot Password Link */}
        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
