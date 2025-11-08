// --- 1. Import Tools ---
const express = require('express');
const http = require('http');
const cors = require('cors');

// --- 2. Import Config and Services ---
const config = require('./utils/config');
const coinRoutes = require('./routes/coinRoutes');
const { initializeWebSocketServer } = require('./services/websocketService');
const { connectToCoinbase } = require('./services/coinbaseService');
const apiRateLimiter = require('./middleware/rateLimiter');
const monthlyLimit = require('./middleware/monthlyLimit')
// --- 3. Initialize Express App ---
const app = express();
app.use(cors());

// --- 4. Setup Routes with Rate Limiting ---
app.use('/api', apiRateLimiter, coinRoutes);
app.get('/', (req, res) => {
  res.send("Hello world");
});

// --- 5. Create the HTTP Server ---
const server = http.createServer(app);

// --- 6. Initialize WebSocket Server ---
initializeWebSocketServer(server);

// --- 7. Start Everything ---
server.listen(config.PORT, () => {
  console.log(`✅ FINAL Backend server (HTTP & WebSocket) is running at http://localhost:${config.PORT}`);
  connectToCoinbase();
});
