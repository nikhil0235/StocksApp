import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '../../ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        theme === 'light' ? styles.lightButton : styles.darkButton,
      ]}
      onPress={toggleTheme}
    >
      <Text style={ theme ==='light' ? styles.light_text: styles.dark_text}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 4,
    margin:5,

  },
  lightButton: {
    backgroundColor: 'orange' 
  },
  darkButton: {
    backgroundColor: 'grey', 
  },
  light_text: {
    color: 'black',
    fontWeight:'800',
  },
  dark_text: {
    color: 'white',
    fontWeight:'800',
  },
});

export default ThemeToggleButton;
