StocksApp
StocksApp is an Android application for a stocks and ETFs broking platform. It provides users with information about top gainers and losers in the market, as well as detailed information about individual stocks and ETFs.
Features

Explore Screen: Displays Top Gainers and Losers in separate tabs

Grid layout of cards showing stock/ETF information


Product Screen: Shows detailed information about a specific stock/ETF

Basic information display
Line graph and Candlestick Graph of price history
![Sample_Video_StockApp](https://github.com/nikhil0235/StocksApp/assets/109364387/d9f76d0a-af84-4293-b45a-e9477316500b)
![4](https://github.com/nikhil0235/StocksApp/assets/109364387/674c493d-7f7c-472d-8ef1-3a48d62c12cd)
![3](https://github.com/nikhil0235/StocksApp/assets/109364387/d1c18ce7-1a39-4df8-b154-39eb0b729db9)
![2](https://github.com/nikhil0235/StocksApp/assets/109364387/0a7b27c1-e43f-43b5-8d1e-ca4d70d3dd9b)
![1](https://github.com/nikhil0235/StocksApp/assets/109364387/1597d996-250b-4417-991a-f567163158ca)
![6](https://github.com/nikhil0235/StocksApp/assets/109364387/7fb5fe9f-471d-46f9-a3f1-4071361f2333)
![5](https://github.com/nikhil0235/StocksApp/assets/109364387/57ab7360-3089-4046-b0eb-055f485a0bac)
![7](https://github.com/nikhil0235/StocksApp/assets/109364387/ea7a76bc-97b7-41fc-9f33-9b369c391e5c)



Technology Stack

React Native
Alpha Vantage API for market data

Getting Started
Prerequisites

Node.js
npm or Yarn
React Native CLI
Android Studio (for Android development)

Installation

Clone the repository:
git clone https://github.com/yourusername/StocksApp.git

Navigate to the project directory:
cd StocksApp

Install dependencies:
npm install
or
yarn install

Create a .env file in the root directory and add your Alpha Vantage API key:
ALPHA_VANTAGE_API_KEY=your_api_key_here

Start the Metro bundler:
npx react-native start

Run the app on Android:
npx react-native run-android


API Integration
The app uses the following Alpha Vantage API endpoints:

Alpha Intelligence - Top Gainers and Losers
Fundamental Data - Company Overview
Core Stocks API - Ticker Search

Features Implemented

 Explore Screen with Top Gainers and Losers
 Product Screen with basic information and price graph
 Loading/Error/Empty state handling
 API response caching with expiration
 Responsive UI design

Future Enhancements (Brownie Points)

 Dynamic theme switching (Light/Dark mode)
 Recent searches suggestions
 Search categorization (All, Stocks, ETFs)
 Network and asset optimizations
 Additional Alpha Vantage API integrations

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
Acknowledgments

Alpha Vantage for providing the market data API
React Native Community for the excellent mobile app framework
