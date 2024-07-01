// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './src/screens/ExploreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ToggleSwitch from 'toggle-switch-react-native';
import { ThemeProvider, ThemeContext} from './ThemeContext';
import { Image, Text, View } from 'react-native';
import img from './assets/stock-market.png'

// Create a stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  // Get theme and toggleTheme function from ThemeContext
  const { theme, toggleTheme } = useContext(ThemeContext);

  // State to manage dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Effect to update darkMode state when theme changes
  useEffect(() => {
    if (theme === 'light') {
      setDarkMode(true);
    } else {
      setDarkMode(false)
    }
  }, [toggleTheme])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Explore">
        <Stack.Screen
          name="StockApp"
          component={ExploreScreen}
          options={{
            // Add theme toggle switch to header right
            headerRight: () =>
              <Text style={{margin:10}}>
                <ToggleSwitch
                  isOn={!darkMode}
                  onColor="green"
                  offColor="orange"
                  labelStyle={{ color: "black", fontWeight: "900" }}
                  size="large"
                  onToggle={toggleTheme}
                />
              </Text>,
            // Add logo to header left
            headerLeft: () => <Image source={img} style={{height:40, width:40, marginLeft:5,}} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            // Add theme toggle switch to header right
            headerRight: () => 
              <ToggleSwitch
                isOn={!darkMode}
                onColor="green"
                offColor="orange"
                labelStyle={{ color: "black", fontWeight: "900" }}
                size="large"
                onToggle={toggleTheme}
              />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    // Wrap the entire app with ThemeProvider
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;