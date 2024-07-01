import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { ThemeContext } from '../../ThemeContext';
import { Logo } from '../../assets/Logo';


const TopGainersScreen = ({ navigation }) => {
  const [topGainers, setTopGainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo');
      const data = await response.json();

      if (response.ok) {
        setTopGainers(data.top_gainers);
        console.log(topGainers)
      } else {
        console.error('Failed to fetch data:', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme === 'dark' ? '#ffffff' : '#0000ff'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        data={topGainers}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { ticker: item.ticker ,img : Logo[index % Logo.length] })}>
            <View style={styles.itemContainer}>
              <Image 
                source={{ uri: Logo[index % Logo.length] }} 
                style={styles.itemImage} 
              />
              <Text style={styles.itemText}>{item.ticker}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <Text style={styles.itemChange}>▲{item.change_percentage}</Text>
              <Text style={styles.itemText}>Volume: {item.volume}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
  const itemWidth = (width - 80) / 2; 

const getStyles = (theme) =>
   (
  {
  
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
    backgroundColor: '#9CA3AF', // Equivalent to bg-gray-400
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
     width: itemWidth,
      height: itemWidth * 1.2, // Adjust the height to width ratio as needed
    backgroundColor: theme === 'dark' ? '#444' : '#f9f9f9',
    borderWidth: 1,
    borderColor: theme === 'dark' ? '#555' : '#ddd',
  },
  itemImage: {
    width: 50,
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
    color: theme === 'dark' ? 'green' : 'light-green',
    marginTop: 5,
  },
});

export default TopGainersScreen;
