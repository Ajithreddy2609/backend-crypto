require('dotenv').config();

const config = {
  PORT: process.env.PORT || 8000,
  COINGECKO_BASE_URL: process.env.COINGECKO_BASE_URL || https://api.coingecko.com/api/v3,
  COINGECKO_API_KEY: process.env.COINGECKO_API_KEY || CG-S6ZKDfNSY8SQ9uUiN53sJyvG,
  COINBASE_WS_URL: wss://ws-feed.exchange.coinbase.com,
  CACHE_TTL: 120, // seconds
};

if (!config.COINGECKO_API_KEY) {
  console.error('FATAL ERROR: COINGECKO_API_KEY is not found in your .env file.');
  process.exit(1);
}

module.exports = config;

