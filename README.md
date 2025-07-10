# MetriQ API

The backend server for **MetriQ**, a performance benchmarking platform that analyzes and compares website metrics using Google PageSpeed Insights and AI-powered summaries. Built with **Node.js**, **Express**, and **MongoDB**.

## 🧠 Stack

- Node.js + Express (server)
- MongoDB (database)
- Axios (API requests)
- OpenRouter / DeepSeek (AI summaries)
- Google PageSpeed Insights API (site audits)
- Deployed on Render / Vercel (or your preferred backend host)

---

## 📁 Project Structure

```
/backend
│
├── controllers/
│   ├── reportController.js      # PageSpeed data handling
│   ├── summaryController.js     # AI summaries (DeepSeek)
│   └── userThemeController.js   # Dark/light theme API
│
├── models/
│   └── Report.js                # MongoDB schema
│
├── routes/
│   ├── reportRoutes.js
│   ├── summaryRoutes.js
│   └── userThemeRoutes.js
│
├── utils/
│   └── fetchPageSpeedData.js    # Utility for PSI fetch/format
│
├── .env                         # API keys, Mongo URI
├── server.js                    # Entry point
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/metricmind-api.git
cd metricmind-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_API_KEY=your_pagespeed_api_key
OPENROUTER_API_KEY=your_openrouter_key
```

### 4. Run the server

```bash
npm run dev
```

The API will be running at `http://localhost:5000`.

---

## 🧪 API Endpoints

### 🔍 PageSpeed Reports

- **POST** `/api/reports`
  - Body: `{ url: "https://example.com" }`
  - Description: Fetches PageSpeed data (mobile + desktop), saves to DB.

- **GET** `/api/reports/:url`
  - Description: Fetches last 5 reports for a given URL.

---

### 🤖 AI Summaries (DeepSeek via OpenRouter)

- **POST** `/api/summary`
  - Body: `{ reports: [ ... ] }`
  - Description: Returns a generated summary (not saved to DB).

---

### 🎨 User Theme

- **GET** `/api/user/theme`
- **PATCH** `/api/user/theme` with `{ theme: "dark" | "light" }`

---

## 🧰 Dev Scripts

```bash
npm run dev      # Run with nodemon
npm start        # Run without nodemon
```

---

## ✅ Features

- Fetch and store PageSpeed Insights data for mobile and desktop
- Store up to 5 recent reports per URL
- Generate AI-powered summaries of report data via DeepSeek
- Compare multiple competitors anonymously
- Theme preference endpoints for frontend sync
- Well-structured modular Express setup

---

## 📌 Todo / In Progress

- [ ] Rate limiting or usage limits
- [ ] PDF report generation backend (optional: Puppeteer)
- [ ] Auth system (JWT/anonymous fallback)

---

## 💡 Notes

- The frontend (MERN) app is in a separate repo: [MetriQ](https://github.com/metricmind/zyntra)
- All data persists in MongoDB Atlas
- AI summaries are ephemeral and client-triggered only (not auto-generated/stored)

---

## 📄 License

MIT License. © Trey Kadenyi 2025.
