import { CandlestickChart } from 'react-native-wagmi-charts';
import { getIntraDay, getWeeklyStock } from './services';
import { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { formattedData } from '../utils/utility';



export function Chart() {
    const [data, setData] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const rawData = await formattedData();
      setData(rawData);
    };
    fn();
  }, []);


    
  return (
    <CandlestickChart.Provider data={data}>
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