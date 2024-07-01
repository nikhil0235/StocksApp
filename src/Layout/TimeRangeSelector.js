import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const TimeRangeSelector = ({ onSelect }) => {
  const [selectedRange, setSelectedRange] = useState('1D');
  const ranges = ['1D', '1W', '1M', '6M', '5Y', '10Y'];

  const handlePress = (range) => {
    setSelectedRange(range);
    onSelect(range);
  };

  return (
    <View style={styles.container}>
      {ranges.map((range) => (
        <TouchableOpacity
          key={range}
          style={[
            styles.button,
            selectedRange === range && styles.selectedButton,
          ]}
          onPress={() => handlePress(range)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedRange === range && styles.selectedButtonText,
            ]}
          >
            {range}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
    backgroundColor: 'blue',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default TimeRangeSelector;
