
# 🚀 Crypto Price Tracker

A Node.js application that tracks cryptocurrency prices using CoinGecko API and provides statistical analysis.

## 📋 Features

- 🔄 Auto-updates crypto prices every 2 hours
- 📊 Provides latest price statistics
- 📈 Calculates price standard deviation
- 🪙 Supports Bitcoin, Matic, and Ethereum

## 🛠️ Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios
- node-cron

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crypto_tracker
COINGECKO_API_URL=https://api.coingecko.com/api/v3
UPDATE_INTERVAL=2
```

4. Start the server:
```bash
npm start
```

## 📡 API Endpoints

### 1. Get Latest Stats

Returns the latest price, market cap, and 24-hour change for a specified cryptocurrency.

#### Request

```http
GET /stats?coin={coinId}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `coin` | `string` | One of: `bitcoin`, `matic-network`, `ethereum` |

#### Sample Requests

```http
GET http://localhost:5000/stats?coin=bitcoin
GET http://localhost:5000/stats?coin=matic-network
GET http://localhost:5000/stats?coin=ethereum
```

#### Sample Response
```json
{
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
}
```

### 2. Get Price Deviation

Returns the standard deviation of prices for the last 100 records of a specified cryptocurrency.

#### Request

```http
GET /deviation?coin={coinId}
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `coin` | `string` | One of: `bitcoin`, `matic-network`, `ethereum` |

#### Sample Requests

```http
GET http://localhost:5000/deviation?coin=bitcoin
GET http://localhost:5000/deviation?coin=matic-network
GET http://localhost:5000/deviation?coin=ethereum
```

#### Sample Response
```json
{
    "deviation": 4082.48
}
```

## 🧪 Testing the APIs

You can test the APIs using tools like Postman, cURL, or REST Client. Here's a sample test script for REST Client:

```http
### Test /stats API
GET http://localhost:5000/stats?coin=bitcoin
Content-Type: application/json

###
GET http://localhost:5000/stats?coin=matic-network
Content-Type: application/json

###
GET http://localhost:5000/stats?coin=ethereum
Content-Type: application/json

### Test /deviation API
GET http://localhost:5000/deviation?coin=bitcoin
Content-Type: application/json

###
GET http://localhost:5000/deviation?coin=matic-network
Content-Type: application/json

###
GET http://localhost:5000/deviation?coin=ethereum
Content-Type: application/json
```

## 📊 Database Schema

```javascript
{
    coinId: String,          // Cryptocurrency identifier
    price: Number,           // Current price in USD
    marketCap: Number,       // Market capitalization in USD
    priceChange24h: Number,  // 24-hour price change percentage
    timestamp: Date          // Time of data collection 
}
```

## ⚙️ Configuration

The application can be configured using the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/crypto_tracker |
| `UPDATE_INTERVAL` | Data update interval (hours) | 2 |

## 🔍 Error Handling

The API returns the following error responses:

- `400 Bad Request`: Invalid coin parameter
- `404 Not Found`: No data found for the specified coin
- `500 Internal Server Error`: Server-side errors
