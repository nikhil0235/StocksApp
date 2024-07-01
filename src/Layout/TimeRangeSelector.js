import React, { useState } from 'react'; // Import React and useState hook
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import components from react-native

// Define a functional component named TimeRangeSelector
export const TimeRangeSelector = ({ onSelect }) => {
  const [selectedRange, setSelectedRange] = useState('1D'); // Define state for the selected range and initialize it to '1D'
  const ranges = ['1D', '1W', '1M', '6M', '5Y', '10Y']; // Define the available time ranges

  const handlePress = (range) => {
    setSelectedRange(range); // Update the selected range state
    onSelect(range); // Call the onSelect callback with the selected range
  };

  return (
    <View style={styles.container}> 
      {ranges.map((range) => ( // Iterate over the ranges array to create a button for each range
        <TouchableOpacity
          key={range} // Set the key to the range value
          style={[
            styles.button,
            selectedRange === range && styles.selectedButton, // Apply selectedButton style if the range is selected
          ]}
          onPress={() => handlePress(range)} // Handle button press
        >
          <Text
            style={[
              styles.buttonText,
              selectedRange === range && styles.selectedButtonText, // Apply selectedButtonText style if the range is selected
            ]}
          >
            {range} // Display the range text
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 5,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginHorizontal: 2,
  },
  selectedButton: {
    backgroundColor: 'blue', // Style for the selected button
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  selectedButtonText: {
    color: '#fff', // Style for the selected button text
  },
});

export default TimeRangeSelector; // Export the component as default
