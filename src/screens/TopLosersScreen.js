import React, { useContext, useEffect, useState } from 'react'; // Import necessary hooks from React
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native'; // Import necessary components from react-native
import { ThemeContext } from '../../ThemeContext'; // Import ThemeContext for theming
import { Logo } from '../../assets/Logo'; // Import Logo images

const TopLosersScreen = ({ navigation }) => {
  // State for storing top losers data
  const [topLosers, setTopLosers] = useState([]);
  // State for managing loading state
  const [loading, setLoading] = useState(true);
  // Get the current theme from the ThemeContext
  const { theme } = useContext(ThemeContext);
  // Get styles based on the current theme
  const styles = getStyles(theme);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch top losers data from the API
      const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
      const data = await response.json();

      if (response.ok) {
        // Set the top losers data if the request was successful
        setTopLosers(data.top_losers);
      } else {
        console.error('Failed to fetch data:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };

  if (loading) {
    // Show loading indicator while data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#ffffff' : '#0000ff'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2} // Show items in two columns
        data={topLosers} // Data to be displayed
        keyExtractor={(item) => item.ticker} // Key for each item
        renderItem={({ item, index }) => (
          // Navigate to Details screen on item press
          <TouchableOpacity onPress={() => navigation.navigate('Details', { ticker: item.ticker, img: Logo[index % Logo.length] })}>
            <View style={styles.itemContainer}>
              <Image 
                source={{ uri: Logo[index % Logo.length] }} 
                style={styles.itemImage} 
              />
              <Text style={styles.itemText}>{item.ticker}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <Text style={styles.itemChange}>▼{item.change_percentage}</Text>
              <Text style={styles.itemText}>Volume: {item.volume}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Get the dimensions of the window
const { width } = Dimensions.get('window');
const itemWidth = (width - 80) / 2; // Calculate item width

const getStyles = (theme) => ({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme === 'dark' ? '#444' : '#f9f9f9',
    borderWidth: 1,
    borderColor: theme === 'dark' ? '#555' : '#ddd',
    width: itemWidth,
    height: itemWidth * 1.2, // Adjust the height to width ratio as needed
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 51,
    height: 50,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : '#000',
  },
  itemPrice: {
    fontSize: 16,
    color: theme === 'dark' ? 'white' : 'black',
    marginTop: 5,
  },
  itemChange: {
    fontSize: 14,
    color: theme === 'dark' ? 'red' : 'light-red',
    marginTop: 5,
  },
});

export default TopLosersScreen; // Export TopLosersScreen component as default
2322323