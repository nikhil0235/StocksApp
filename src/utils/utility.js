import chartData from '../utils/tempChartData.json'

export const formattedData = async() => {
    const sampleDataDates = [];
    
    if (!chartData['Time Series (5min)']) {
      return sampleDataDates;
    }
  
    Object.entries(chartData['Time Series (5min)']).forEach(([date, values]) => {
      sampleDataDates.push({
        timestamp: Date.parse(date),
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close'])
      });
    });
  
    // Sort the data by date, oldest first
    sampleDataDates.sort((a, b) => a.x - b.x);
    console.log(sampleDataDates)
   
    return sampleDataDates;
  };