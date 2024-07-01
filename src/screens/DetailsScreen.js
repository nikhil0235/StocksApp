import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import chartData from '../utils/tempChartData.json';
import { ThemeContext } from '../../ThemeContext';
import TimeRangeSelector from '../Layout/TimeRangeSelector';
import TickerSearch from '../Layout/SearchBar';
import { ChartFilter } from '../utils/chartFilter';
import { TouchableOpacity } from 'react-native-gesture-handler';
import picture from '../../assets/stock-market.png'
import { Chart } from '../Layout/CandleGrpah';


export function DetailsScreen() {
  const[data,setData] = useState([]);
  const[candleChart,setCandleChart]  =useState(false);
  const [companyData, setCompanyData] = useState(null);
  const route = useRoute() ;
  const { ticker ,img} = route.params;
 
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);
  
  const handleRangeSelect = async(range) => {
   const res =  await ChartFilter(range);
   setData(res);

  };

  useEffect(()=>{
   handleRangeSelect('1D');
  },[])

  useEffect(() => {
    async function fetchData() {
      try {
        const apiKey = 'EX02PYVJKEHGVVZA';
        // const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${apiKey}`;
        const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${ticker}`);
        }

        const data = await response.json();
        setCompanyData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [ticker]);

//  
  if (!companyData || data.length ===0 ) {
    
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator   size="large" color={theme === 'dark' ? '#fff' : '#0000ff'} />
        </View>
      );
    } 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Details Screen</Text>
       <TickerSearch/>
      </View>
      <View style={styles.companyHeader}>
        <Image 
          source={{ uri: img }} 
          style={styles.companyLogo} 
        />
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyData.Name}</Text>
          <Text style={styles.companyTicker}>{companyData.Symbol}</Text>
          <Text style={styles.companyPrice}>${companyData.MarketCapitalization}</Text>
          <Text style={styles.priceChange}>+0.41%</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
    { 
  candleChart?<Chart/>:data.length>0 && 
<LineChart
  data={{
    labels: data.filter((_, index) => index % 20 === 0).map(item => item.date.slice(20)),
    datasets: [{ data: data.map(item => item.value) }],
  }}
  width={Dimensions.get('window').width - 32}
  height={220}
  yAxisLabel="$"
  chartConfig={{
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: ".5", strokeWidth: "1", stroke: "#0000ff" },
    propsForBackgroundLines: {
      strokeDasharray: "", // solid background lines
    },
    fillShadowGradient: "#ffffff",
    fillShadowGradientOpacity: 0,
    propsForLabels: {
      transform: [{ rotate: '45deg' }],
      anchor: 'middle',
      alignmentBaseline: 'middle',
      // Make the x-axis labels transparent
      color: 'transparent',
    },
  }}
  bezier
  style={{ marginVertical: 8, borderRadius: 16 }}
/>}

<View style={{ marginLeft: 30, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
      <TimeRangeSelector onSelect={handleRangeSelect} />
      <TouchableOpacity 
        onPress={() => {
          setCandleChart(!candleChart);
        }}
        style={{ borderRadius:10, padding:5, backgroundColor: candleChart ? 'black' : '#ffffff' }}
      >
        <Image source={picture} style={{ width: 30, height: 30 }} />
      </TouchableOpacity>
    </View>
      </View>
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About {companyData.Name}</Text>
        <Text style={styles.description}>{companyData.Description}</Text>
        <View style={styles.sectorIndustry}>
          <View style={styles.info_}><Text style={styles.infoTitle}>Industry:</Text>
          <Text style={styles.infoValue}>{companyData.Industry}</Text></View>
          <View style={styles.info_}>
          <Text style={styles.infoTitle}>Sector:</Text>
          <Text style={styles.infoValue}>{companyData.Sector}</Text></View>
        </View>
        <View style={styles.weekLowHigh}>
      <View style={styles.info_}>
        <Text style={styles.infoTitle}>52 Week Low</Text>
        <Text style={styles.infoValue}>{companyData['52WeekLow']}</Text>
      </View>
      <View style={styles.info_}>
        <Text style={styles.infoTitle}>52 Week High</Text>
        <Text style={styles.infoValue}>{companyData['52WeekHigh']}</Text>
      </View>
    </View>
        <View style={styles.marketData}>
          <View style={styles.info_}>
            <Text style={styles.dataTitle}>Market Cap</Text>
            <Text style={styles.dataValue}>{companyData.MarketCapitalization === "None" ? "N/A" : companyData.MarketCapitalization}</Text>
          </View>
          <View style={styles.info_}>
            <Text style={styles.dataTitle}>P/E Ratio</Text>
            <Text style={styles.dataValue}>{companyData.PERatio === "None" ? "N/A" : companyData.PERatio}</Text>
          </View>
          <View style={styles.info_}>
            <Text style={styles.dataTitle}>Beta</Text>
            <Text style={styles.dataValue}>{companyData.Beta === "None" ? "N/A" : companyData.Beta}</Text>
          </View>
          <View style={styles.info_}>
            <Text style={styles.dataTitle}>Dividend Yield</Text>
            <Text style={styles.dataValue}>{companyData.DividendYield === "None" ? "N/A" : companyData.DividendYield}</Text>
          </View>
          <View style={styles.info_}>
            <Text style={styles.dataTitle}>Profit Margin</Text>
            <Text style={styles.dataValue}>{companyData.ProfitMargin === "None" ? "N/A" : companyData.ProfitMargin}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const getStyles = (theme) => StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#333' : 'white',
    padding: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: theme === 'dark' ? '#fff' : '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : 'black',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: theme === 'dark' ? '#555' : '#ccc',
    borderRadius: 8,
    padding: 8,
    width: '40%',
    color: theme === 'dark' ? '#fff' : '#000',
  },
  companyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyLogo: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : 'black',
  },
  companyTicker: {
    fontSize: 14,
    color: theme === 'dark' ? '#ccc' : '#888',
  },
  companyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#0f0' : '#0a0',
  },
  priceChange: {
    fontSize: 14,
    color: theme === 'dark' ? '#0f0' : '#0a0',
  },
  chartContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  aboutSection: {
    borderWidth: 2,
    borderColor: theme === 'dark' ? '#555' : '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom:10,
  },
  sectionTitle: {
    fontSize: 18,
    borderBottomWidth:1,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#fff' : 'black',
    marginBottom: 8,
  },
  info_:{
    width:'45%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    margin:2,
    marginVertical:5,
    },
  description: {
    
    color: theme === 'dark' ? '#ddd' : 'black',
    marginBottom: 16,
  },
  sectorIndustry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: '600',
    color: theme === 'dark' ? '#fff' : 'black',
  },
  infoValue: {
    fontSize: 12,
    color: theme === 'dark' ? '#ddd' : 'black',
  },
  weekLowHigh: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  marketData: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dataItem: {
    width: '48%',
    marginBottom: 8,
  },
  dataTitle: {
    fontWeight: '600',
    color: theme === 'dark' ? '#fff' : 'black',
  },
  dataValue: {
    color: theme === 'dark' ? '#ddd' : 'black',
  },
});

export default DetailsScreen;
