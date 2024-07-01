import React, { useContext } from 'react'; // Import React and useContext hook
import { TouchableOpacity, Text, StyleSheet } from 'react-native'; // Import components from react-native
import { ThemeContext } from '../../ThemeContext'; // Import ThemeContext from a relative path

// Define a functional component named ThemeToggleButton
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext to get current theme and toggleTheme function

  return (
    <TouchableOpacity
      style={[
        styles.button,
        theme === 'light' ? styles.lightButton : styles.darkButton, // Apply styles based on the current theme
      ]}
      onPress={toggleTheme} // Toggle theme on button press
    >
      <Text style={ theme === 'light' ? styles.light_text: styles.dark_text}> 
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'} // Change text based on the current theme
      </Text>
    </TouchableOpacity>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
    margin: 5,
  },
  lightButton: {
    backgroundColor: 'orange', // Style for light mode button
  },
  darkButton: {
    backgroundColor: 'grey', // Style for dark mode button
  },
  light_text: {
    color: 'black',
    fontWeight: '800',
  },
  dark_text: {
    color: 'white',
    fontWeight: '800',
  },
});

export default ThemeToggleButton; // Export the component as default
