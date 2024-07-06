import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const VerifyEmail = ({ navigation }) => {
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

    const goBack = () => {
        navigation.goBack(); // Go back to the previous screen.
    };

    // Function to check if all OTP fields are filled
    const isOtpFilled = () => {
        return otp1.trim() !== '' && otp2.trim() !== '' && otp3.trim() !== '' && otp4.trim() !== '';
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
                {/* NewPassword content */}
                <View style={styles.accordionButtonLogin}>
                    <Text style={styles.accordionButtonTextLog}>Verify your email</Text>
                    <View style={styles.containers}>
                        {/* Title */}
                        <Text style={styles.title}>
                            A 4 digit OTP has been sent to your email, please input them to continue.
                        </Text>
                        {/* OTP input fields */}
                        <View style={styles.otpContainer}>

                            {/* otp1  */}
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={text => setOtp1(text)}
                            />

                            {/* otp 2 */}
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={text => setOtp2(text)}
                            />

                            {/* otp 3 */}
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={text => setOtp3(text)}
                            />

                            {/* otp 4 */}
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                maxLength={1}
                                onChangeText={text => setOtp4(text)}
                            />
                        </View>

                        {/* resend otp codes */}
                        <Text style={styles.title}>
                            Resend OTP Code
                        </Text>

                        {/* Submit button */}
                        <TouchableOpacity
                            style={[styles.button, !isOtpFilled() && styles.disabledButton]}
                            onPress={handleSubmit}
                            disabled={!isOtpFilled()}
                        >
                            <Text style={styles.buttonText}>Continue</Text>
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
    containers: {
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
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#C54436',
        fontSize: 16,
        fontWeight: 'bold',
    },
    accordionButtonLogin: {
        backgroundColor: '#C54436',
        paddingBottom: 30,
        paddingTop: 80,
        width: '100%',
        borderTopRightRadius: 150,
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
        color: 'white',
        marginBottom: 20,
    },
    accordionButtonTextLog: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
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

export default VerifyEmail;
