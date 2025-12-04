# 🔐 Next.js 16 + BetterAuth + MongoDB Authentication Boilerplate

A production-ready authentication starter built with **Next.js 16 (App
Router)**, **BetterAuth**, **MongoDB**, **TypeScript**, and
**Nodemailer**.\
Designed for scalability, security, and real-world usage.

## ✨ Features

- Google OAuth authentication\
- Email/Password signup & login\
- Password reset via email\
- Gmail-only domain restriction\
- MongoDB integration\
- Nodemailer SMTP email service\
- Fully typed with TypeScript\
- Built on Next.js 16 App Router\
- Clean, scalable architecture

## 🧰 Tech Stack

Category Technology

---

Framework Next.js 16
Authentication BetterAuth
Database MongoDB
Email Nodemailer
Language TypeScript

## 📦 Prerequisites

- Node.js 18+
- MongoDB
- Google OAuth credentials
- SMTP credentials (Gmail recommended)

## 📥 Installation

### 1. Clone the Repository

    git https://github.com/Piraveen17/nextjs-betterauth-boilerplate.git
    cd nextjs-betterauth-boilerplate

### 2. Install Dependencies

    npm install

## ⚙️ Environment Variables

    NEXT_PUBLIC_APP_URL=http://localhost:3000
    BETTER_AUTH_SECRET=your_long_random_secret

    MONGODB_URI=your_mongodb_connection_string
    MONGODB_DB_NAME=your_database_name

    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret

    NODEMAILER_HOST=smtp.gmail.com
    NODEMAILER_PORT=465
    NODEMAILER_USER=your_email@gmail.com
    NODEMAILER_PASS=your_gmail_app_password

    ALLOWED_EMAIL_DOMAIN=gmail.com

## 🚀 Running the App

    npm run dev

## 🔐 Authentication Flows

- Email + password authentication
- Google OAuth login
- Token-based password reset
- Domain-based access restriction

## 📁 Project Structure

    /app
      /auth
      /api/auth

    /lib
      auth.ts
      auth-client.ts
      mail.ts
      mongodb.ts
      utils.ts

    /models

## 🛡 Security

- Password hashing
- Token-based email verification
- Secure domain validation
- Server-side input validation

## 📤 Deployment (Vercel)

1.  Push to GitHub\
2.  Import into Vercel\
3.  Add environment variables\
4.  Connect MongoDB\
5.  Deploy

## 🤝 Contributing

Open issues before major changes.

## ⭐ Support

If this helped you, leave a ⭐ on GitHub!
