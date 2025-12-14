# 🏋️ FitPlanHub – Trainers & Users Fitness Platform



> FitPlanHub is a full-stack web application where certified fitness trainers create fitness plans and users can explore, follow trainers, and subscribe to paid fitness programs.  
> The project demonstrates role-based authentication, access control, database relationships, and clean frontend–backend integration.

---
🚀 **Live Demo:**  
👉 https://fitplanhublive.vercel.app/

## 🔐 Quick Access 

To avoid an empty experience, please use the demo credentials below to explore the platform with real data.

### 👨‍🏫 Trainer Account
- **Email:** mohitrp1729@gmail.com  
- **Password:** 123456  

👉 Access trainer dashboard, create/edit plans, and view followers.

### 👤 User Account
- **Email:** kunal@gmail.com  
- **Password:** 123456  

👉 Explore plans, follow trainers, subscribe to plans, and view personalized feed.

---

## 📌 Project Overview

**FitPlanHub** is designed to simulate a real-world fitness subscription platform with clear separation between **Trainers** and **Users**.

- Trainers act as service providers who create and manage fitness plans.
- Users act as customers who follow trainers and subscribe to their plans.
- Access to plan details is controlled through subscriptions.

This project focuses on **backend logic, role-based access, and clean UI behavior**, rather than superficial features.

---

## ✨ Key Features Implemented

### 🔐 Authentication & Authorization
- Signup and login for **Users** and **Trainers**
- Password hashing using bcrypt
- JWT-based authentication
- Role-based UI and route protection

---

### 🏋️ Trainer Features
- Trainer dashboard
- Create fitness plans (title, description, price, duration, etc.)
- Edit and delete only their own plans
- View follower count and followers list
- Trainer profile with brand details

---

### 👤 User Features
- Browse all fitness plans (preview mode)
- Follow / unfollow trainers
- Subscribe to fitness plans (simulated payment)
- Access full plan details after subscription
- Personalized feed showing plans from followed trainers
- View subscribed plans clearly

---

### 🔒 Access Control
- Non-subscribed users can only see:
  - Plan title
  - Trainer name
  - Price
- Subscribed users get full plan access
- Trainers cannot subscribe to plans
- Users cannot create or manage plans

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Tailwind CSS
- Framer Motion (subtle animations)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password hashing

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas  

---

## 🗂️ Project Structure

```

fitplanhub/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   ├── components/
│   ├── services/
│   └── App.jsx
│
└── README.md

````

---

## ⚙️ How to Run the Project Locally

### 1️⃣ Clone the Repository
```bash
git clone <your-github-repo-url>
cd fitplanhub
````

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🧪 What This Project Demonstrates

* Backend logic & API design
* MongoDB relationships (one-to-many, many-to-many)
* Authentication & authorization
* Role-based access control
* CRUD operations
* Clean and maintainable code structure
* Real-world application flow

---

## 📝 Notes 

* No real payment gateway is used (subscription is simulated as required).
* Dummy Indian fitness brands and realistic pricing are used to simulate production-like data.
* The project prioritizes **correct functionality over over-engineering**.

---

## 👨‍💻 Author

developed by **MohitSa**

---

