# 🧠 Backend Server: Crypto Indices API & Cache

This **Node.js/Express** server acts as the secure and intelligent backend for the **Crypto Indices Web App**.

---

### 🌐 Live Links

- **Live API Endpoint:** [YOUR_RENDER_DEPLOYMENT_URL_HERE]  
- **Frontend Repository:** [YOUR_GITHUB_URL_FOR_CRYPTO-FRONTEND_HERE]

---

## 🧩 Primary Responsibilities

- **API Key Security:** Hides the external API key from the frontend client.  
- **Caching & Rate Limiting:** Implements a 120-second on-demand cache to respect strict rate limits.  
- **Real-Time Data:** Streams live data to the client using WebSockets.

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|-----------|-------------|----------|
| **Server** | Node.js | JavaScript runtime environment for the server |
| **Framework** | Express.js | For building REST API endpoints and routing |
| **Caching** | node-cache | In-memory TTL (Time-to-Live) cache to manage API calls |
| **Real-Time Communication** | Socket.io | Real-time, bi-directional WebSocket data streaming |
| **Security** | dotenv | Manages secret API keys, keeping them out of version control |
| **API Client** | Axios | Makes promise-based HTTP requests to the external API |
| **Middleware** | CORS | Enables cross-origin requests from the frontend |

---

## 🚀 Environment Setup & Installation

Follow these steps to set up and run the backend server locally.

### 1. Navigate to the project directory
```bash
cd /path-to-project/backend
. Install dependencies
npm install
Create the Environment File (.env)

Create a .env file inside the /backend directory and add your API key:

# .env
# This key is kept secure on the server and never exposed to the client
EXTERNAL_CRYPTO_API_KEY="your_api_key_goes_here"

. Run the Server
node server.js

🔌 API Endpoints
REST API
GET /api/indicators

Description: Fetches the main list of crypto indices/indicators.

Logic: Uses a 120-second on-demand caching strategy.

GET /api/indicators/detail/:id

Description: Fetches 30-day historical data for a specific indicator.

Logic: Each detail request has its own on-demand cache.

WebSocket Events
A single WebSocket connection broadcasts simulated live crypto prices every few seconds —
demonstrating real-time updates to connected clients.
| Event         | Direction       | Description                                                                     |
| ------------- | --------------- | ------------------------------------------------------------------------------- |
| `connection`  | Client → Server | When a client connects, the server registers them for live data.                |
| `stream-data` | Server → Client | Emitted periodically (e.g., every 5 seconds) with simulated live price updates. |


🏛️ Solution Architecture & Request Flow

The system follows a decoupled client-server architecture:

Frontend: Handles UI and presentation only.

Backend: Manages API calls, caching, security, and real-time data streaming.



⚙️ Caching & Rate Limits

Cache TTL: 120 seconds

Rate Limits: 20 requests/minute, 500/month

Each cache entry minimizes unnecessary external API calls.



⚙️ Caching & Rate Limits

Cache TTL: 120 seconds

Rate Limits: 20 requests/minute, 500/month

Each cache entry minimizes unnecessary external API calls.


