import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome icons
import ExploreScreen from './ExploreScreen';
import SearchScreen from './SearchScreen';
import LibraryScreen from './LibraryScreen';
import SkiMusicScreen from './SkiMusicScreen';

const Tab = createMaterialBottomTabNavigator();                                                                         

const HomeScreen = () => {
  return (
    <Tab.Navigator
      shifting={false} // Set to false to disable shifting behavior and the indicator
      labeled={true} // Set to true for labeled tabs
      activeColor="#fff" // Active tab text color (black)
      inactiveColor="#888888" // Inactive tab text color
      barStyle={{ backgroundColor: '#000000' }} // Set black background for the tab bar
      tabBarOptions={{
        labelStyle: { fontSize: 14 }, // Customize label font size
      }}
    >
      {/* Explore tab */}
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{
          // Icon for Explore tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="compass" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'Explore', // Label for Explore tab
        }}
      />

      {/* Search tab */}
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          // Icon for Search tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="search" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'Search', // Label for Search tab
        }}
      />

      {/* Library tab */}
      <Tab.Screen 
        name="Library" 
        component={LibraryScreen} 
        options={{
          // Icon for Library tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="book" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'Library', // Label for Library tab
        }}
      />

      {/* SkiMusic tab */}
      <Tab.Screen 
        name="SkiMusic" 
        component={SkiMusicScreen} 
        options={{
          // Icon for SkiMusic tab
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5 name="music" size={20} color={focused ? '#000' : color} />
          ),
          tabBarLabel: 'SkiMusic', // Label for SkiMusic tab
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
