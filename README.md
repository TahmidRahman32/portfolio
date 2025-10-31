# 🌐 Tahmid Rahman – Personal Portfolio Website

A full-stack **Next.js + Express.js + Prisma** portfolio website showcasing my personal projects, blogs, and professional profile.  
Includes a secure admin dashboard for managing blog and project content, with a responsive and interactive user interface.

---

## 🚀 Live Links

- **Frontend (Next.js):** [...](#)  
- **Backend (Express.js):** [.....](#)  
<!-- - **Demo Video:** [https://youtu.be/your-demo-video](#) -->

> 🔐 **Admin Credentials (for testing):**  
> **Email:** admin@example.com  
> **Password:** Admin@123  

---

## 🧩 Project Overview

This portfolio website allows visitors to explore my personal information, blogs, and projects — while providing an authenticated dashboard for the owner (me) to manage content securely.  
Built using **Next.js**, **Express.js**, and **Prisma ORM**, it integrates static generation (SSG/ISR) with a modern and optimized backend API.

---

## ✨ Key Features

### 🧭 Public Pages
- **About Me Section:** Static profile with bio, contact info, skills, and experience.  
- **Projects Showcase:** Display of personal projects with live demo links, GitHub repos, and features.  
- **Blog Section:**  
  - “All Blogs” page with Incremental Static Regeneration (ISR).  
  - “Single Blog” pages with `getStaticPaths` + revalidation for on-demand updates.

### 🔐 Private (Admin) Features
- **Authentication & Authorization:**  
  - JWT-based secure login for portfolio owner.  
  - Passwords hashed using bcrypt.  
- **Dashboard:**  
  - Manage (Create, Read, Update, Delete) blogs and projects dynamically.  
  - Protected routes accessible only to admin.

### 🧰 Bonus Features
- Rich Text Editor using **React Quill** for writing formatted blog content.  
- Interactive UI with **Framer Motion** animations and glassmorphism design.  
- User-friendly **form validation**, **toast notifications**, and **error handling**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js (TypeScript)  
- **Styling:** Tailwind CSS  
- **Animations:** Framer Motion  
- **Notifications:** React Hot Toast  
- **Rich Text Editor:** React Quill  

### Backend
- **Server:** Node.js + Express.js  
- **Database:** PostgreSQL with Prisma ORM  
- **Auth:** JWT + bcrypt  
- **Validation:** Express Validator / Zod  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repositories
```bash
# Frontend
git clone https://github.com/yourusername/portfolio-frontend.git

# Backend
git clone https://github.com/yourusername/portfolio-backend.git
