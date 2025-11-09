

🧠 Backend Server: Crypto Indices API & Cache
This Node.js/Express server acts as the secure and intelligent backend for the Crypto Indices Web App.

🌐 **Live Demo:**
Live Demo (Backend): https://backend-crypto-seven.vercel.app/
Frontend Repository: (https://github.com/Ajithreddy2609/frontend-crypto)
---

### ✨ Features

* **Index List:** Browse a full list of key crypto indices.
* **30-Day Detail View:** Click any index to see a 30-day historical chart and data.
* **Real-Time Updates:** A live-feed component (powered by WebSockets) streams simulated price changes.
* **Responsive Design:** Fully usable on both desktop and mobile devices.

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
cd /path-to-project/backend

### 2. Install dependencies
npm install

### 3. Create the Environment File (.env)
Create a .env file inside the /backend directory and add your API key:
.env
This key is kept secure on the server and never exposed to the client
EXTERNAL_CRYPTO_API_KEY="your_api_key_goes_here"

### 4.Run the Server
node server.js

----

*** 🏛️ Caching & Rate Limit Strategy

This project's core challenge is to respect the strict external API limits (20 req/min, 500 calls/month) while providing a responsive user experience.

Strategy: The server uses an on-demand, in-memory cache (node-cache) with a 120-second (2-minute) Time-to-Live (TTL) for all external API requests.

Flow: When the server receives a request (e.g., GET /api/indicators), it first checks for a valid, non-expired cache entry.

Cache Hit: If data exists, it is served instantly. No external API call is made.

Cache Miss: If no data exists (or it's older than 120 seconds), the server makes one call to the external API. The response is then stored in the cache and sent to the client.

Compliance: This 120-second cache ensures that our server calls the external API at most once every 2 minutes per endpoint. This is an effective rate of 0.5 requests/minute, which is safely far below the 20 req/min limit and protects the 500/month quota.

---

🔌 API Endpoints
REST API
GET /api/indicators
Description: Fetches the main list of crypto indices/indicators.
Logic: Uses a 120-second on-demand caching strategy.

GET /api/indicators/detail/:id
Description: Fetches 30-day historical data for a specific indicator.
Logic: Each detail request has its own on-demand cache.

------
*** WebSocket Events

A single WebSocket connection broadcasts simulated live crypto prices every few seconds —
demonstrating real-time updates to connected clients.

| Event         | Direction       | Description                                                                     |
| ------------- | --------------- | ------------------------------------------------------------------------------- |
| `connection`  | Client → Server | When a client connects, the server registers them for live data.                |
| `stream-data` | Server → Client | Emitted periodically (e.g., every 5 seconds) with simulated live price updates. |

-----

🏛️ Solution Architecture & Request Flow

The system follows a decoupled client-server architecture:
Frontend: Handles UI and presentation only.
Backend: Manages API calls, caching, security, and real-time data streaming.



🔴 Live Demo: https://frontend-crypto-sandy.vercel.app/

👤 Author: Ajith P
