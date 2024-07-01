import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopGainersScreen from './TopGainersScreen';
import TopLosersScreen from './TopLosersScreen';
import { Image } from 'react-native';
import img1 from '../../assets/arrow-up.png';
import img2 from '../../assets/down.png';

const Tab = createBottomTabNavigator();

const ExploreScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Top Gainers"
        component={TopGainersScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={img1} // Use source instead of src
              style={{ width: 35, height: 35}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Top Losers"
        component={TopLosersScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={img2} // Use source instead of src
              style={{ width: 35 , height:35}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ExploreScreen;
