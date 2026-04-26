🚀 TradeFlow – Zerodha-Style Trading Platform (Custom Engine)

🔗 Live Demo: https://trading-platform-frontend-tau.vercel.app/

A full-stack real-time stock trading simulation platform inspired by Zerodha, built with a custom stock engine (no external APIs), real-time updates via WebSockets, and an AI-powered trading assistant.

📌 Overview

TradeFlow simulates a real-world trading environment where users can:

Buy/Sell stocks virtually
Track portfolio & PnL in real-time
View holdings, positions, and orders
Interact with an AI trading assistant

Unlike typical projects, this platform uses a self-built stock engine instead of relying on external APIs.

✨ Key Features
📈 Real-Time Trading Engine
Custom stock price simulator (no external APIs)
WebSocket-based live price updates every 5 seconds
Multi-client real-time synchronization
💼 Portfolio Management
Holdings & Positions tracking
Real-time PnL calculations
Order history with BUY/SELL logic
Funds & margin management
🔐 Authentication System
JWT-based authentication (secure cookies)
Login / Signup / Logout flow
Protected routes middleware
🤖 AI Trading Assistant
Integrated Gemini 2.5 Flash API
Natural language queries
Market insights & decision support
📊 Dashboard (Zerodha-inspired UI)
Watchlist
Portfolio charts (Recharts)
Order window & trading panel
Clean Material UI design
🧠 Tech Stack
Frontend
React.js (Vite)
Material UI
Recharts
Backend
Node.js
Express.js
MongoDB (Mongoose)
WebSockets (ws)
AI Integration
Google Gemini API (@google/genai)
Authentication
JWT + Cookies
🏗️ Project Structure
ZERODHA-FULL_STACK/
│
├── Backend/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── init/
│   └── server.js
│
├── Dashboard/Dashboards/
│   └── (Main Trading UI)
│
├── frontend/
│   └── (Landing Pages)
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone <your-repo-link>
cd ZERODHA-FULL_STACK
2️⃣ Install Dependencies (IMPORTANT)

Run in all folders:

cd Backend && npm install
cd ../frontend && npm install
cd ../Dashboard/Dashboards && npm install
3️⃣ Environment Variables

Create .env file inside Backend/

⚠️ Example variables (DO NOT expose real secrets publicly):

MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_api_key
CLIENT_URL=http://localhost:5173

Your current file includes sensitive credentials → you must rotate them immediately if this repo is public

4️⃣ Run the Project
Backend
cd Backend
npm start
Dashboard (Main Trading App)
cd Dashboard/Dashboards
npm run dev
Frontend (Landing Page)
cd frontend
npm run dev
🔌 API Highlights
Auth Routes
POST /signup
POST /login
POST /logout
GET /auth/me
Trading Routes (Protected)
GET /holdings
GET /orders
POST /orders
⚡ Real-Time System
WebSocket server broadcasts stock updates
Custom logic simulates price fluctuations
Clients auto-update UI without refresh
🤖 AI Assistant
Uses Gemini API for:
Market explanations
Trade suggestions
Context-based responses
🚀 What Makes This Project Stand Out
❌ No external stock APIs
✅ Fully custom trading engine
✅ Real-time WebSocket architecture
✅ AI + Full Stack integration
✅ Production deployment
📌 Future Improvements
Add real market data integration (optional mode)
Advanced charting (candlestick)
Order types (limit, stop-loss)
Scalability with Redis/WebSocket clusters
👨‍💻 Author

Tanishq Jaiswal
Final Year B.Tech CSE
Aspiring Full Stack + AI Engineer

⭐ If you like this project

Give it a ⭐ on GitHub and share feedback!

🔥 (Important Fix You Should Do Now)

Your .env file is exposed with:

MongoDB credentials
JWT secret
Gemini API key

👉 This is a serious security risk.
You should:

Revoke these keys immediately
Add .env to .gitignore (already done )
Push a clean commit
