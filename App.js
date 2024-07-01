// src/App.js
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './src/screens/ExploreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ToggleSwitch from 'toggle-switch-react-native';
import { ThemeProvider, ThemeContext, customLightTheme, customDarkTheme } from './ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image, Text, View } from 'react-native';
import img from './assets/stock-market.png'

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { theme ,toggleTheme} = useContext(ThemeContext);

  const[darkMode,setDarkMode] = useState(false);

useEffect(() => {
if(theme==='light'){
  setDarkMode(true);
}
else{
  setDarkMode(false)
}
console.log(darkMode)
}, [toggleTheme])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Explore" >
        <Stack.Screen
          name="StockApp"
          component={ExploreScreen}
          options={{
            headerRight: () =>
            <Text style={{margin:10}}>
            <ToggleSwitch
            isOn={!darkMode}
            onColor="green"
            offColor="orange"
            labelStyle={{ color: "black", fontWeight: "900" }}
            size="large"
            onToggle={toggleTheme}
          /> </Text>
          ,
          headerLeft: () =>  <Image source={img} style={{height:40,width:40,marginLeft:5,}} />,
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            headerRight: () => <ToggleSwitch
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
    <ThemeProvider >
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
