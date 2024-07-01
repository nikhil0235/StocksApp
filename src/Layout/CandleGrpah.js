
// Chart component

import { CandlestickChart } from 'react-native-wagmi-charts';
import { useEffect, useState } from 'react';
import { formattedData } from '../utils/utility'; // Ensure you have this utility
import { ActivityIndicator, View } from 'react-native';


export function Chart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      const rawData = await formattedData();
      setChartData(rawData);
    };
    fetchChartData();
  }, []);
  if(chartData.length ===0){
    return    <View style={{justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" color= '#0000ff' />
  </View>
  }

  return (
    <CandlestickChart.Provider data={chartData}>
  <CandlestickChart>
    <CandlestickChart.Candles />
    <CandlestickChart.Crosshair />
  </CandlestickChart>
  <CandlestickChart.PriceText type="open" />
  <CandlestickChart.PriceText type="high" />
  <CandlestickChart.PriceText type="low" />
  <CandlestickChart.PriceText type="close" />
  <CandlestickChart.DatetimeText />
</CandlestickChart.Provider>

  );
}
