const express = require('express');
const axios = require('axios');
const cache = require('../utils/cache');
const config = require('../utils/config');

const router = express.Router();

router.get('/list', async (req, res) => {
  const cacheKey = 'coinList';
  try {
    if (cache.has(cacheKey)) {
      console.log('✅ Serving list from cache...');
      return res.status(200).json(cache.get(cacheKey));
    }
    console.log('🔄 Fetching new list from CoinGecko (with API Key)...');
    const url = `${config.COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=${config.COINGECKO_API_KEY}`;
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/detail/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `coinDetail_${id}`;
  try {
    if (cache.has(cacheKey)) {
      console.log(`✅ Serving ${id} detail from cache...`);
      return res.status(200).json(cache.get(cacheKey));
    }
    console.log(`🔄 Fetching new 30-day detail for ${id} (with API Key)...`);
    const url = `${config.COINGECKO_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily&x_cg_demo_api_key=${config.COINGECKO_API_KEY}`;
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error fetching detail for ${id}:`, error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

