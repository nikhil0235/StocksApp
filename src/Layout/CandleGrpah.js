// Chart component

import { CandlestickChart } from 'react-native-wagmi-charts';
import { useEffect, useState } from 'react';
import { formattedData } from '../utils/utility'; // Utility function to format data
import { ActivityIndicator, View } from 'react-native';

export function Chart() {
  // State to hold the chart data
  const [chartData, setChartData] = useState([]);

  // Effect to fetch and set chart data when component mounts
  useEffect(() => {
    const fetchChartData = async () => {
      const rawData = await formattedData();
      setChartData(rawData);
    };
    fetchChartData();
  }, []);

  // Show loading indicator while data is being fetched
  if (chartData.length === 0) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color='#0000ff' />
      </View>
    );
  }

  // Render the CandlestickChart when data is available
  return (
    <CandlestickChart.Provider data={chartData}>
      <CandlestickChart>
        {/* Render the candlesticks */}
        <CandlestickChart.Candles />
        {/* Add a crosshair for better data reading */}
        <CandlestickChart.Crosshair />
      </CandlestickChart>
      {/* Display various price texts */}
      <CandlestickChart.PriceText type="open" />
      <CandlestickChart.PriceText type="high" />
      <CandlestickChart.PriceText type="low" />
      <CandlestickChart.PriceText type="close" />
      {/* Display the date/time */}
      <CandlestickChart.DatetimeText />
    </CandlestickChart.Provider>
  );
}