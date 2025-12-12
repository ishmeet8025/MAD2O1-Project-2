### *MAD201 – SmartBudgetLite Project*

Submitted by: **Ishmeet Singh**
Student ID: **A00202436**

---

# 🚀 SmartBudgetLite — Mobile Budget Tracking App

A cross-platform mobile budgeting application built using **React Native (Expo)** for **MAD201 Project 2**.

This app allows users to easily track their income and expenses, view financial summaries, generate basic reports, and manage their daily spending.

---

# 📱 Features

### ✅ Core Screens

* **Splash Screen** — Loads app & seeds sample data on first run
* **Home Dashboard** — Displays totals, balance, and quick actions
* **Add Transaction** — Add income/expense with validation
* **Transactions List** — View all transactions + delete items
* **Reports** — Shows category totals & percentages
* **Settings** — Light/dark theme toggle & preferences

### ✅ Data

* Uses **AsyncStorage** for persistent local data
* Includes seeded sample transactions
* Supports clearing all transactions for testing/demo

### ✅ UI

* Reusable `AppHeader` component
* Clean card-style UI
* Category color coding
* Flexbox-based responsive layout

---

# 📂 Project Structure

```
.
├── app/
├── assets/
│   ├── images/
│   └── sample-data.json
├── components/
│   ├── AppHeader.js
│   └── TransactionItem.js
├── constants/
├── hooks/
├── src/
│   ├── screens/
│   │   ├── Splash.js
│   │   ├── Home.js
│   │   ├── Add.js
│   │   ├── Transactions.js
│   │   ├── Reports.js
│   │   └── Settings.js
│   └── index.js
└── README.md
```

---

# 🛠️ Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Start the Expo development server

```bash
npm start
```

### 3. Run the app

* Scan the QR code using **Expo Go** (Android/iOS)
* OR run on emulator

---
