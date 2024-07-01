import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  // State for managing search term, results, and visibility
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const navigation = useNavigation();

  // Handle changes in the search input
  const handleChange = (value) => {
    setSearchTerm(value);
    if (value) {
      fetchStockSymbols(value);
      setIsShow(true);
    } else {
      setSearchResults([]);
      setIsShow(false);
    }
  };

  // Fetch stock symbols based on search term
  const fetchStockSymbols = async (keywords) => {
    try {
      const apiKey = 'EX02PYVJKEHGVVZA';
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.bestMatches || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching stock symbols:', error);
    }
  };

  // Handle click on a search result
  const handleOnClick = (ticker) => {
    navigation.navigate('StockDetails', { ticker });
    setSearchResults([]);
    setSearchTerm('');
    setIsShow(false);
  };

  // Handle click on a category (placeholder function)
  const handleCategoryClick = (category) => {
    // Implement category filtering logic if needed
    console.log(`Category clicked: ${category}`);
  };

  // Render individual search result item
  const renderResultItem = ({ item }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleOnClick(item['1. symbol'])}
    >
      <Text>{item['2. name']}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search input field */}
      <TextInput
        style={styles.input}
        placeholder="Search stock symbols"
        value={searchTerm}
        onChangeText={handleChange}
        placeholderTextColor="#999"
        onFocus={() => setIsShow(true)}
      />
      {isShow && (
        <View style={styles.resultsContainer}>
          {/* Category filters */}
          <View style={styles.categoriesContainer}>
            <TouchableOpacity onPress={() => handleCategoryClick('All')}>
              <View style={styles.categoryAll}>
                <Text style={styles.categoryText}>All</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryClick('Stocks')}>
              <View style={styles.category}>
                <Text style={styles.categoryText}>Stocks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCategoryClick('ETFs')}>
              <View style={styles.category}>
                <Text style={styles.categoryText}>ETFs</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Search results list */}
          {searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item['1. symbol']}
              renderItem={renderResultItem}
            />
          ) : (
            <Text style={styles.noResultsText}>No results found</Text>
          )}
        </View>
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  // ... (styles remain unchanged)
});

export default SearchBar;