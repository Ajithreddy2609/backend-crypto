const { WebSocketServer } = require('ws');
const WebSocket = require('ws');

let wss = null;

function initializeWebSocketServer(server) {
  wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('✅ Frontend connected to our WebSocket');
    ws.on('error', console.error);
    ws.on('close', () => {
      console.log('❌ Frontend disconnected');
    });
  });

  return wss;
}

function broadcast(data) {
  if (!wss) return;
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function getWebSocketServer() {
  return wss;
}

module.exports = {
  initializeWebSocketServer,
  broadcast,
  getWebSocketServer,
};

