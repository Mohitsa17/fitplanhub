# 🏋️ FitPlanHub – Trainers & Users Fitness Platform

FitPlanHub is a full-stack web application that connects **fitness trainers** with **users** through structured fitness plans and paid subscriptions. Trainers can create and manage fitness plans, while users can follow trainers, subscribe to plans, and access personalized fitness content.

This project is built as part of a placement task to demonstrate backend logic, database relationships, authentication, and role-based access control.

---

## 🚀 Features Overview

### 🔐 Authentication & Roles

* User and Trainer signup & login
* Secure password hashing using bcrypt
* JWT-based authentication
* Role-based access (User vs Trainer)

---

### 🏋️ Trainer Features

* Trainer dashboard
* Create fitness plans
* Edit and delete own plans
* View list of own plans
* View follower count and followers list

---

### 👤 User Features

* View all available fitness plans (preview mode)
* Follow and unfollow trainers
* Subscribe to fitness plans (simulated payment)
* Access full plan details after subscription
* Personalized feed showing plans from followed trainers
* View trainer profiles and their plans

---

### 🔒 Access Control

* Only trainers can create, edit, or delete plans
* Only users can subscribe to plans
* Non-subscribed users see preview details only
* Subscribed users get full access to plan content
* Trainers cannot subscribe or follow anyone

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router
* Axios
* Tailwind CSS
* Framer Motion (light animations)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt for password hashing

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## 📁 Project Structure

```
fitplanhub/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd fitplanhub
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔄 Application Flow

* Trainer signs up → creates fitness plans
* User signs up → follows trainers
* User feed shows plans from followed trainers
* User subscribes to a plan → gains full access
* Trainer can view followers and manage plans

---

## 📌 Notes

* Payment is simulated (no real payment gateway)
* Images are used via public image URLs
* Project focuses on backend logic, role separation, and database relationships
* UI is kept clean and responsive

---

## 🎯 Purpose of the Project

This project demonstrates:

* REST API design
* Role-based authentication & authorization
* Database relationships (one-to-many, many-to-many)
* CRUD operations
* Real-world application logic

---

## 👨‍💻 Author

Developed by **MohitSa**

