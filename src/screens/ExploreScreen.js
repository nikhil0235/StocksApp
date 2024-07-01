import React from 'react'; // Import React library
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import createBottomTabNavigator from react-navigation
import TopGainersScreen from './TopGainersScreen'; // Import TopGainersScreen component
import TopLosersScreen from './TopLosersScreen'; // Import TopLosersScreen component
import { Image } from 'react-native'; // Import Image component from react-native
import img1 from '../../assets/arrow-up.png'; // Import image for Top Gainers tab icon
import img2 from '../../assets/down.png'; // Import image for Top Losers tab icon

const Tab = createBottomTabNavigator(); // Create a bottom tab navigator

const ExploreScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Top Gainers"
        component={TopGainersScreen} // Set the component for the Top Gainers tab
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={img1} // Use image for Top Gainers tab icon
              style={{ width: 35, height: 35 }} // Set the style for the icon
            />
          ),
        }}
      />
      <Tab.Screen
        name="Top Losers"
        component={TopLosersScreen} // Set the component for the Top Losers tab
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={img2} // Use image for Top Losers tab icon
              style={{ width: 35, height: 35 }} // Set the style for the icon
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ExploreScreen; // Export ExploreScreen component as default
