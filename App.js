import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import ForgetPassword from './authentication/ForgetPassword';
import OTP from './authentication/OTP';
import NewPass from './authentication/NewPass';
import EmailReg from './authentication/EmailReg';
// import SignUp from './authentication/SignUp';

// Create a stack navigator
const Stack = createStackNavigator();

// Main component of the application
const App = () => {
  return (
    // Navigation container wraps the entire app
    <NavigationContainer>
      {/* Stack navigator manages the navigation flow */}
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash screen displayed first */}
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        {/* Home screen is the main screen of the application */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        {/* ForgetPassword screen for resetting password */}
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: true }} />
        {/* OTP screen for entering one-time password */}
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: true }} />
         {/* OTP screen for entering setting new password */}
         <Stack.Screen name="NewPass" component={NewPass} options={{ headerShown: true }} />
           {/* Register with email screen*/}
           {/* <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: true }} /> */}
           <Stack.Screen name="EmailReg" component={EmailReg} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
