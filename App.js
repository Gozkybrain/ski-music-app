import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import ForgetPassword from './authentication/ForgetPassword';
import OTP from './authentication/OTP';
import NewPass from './authentication/NewPass';
import NewPage from './authentication/NewPage';
import AuthMe from './authentication/AuthMe';
import EmailReg from './authentication/EmailReg';
import VerifyEmail from './authentication/VerifyEmail';
import AuthMain from './authentication/AuthMain';
import Home from './explore/Home';
import MusicView from './explore/MusicView';
import ViewArtiste from './explore/ViewArtiste';
import ArtisteMusic from './explore/ArtisteMusic';

// Setting up a stack navigator
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
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />

        {/* OTP screen for entering one-time password */}
        <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />

        {/* NewPass screen for resetting new password */}
        <Stack.Screen name="NewPass" component={NewPass} options={{ headerShown: false }} />

        {/* EmailReg screen enables users register with email option */}
        <Stack.Screen name="EmailReg" component={EmailReg} options={{ headerShown: false }} />

        {/* AuthMe screen to register user profile info with email */}
        <Stack.Screen name="AuthMe" component={AuthMe} options={{ headerShown: false }} />

        {/* AuthMain screen to complete user profile registration with email */}
        <Stack.Screen name="AuthMain" component={AuthMain} options={{ headerShown: false }} />

        {/* VerifyEmail screen to send email OTP verification during registration */}
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} options={{ headerShown: false }} />

        {/* New Page Screen is the loader before Home Access */}
        <Stack.Screen name="NewPage" component={NewPage} options={{ headerShown: false }} />

        {/* Home screen after login access */}
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        {/* Music View screen when played */}
        <Stack.Screen name="MusicView" component={MusicView} options={{ headerShown: false }} />

        {/* View Artiste screen */}
        <Stack.Screen name="ViewArtiste" component={ViewArtiste} options={{ headerShown: false }} />

        {/* View Music by Artiste screen */}
        <Stack.Screen name="ArtisteMusic" component={ArtisteMusic} options={{ headerShown: true }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
