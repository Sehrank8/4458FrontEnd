# Frontend for Job Search Web App

This is the frontend React application for the SE4458 job search platform, similar to Kariyer.net. It connects to a Spring Boot-based microservice backend deployed on Render and communicates through a centralized API Gateway.

---

## ✨ Features

* Job search with autocomplete and filters (position, city, work type)
* Display job postings with detail view and related jobs
* "Apply" button redirects unauthenticated users to login
* AI Chat Agent integration via `/agent` endpoint
* Notifications page to create job alerts
* Role-based login and admin panel for job creation
* Shared layout and header with conditional navigation

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

> Make sure your backend API Gateway is deployed or running locally.

### 3. Vite Proxy (optional)

If CORS is not configured on the backend, you can use a proxy in `vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'https://your-api-gateway.onrender.com',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '/api')
    }
  }
}
```

And update `api/index.js`:

```js
const api = axios.create({ baseURL: '/api/v1' });
```

---

## 📂 Project Structure

```
src/
├── api/
│   └── index.js              # Axios instance
├── components/
│   ├── ChatAgent.jsx         # AI chat popup
│   ├── Header.jsx            # Shared navigation
│   ├── JobCard.jsx           # Job preview card
│   └── Layout.jsx            # Page wrapper
├── pages/
│   ├── HomePage.jsx
│   ├── SearchResultsPage.jsx
│   ├── JobDetailPage.jsx
│   ├── NotificationPage.jsx
│   ├── AdminJobFormPage.jsx
│   └── LoginPage.jsx
├── App.jsx
├── main.jsx
├── index.css
└── App.css
```

---

## 🛡️ Login Info

* Login is handled locally in `LoginPage.jsx`
* Role is determined by username:

  * `admin` → ADMIN
  * others → USER
* Token/role is saved to `localStorage`

---

## ✨ Available Routes

| Route            | Component           | Description                     |
| ---------------- | ------------------- | ------------------------------- |
| `/`              | `HomePage`          | Main landing/search page        |
| `/search`        | `SearchResultsPage` | Filtered job results            |
| `/job/:id`       | `JobDetailPage`     | Detailed job + related jobs     |
| `/notifications` | `NotificationPage`  | Job alert creation              |
| `/admin/job`     | `AdminJobFormPage`  | Create job posting (admin only) |
| `/login`         | `LoginPage`         | Fake login page                 |


---


