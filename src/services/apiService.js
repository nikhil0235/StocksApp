
// alphavantage.js

const transformData = (data) => {
   return Object.entries(data).map(([date, values]) => ({
     date,
     value: parseFloat(values['4. close']).toFixed(3)
   }));
 };

async function fetchTimeSeriesIntraday() {
    try {
        let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`);
        let data = await response.json();
         data = (data["Time Series (5min)"])
          return transformData(data)
          
        } catch (error) {
        console.error('Error fetching intraday data:', error);
        return [];
    }
  }
  
  async function fetchTimeSeriesDaily() {
    try {
        let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`);
        let data = await response.json();
        
     data = (data["Time Series (Daily)"])
          return transformData(data) } catch (error) {
        console.error('Error fetching daily data:', error);
        return [];
    }
  }
  
  async function fetchTimeSeriesMonthly() {
    try {
        let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo`);
        let data = await response.json();
        data = (data["Monthly Time Series"])
        return transformData(data)} catch (error) {
        console.error('Error fetching monthly data:', error);
        return [];
    }
  }
  
  async function fetchYearData() {
    try {
        let response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo`);
        let data = await response.json();
        data = (data["Weekly Time Series"])
        return transformData(data)
    } catch (error) {
        console.error('Error fetching weekly data:', error);
        return [];
    }
  }
  
  export { fetchTimeSeriesIntraday, fetchTimeSeriesDaily, fetchTimeSeriesMonthly, fetchYearData };
  