# 🧠 Social Network Backend – NestJS + PostgreSQL (No ORM)

This project is a clean, from-scratch back-end API for a simple social networking site like Facebook. It uses **NestJS**, **TypeScript**, and **PostgreSQL**, and **does not use any ORM** (like TypeORM, MikroORM, Prisma, etc). Instead, raw SQL queries with the `pg` package are used for full control and performance.

---

## 📦 Features

- ✅ User registration with validations
- ✅ User login with hashed passwords and JWT authentication
- ✅ Advanced user search (by `first_name`, `last_name`, `age`)
- ✅ Friend requests (send, accept, decline)
- ✅ Auto `created_at`, `updated_at` timestamps
- ✅ Clear folder structure with services, DTOs, and controllers
- ✅ Swagger documentation available at `/api/documentation`

---

## 🚀 Tech Stack

- **NestJS** – Scalable, modular architecture
- **PostgreSQL** – Robust relational database
- **pg** – PostgreSQL client for Node.js
- **bcrypt** – Secure password hashing
- **jsonwebtoken** – JWT authentication
- **class-validator** – Request validation with DTOs
- **Swagger** – API documentation

---

## 🧪 Getting Started

```bash
# Clone the repository
git clone https://github.com/Arno2001/m-one-task.git

# Install dependencies
npm install

# Copy env.example file then add config to .env file
cp .env.example .env

# Create database tables
npm run init:db

# Start dev server
npm run start:dev
```

---

## 📄 API Endpoints

| Method | Path             | Description                    |
|--------|------------------|--------------------------------|
| POST   | /auth/register   | Register a new user            |
| POST   | /auth/login      | Login and get JWT              |
| GET    | /users/me        | Get Own user information       |
| GET    | /users/search    | Advanced search by first_name, |
|                             last_name and age              |
| DELETE | /users/          | Delete own user                |
| POST   | /friends/:id     | Send friend request            |
| GET    | /friends/        | View all friends               |
| GET    | /friends/requests| View incoming friend requests  |
| PUT    | /friends/:id     | Accept or Decline a request    |
