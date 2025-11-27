# Akanjo-Ko — Fullstack E-Commerce Platform

Akanjo-Ko is a modern, minimalistic, and scalable **fullstack e-commerce web application** built for selling clothing and accessories.
It demonstrates clean architecture, modular frontend design (FSD + Atomic Design), and a robust backend powered by Express.js and PostgreSQL.

---

## 📌 1. Project Overview

Akanjo-Ko provides a simple and efficient online shopping experience for customers in Madagascar.
It includes product management, user authentication, and a built-in admin/user discussion system for product inquiries.

### 🎯 Objectives

* Provide a clean fullstack architecture for a real e-commerce use case
* Build a scalable system following industry best practices
* Deliver a smooth UI/UX for both users and admin
* Facilitate deployment with Docker and free hosting options

---

## 📌 2. Core Features

### 👤 User Features

* Browse clothing products (shoes, accessories, outfits, etc.)
* View product details: price, category, gender, age, availability
* “En discuter” button → opens a discussion with the admin about a product
* Send messages and receive admin replies
* Create an account & login

### 🛠️ Admin Features

* Manage products (add/edit/delete)
* Update stock and availability
* Respond to user messages
* See product-related discussions
* Change product status (in stock / out of stock)
* Track stock quantity & decrement it on purchase

---

## 📌 3. Tech Stack

### **Frontend**

* React (Vite)
* TypeScript
* Tailwind CSS
* React Router
* Feature-Sliced Design architecture
* Atomic Design UI Structure

### **Backend**

* Node.js / Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Zod (Validation)
* JWT Authentication

### **Infrastructure / DevOps**

* Docker & Docker Compose
* Nginx Reverse Proxy
* GitHub Actions CI

---

## 📌 4. Monorepo Structure

```
akanjo-ko/
├── .gitignore
├── README.md
├── docker-compose.yml
├── .github/workflows/ci.yml
│
├── frontend/
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
│       ├── app/
│       ├── pages/
│       ├── features/
│       ├── entities/
│       ├── widgets/
│       └── shared/
│
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── middlewares/
│       └── app.ts
│
└── infrastructure/
    ├── Dockerfile.backend
    ├── Dockerfile.frontend
    └── nginx.conf
```

---

## 📌 5. Development Workflow

### Frontend

Organized using **Feature-Sliced Design**:

* `app/` → routing, providers, global config
* `pages/` → page-level components
* `features/` → functional units (auth, product chat…)
* `entities/` → reusable domain pieces (Product, User…)
* `widgets/` → UI blocks
* `shared/` → utilities, UI atoms, helpers

### Backend

Follows **clean architecture (MVC + layered):**

* Controllers → Request handlers
* Services → Business logic
* Repositories → Prisma database access
* Routes → API endpoints
* Middlewares → Auth, validation, errors

---

## 📌 6. Installation

### Clone the repository

```bash
git clone https://github.com/your-name/akanjo-ko.git
cd akanjo-ko
```

### Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

---

## 📌 7. Running the Project (Local Development)

### Option A — Without Docker

Backend:

```bash
cd backend
npx prisma generate
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

### Option B — Using Docker (recommended)

```bash
docker-compose up --build
```

---

## 📌 8. API Documentation

API follows REST standards.
Main route groups:

```
/api/auth
/api/products
/api/messages
/api/users
/api/admin
```

Full API specification will be located in `/backend/docs/api-specs.md`.

---

## 📌 9. Deployment

Supported free hosting options:

* **Frontend:** Vercel / Netlify
* **Backend:** Railway / Render
* **Database:** Neon.tech / Supabase
* **Reverse Proxy:** Fly.io / Render
* **Full Docker Deployment:** Fly.io

---

## 📌 10. License

This project is licensed under the **MIT License**.