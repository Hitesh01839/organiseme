---
# 🗂️ **OrganiseMe — A Personal Task Management App**

OrganiseMe is a clean, fast, and responsive task manager built with **Next.js**, **MongoDB**, and **modern UI patterns**.
It supports real-time-feeling CRUD updates, secure authentication, and a smooth UX with animations.

This project demonstrates practical full-stack engineering skills — API design, authentication, form handling, state management, database modelling, and UI polish.
---

## 🚀 **Live Demo**

🔗 **[https://organiseme.vercel.app](https://organiseme.vercel.app)**

---

## 📌 **Features**

- ✔ **Create, Read, Update, Delete tasks**
- ✔ **Real-time UI updates (optimistic update + refresh)**
- ✔ **Secure login with Auth.js (Credentials Provider)**
- ✔ **MongoDB Atlas database integration**
- ✔ **Edit tasks via modal with smooth GSAP animation**
- ✔ **Status toggle (Pending ✓ Completed)**
- ✔ **Responsive, clean UI with blur + glass effect**
- ✔ **Toast errors & client-side validation**
- ✔ **API routes for consistent CRUD operations**
- ✔ **Protected routes — only logged-in users can access tasks**

---

## 🛠️ **Tech Stack**

### **Frontend**

- Next.js (App Router)
- React (Client + Server Components)
- TailwindCSS
- GSAP (modal animations)

### **Backend**

- Next.js API Routes
- Auth.js (NextAuth v5)
- MongoDB + Mongoose

### **Other**

- JWT-based sessions
- Vercel Deployment
- Optimistic UI updates
- Modular component architecture

---

## 🔐 **Authentication**

OrganiseMe uses **Auth.js Credentials Provider** with:

- Email & password login
- bcrypt password hashing
- JWT session strategy
- Custom session callbacks to include user ID

---

## ▶️ **Run locally**

```bash
npm install
npm run dev
```

App runs on:

```
http://localhost:3000
```

---

## 🧪 **API Endpoints**

### Get Tasks

`GET /api/tasks`

---

## ✨ **What I Learned**

- Structuring server actions vs client components
- Fixing Auth.js session propagation
- Avoiding “Form disconnected” errors in modals
- Building real-time-feeling CRUD with optimistic updates
- Secure API design for multi-user task management

---

## 📸 **Screenshots**

---

## 📄 **License**

MIT License.

---

## ⭐ **Support**

If you like this project, please ⭐ the repo — it helps a lot!

---
