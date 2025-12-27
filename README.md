# **My Portfolio**

A backend system designed to power a modern and dynamic portfolio website. Built with a robust MERN (MongoDB, Express.js, React, Node.js, Next Js) stack, this backend provides seamless CRUD operations for managing various portfolio sections such as projects, experiences, skills, and blogs. The system is integrated with Next.js for efficient rendering and Redux for state management, ensuring a smooth and dynamic full-stack experience.

## **Live Demo**

- [Live Application](https://sumon-dev-portfolio-fronted-845w.vercel.app/)
- [Live Admin Dashboard](https://sumon-dev-portfolio-fronted-845w.vercel.app/admin-dashboard)

---

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)

---

## **Project Overview**

The **My Portfolio ** serves as the backbone of a professional portfolio website, offering a secure and scalable system for managing content. With this backend, users (admins) can easily create, update, and delete portfolio sections, such as projects, skills, experiences, and blog posts. The system utilizes modern web technologies, ensuring performance, maintainability, and seamless integration with the frontend.

The backend is designed to be modular and scalable, making it easy to expand as the portfolio grows, and it allows for easy integration with a dynamic Next.js frontend. The system is secure, optimized, and built with best practices in mind.

---

## **Key Features**

### **1. Admin Dashboard**

** Admin path **

- https://sumon-dev-portfolio-fronted.vercel.app/admin-dashboard

- **Manage Portfolio Sections**:
  - Create, update, and delete sections like projects, experiences, skills, and blogs.
  - Provide detailed metadata for each section (e.g., project descriptions, skills, or work experiences).
- **File Upload**:
  - Easily upload images or media files to showcase projects and skills.

### **2. Secure API Endpoints**

- **CRUD Operations**:
  - Secure API routes for creating, reading, updating, and deleting portfolio sections.
- **Authentication**:
  - JWT-based authentication to ensure secure admin access.

### **3. Real-time Data Updates**

- **Dynamic Content**:
  - Changes to portfolio content are instantly reflected on the frontend.

### **4. Scalable Design**

- Built with scalability in mind to handle expanding sections and future feature additions.

---

## **Technology Stack**

- **Programming Language:** TypeScript
- **Backend Framework:** Express.js
- **Frontend Integration:** Next.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **State Management:** Redux (for frontend state handling)

---

## **Installation**

### **1. Clone the Repository**

````bash
git clone https://github.com/Sumon-DevCoder/sumon.dev-portfolio-backend.git

2. **Navigate into the project directory**:

   ```bash
   cd sumon.dev-portfolio-backend

   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env` file in the root directory and add your environment variables**:

   ```bash
   DB_URL=mongodb+srv://<username>:<password>@cluster0.0i0xa.mongodb.net/meetingRoomDB?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   BCRYPT_SALT_ROUND=12
   NODE_ENV=development
   # admin credentials (REDACTED)
   admin_email=mustafizurrahmansumon24@gmail.com
   admin_password=sumon.devConfig@24
   admin_mobile_number=01962-878499
   # jwt credentials (REDACTED)
   JWT_ACCESS_SECRET=secret
   JWT_ACCESS_EXPIRES_iN=365d
   JWT_REFRESH_SECRET=refreshscret
   JWT_REFRESH_EXPIRES_IN=365d


   BACKEND_LIVE_URL=https://meeting-room-booking-server-zeta.vercel.app/
   ```

## Usage

- **For Admins:**

  - Access the admin dashboard to manage rooms and time slots.
  - Create, update, or delete rooms and their respective slots.

- **For Users:**
  - Browse the available meeting rooms and select desired time slots for booking.
  - Fill in the booking form and receive confirmation of your reservation.
````
