import { fetchTimeSeriesDaily, fetchTimeSeriesIntraday, fetchTimeSeriesMonthly, fetchYearData } from "../services/apiService";

export const ChartFilter = async (filter) => {
  let newData;
  
  // Find the latest date in the data
  const getLatestDate = (data) => {
    return new Date(Math.max(...data.map(item => new Date(item.date))));
  };

  // console.log("Filter:", filter);

  // Fetch data based on the filter
  switch (filter) {
    case '1D':
      newData = await fetchTimeSeriesIntraday();
      break;
    case '1W':
    case '1M':
    case '6M':
      newData = await fetchTimeSeriesDaily();
      break;
    case '5Y':
    case '10Y':
      newData = await fetchYearData();
      break;
    default:
      newData = await fetchYearData();
      break;
  }

  console.log("Data after fetch:", newData);

  if (!newData || newData.length === 0) {
    console.log("No data fetched");
    return [];
  }

  const latestDate = getLatestDate(newData);
  // console.log("Latest date in data:", latestDate);

  const filterData = (startDate) => {
    // console.log("Filtering from date:", startDate);
    const filtered = newData.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= latestDate;
    });
    // console.log("Filtered data:", filtered);
    return filtered;
  };

  // Apply time-based filtering
  switch (filter) {
    case '1D':
      const twentyFourHoursAgo = new Date(latestDate);
      twentyFourHoursAgo.setDate(latestDate.getDate() - 1);
      newData = filterData(twentyFourHoursAgo);
      break;
    case '1W':
      const sevenDaysAgo = new Date(latestDate);
      sevenDaysAgo.setDate(latestDate.getDate() - 7);
      newData = filterData(sevenDaysAgo);
      break;
    case '1M':
      const oneMonthAgo = new Date(latestDate);
      oneMonthAgo.setMonth(latestDate.getMonth() - 1);
      newData = filterData(oneMonthAgo);
      break;
    case '6M':
      const sixMonthsAgo = new Date(latestDate);
      sixMonthsAgo.setMonth(latestDate.getMonth() - 6);
      newData = filterData(sixMonthsAgo);
      break;
    case '5Y':
      const fiveYearsAgo = new Date(latestDate);
      fiveYearsAgo.setFullYear(latestDate.getFullYear() - 5);
      newData = filterData(fiveYearsAgo);
      break;
    case '10Y':
      const tenYearsAgo = new Date(latestDate);
      tenYearsAgo.setFullYear(latestDate.getFullYear() - 10);
      newData = filterData(tenYearsAgo);
      break;
    default:
      newData = [];
      break;
  }

  // console.log("Final data:", newData);
  return newData;
};