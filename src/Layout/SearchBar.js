import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const navigation = useNavigation();


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

  const handleOnClick = (ticker) => {
    navigation.navigate('StockDetails', { ticker });
    setSearchResults([]);
    setSearchTerm('');
    setIsShow(false);
  };

  const handleCategoryClick = (category) => {
    // Implement category filtering logic if needed
    console.log(`Category clicked: ${category}`);
  };

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

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#e5e5e5',
    padding: 8,
    borderRadius: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  resultsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    maxHeight: 240,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  categoryAll: {
    backgroundColor: '#737373',
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 8,
  },
  category: {
    backgroundColor: '#a3a3a3',
    padding: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
  },
  noResultsText: {
    padding: 4,
    color: '#999',
    textAlign: 'center',
  },
  resultItem: {
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
});

export default SearchBar;
