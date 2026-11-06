# 🚀 StudioSpace — Backend API

<p align="center">
  A secure and scalable backend for a modern studio booking platform.
</p>

<p align="center">
  <a href="https://studiospace-server-silk.vercel.app/">
    <img src="https://img.shields.io/badge/Live_API-Visit_Server-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live API" />
  </a>
  <a href="https://studioclient.vercel.app/">
    <img src="https://img.shields.io/badge/Frontend-Visit_App-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Frontend" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Better_Auth-000000?style=flat-square" />
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white" />
</p>

---

## 📖 About The Project

**StudioSpace** is a studio booking platform designed to simplify studio discovery, management, and booking operations.

The backend is built with **Node.js, Express.js, and MongoDB**, providing a structured RESTful API architecture for managing application data, authenticating users, and controlling access to protected resources.

It integrates **Better Auth JWT verification** with role-based access control (RBAC) to ensure secure and permission-based API operations.

## 🌐 Live Application

| Service | URL |
|:---|:---|
| **Frontend Application** | [studioclient.vercel.app](https://studioclient.vercel.app/) |
| **Backend API** | [studiospace-server-silk.vercel.app](https://studiospace-server-silk.vercel.app/) |
| **Backend Hosting** | Vercel |
| **Database** | MongoDB Atlas |

## ✨ Key Features

- **Studio Management** — Create, retrieve, update, and delete studio listings.
- **Booking Management** — Handle studio booking operations.
- **User Authentication** — Verify Better Auth JWT tokens using JOSE.
- **Admin Authorization** — Protect administrative routes from unauthorized access.
- **Role-Based Access Control (RBAC)** — Manage access for Admin, Sub-admin, and User roles.
- **Permission-Based Middleware** — Restrict specific operations according to assigned permissions.
- **MongoDB Integration** — Efficiently store and retrieve application data.
- **RESTful API Architecture** — Provide structured JSON-based API services.
- **Secure Configuration** — Manage environment variables and sensitive credentials securely.

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- JavaScript
- CommonJS

### Database
- MongoDB
- MongoDB Atlas

### Authentication & Security
- Better Auth
- JSON Web Token (JWT)
- JOSE
- Cookie Parser
- CORS
- Role-Based Access Control (RBAC)

### Development Tools
- npm
- Nodemon
- dotenv

## 📂 Project Structure

```text
studiospace-server/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── bookingController.js
│   └── studioController.js
│
├── middleware/
│   ├── verifyAdmin.js
│   ├── verifyPermission.js
│   └── verifyToken.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── bookingRoutes.js
│   └── studioRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run the backend application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/prantodev1/studioSpace_server.git
```

### 2. Navigate to the Project Directory

```bash
cd studioSpace_server
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
```

Replace the placeholder values with your actual environment configuration.

> **Security Note:** Never commit your `.env` file, database credentials, or authentication secrets to a public repository.

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Start the Production Server

```bash
npm start
```

The local backend server will run at:

```text
http://localhost:5000
```

## 🔐 Authentication & Authorization

StudioSpace implements authentication and authorization using Better Auth, JWT verification, and custom Express middleware.

### Authentication Flow

1. Users authenticate through Better Auth.
2. The frontend provides the authentication JWT to protected API requests.
3. The backend verifies the token using the verification middleware.
4. The authenticated user's identity and role are used for access control.
5. Permission middleware checks whether the requested operation is authorized.

### Middleware Overview

| Middleware | Responsibility |
|:---|:---|
| `verifyToken.js` | Verifies JWT tokens and authenticates users. |
| `verifyAdmin.js` | Restricts access to administrative resources. |
| `verifyPermission.js` | Validates user permissions for protected operations. |

### Supported User Roles

| Role | Access Level |
|:---|:---|
| Admin | Administrative operations |
| Sub-admin | Permission-based administrative operations |
| User | Standard application operations |

## 🗄️ Database Architecture

StudioSpace uses **MongoDB Atlas** as its cloud-hosted NoSQL database.

The database manages the core application data, including:

- User information
- Studio listings
- Booking information
- Authentication-related data

The database connection is managed through the configuration module:

```text
config/db.js
```

## 🔌 API Integration

The backend communicates with the StudioSpace frontend through HTTP-based RESTful APIs.

| Component | Technology |
|:---|:---|
| Frontend | Next.js |
| Backend | Node.js & Express.js |
| Database | MongoDB |
| Data Format | JSON |
| Authentication | Better Auth & JWT |
| Deployment | Vercel |

**Production API Base URL:**

```text
https://studiospace-server-silk.vercel.app/
```

## ☁️ Deployment

The StudioSpace backend is deployed on **Vercel**.

To deploy the latest production version using the Vercel CLI:

```bash
vercel --prod
```

Make sure all required environment variables are configured in:

**Vercel Dashboard → Project Settings → Environment Variables**

For production, configure the frontend authentication URL and CORS origins according to your deployment settings.

## 🎯 Project Objective

The primary objective of StudioSpace is to build a reliable and secure studio booking ecosystem where users can discover studios, manage listings, and handle booking operations efficiently.

The backend provides the essential infrastructure through RESTful APIs, database integration, authentication, and role-based authorization.

---

## 👨‍💻 Developer

<p align="center">
  <img src="https://img.shields.io/badge/Developer-Pranto%20Paul-2563EB?style=for-the-badge" />
</p>

<p align="center">
  Computer Science & Engineering Student | Full-Stack Developer
</p>

<p align="center">
  <a href="https://github.com/prantodev1">
    <img src="https://img.shields.io/badge/GitHub-prantodev1-181717?style=for-the-badge&logo=github" />
  </a>
</p>

---

<p align="center">
  <strong>StudioSpace</strong>
  <br />
  <i>Discover. Create. Book. Experience.</i>
  <br /><br />
  Built with ❤️ by <strong>Pranto Paul</strong>
</p>