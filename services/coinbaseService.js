const WebSocket = require('ws');
const { broadcast } = require('./websocketService');
const config = require('../utils/config');

function connectToCoinbase() {
  const ws = new WebSocket(config.COINBASE_WS_URL);

  ws.on('open', () => {
    console.log('🛰️  Backend connected to Coinbase WebSocket');
    ws.send(JSON.stringify({
      type: 'subscribe',
      product_ids: ['BTC-USD'],
      channels: ['ticker']
    }));
  });

  ws.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'ticker' && message.price) {
      broadcast({
        type: 'LIVE_PRICE',
        id: 'bitcoin',
        price: message.price
      });
    }
  });

  ws.on('close', () => {
    console.log('Coinbase connection closed. Reconnecting in 5s...');
    setTimeout(connectToCoinbase, 5000);
  });

  ws.on('error', (err) => {
    console.error('Coinbase WebSocket error:', err);
  });
}

module.exports = {
  connectToCoinbase,
};

