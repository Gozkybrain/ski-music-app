import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const OTP = ({ navigation }) => {
    // State variables to store OTP inputs
    const [otp1, setOtp1] = useState('');
    const [otp2, setOtp2] = useState('');
    const [otp3, setOtp3] = useState('');
    const [otp4, setOtp4] = useState('');
  
    // Function to handle OTP submission
    const handleSubmit = () => {
      // Combine the OTP digits into a single string
      const otp = otp1 + otp2 + otp3 + otp4;
      // Navigate to NewPass screen with OTP data
      navigation.navigate('NewPass', { otp });
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
        <Image source={require('../assets/whiteLG.png')} style={styles.logo} />
      </View>

      {/* Body */}
      <View style={styles.body}>

        {/* Black gradient */}
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
         {/* NewPassword content */}
         <View  style={styles.accordionButtonLogin}>
            <Text style={styles.accordionButtonTextLog}>Verify your email</Text>
            <View style={styles.containers}>
      {/* Title */}
      <Text style={styles.title}>
        A 4 digit OTP has been sent to your email, please input them to continue.
      </Text>
      {/* OTP input fields */}
      <View style={styles.otpContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => setOtp1(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => setOtp2(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => setOtp3(text)}
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => setOtp4(text)}
        />
      </View>
      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
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
    paddingTop: 20,
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
  containers: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 25,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#772e24',
    borderRadius: 5,
    width: '15%',
    height: 60,
    marginLeft: 10,
    fontSize: 20,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#C54436',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionLogin: {
    backgroundColor: '#ffffff',
    borderTopRightRadius: 200,
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
    color: 'white',
    marginBottom: 20,
  },
  accordionButtonLogin: {
    backgroundColor: '#C54436',
    // paddingLeft: 50,
    paddingBottom: 30,
    paddingTop: 80,
    width: '100%',
    borderTopRightRadius: 150,
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
    color: '#ffffff',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  accordionButtonTextReg: {
    color: '#ffffff',
    fontSize: 26,
  },
  accordionBox: {
    backgroundColor: '#c54436',
    width: '100%',
    borderTopRightRadius: 100,
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

export default OTP;
