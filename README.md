# 🚨 LOGIN PAGE NOTICE

> ⚠️ **When the frontend app starts, you will first see a login page. Just click the `Login` button to proceed — no email or password is required.**

---

# 🧩 Blog Dashboard – Full Stack Application

A modern full-stack blog dashboard built with **React (Vite + TypeScript)** for the frontend and **Node.js + Express + TypeScript** for the backend.

---

## 📂 Project Structure

```
.
├── backend/        # Node.js Express API (TypeScript)
├── frontend/       # React App (Vite + TS + Tailwind + Ant Design)
├── README.md       # Root project README
```

---

## 🚀 Getting Started

This project includes **two separate applications** (frontend and backend) that work together via a RESTful API.

### 📦 Prerequisites

* Node.js v16+
* Yarn (preferred) or npm

---

## 📁 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blog-dashboard.git
cd blog-dashboard
```

### 2. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Runs at: [http://localhost:6000](http://localhost:6000)

### 3. Start the Frontend

```bash
cd frontend
yarn install
yarn dev
```

Runs at: [http://localhost:5173](http://localhost:5173)

> 💡 Make sure the backend is running before starting the frontend to avoid API connection issues.

---

## 🌍 Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_USER_AVATAR_URL=https://avatar.iran.liara.run/public/27
VITE_USER_BASE_URL=api/users
VITE_POST_BASE_URL=api/posts
```

> All `VITE_` variables are accessible in the frontend via `import.meta.env`.

### Backend (`PORT`)

By default, the backend runs on port `6000`. You can override this by setting the environment variable:

```bash
PORT=8000 npm run dev
```

---

## 🌐 API Proxy

The frontend uses Vite's proxy to avoid CORS issues during development:

* `/api/*` requests are proxied to `http://localhost:6000`

---

## 📊 Tech Stack

### Frontend

* React 19 (Vite)
* TypeScript
* Redux Toolkit (RTK)
* React Router DOM
* Styled Components
* Ant Design
* Tailwind CSS
* Axios

### Backend

* Express.js
* TypeScript
* Mock data with static services
* Helmet, Morgan, CORS middleware

---

## 📅 Features Overview

* Fixed sidebar with user profile (randomly fetched 1-10)
* Routing: Dashboard, Blogs, Post Detail, Post Edit
* REST API Integration for users & posts
* Clickable posts with Edit/Delete options
* Edit form with PUT request to update posts
* Unit test: Sidebar user fetching
* Styled using Ant Design + Tailwind CSS

---

## 👤 Author

**Hammad Hassan**
