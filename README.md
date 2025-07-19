# 🛒 E-Commerce API

A robust **Node.js**-based API for an e-commerce platform, built with **Express** and **Mongoose**. This project manages users, products, carts, and orders with validation, password hashing, and MongoDB integration.

---

## 📑 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- ✅ User registration and management with **bcrypt** password hashing  
- 🛒 Cart management with product quantities  
- 🛍️ Product catalog and order processing  
- 🧪 Input validation using `express-validator`  
- 💾 MongoDB integration using **Mongoose**  
- 📦 Modular architecture: routes, controllers, middleware  

---

## ⚙️ Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/ecommerce-api.git
   cd ecommerce-api
Install dependencies:

bash
Copy
Edit
npm install
Set up environment variables:
Create a .env file in the root directory with the following content:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=3000
Start MongoDB (if using local instance):

bash
Copy
Edit
sudo systemctl start mongod
Run the application:

bash
Copy
Edit
npm start
🚀 Usage
The API runs at http://localhost:3000 by default.

Use tools like Postman or curl to test endpoints.

📬 Example: Create a User
bash
Copy
Edit
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"secure1234"}'
📡 API Endpoints
👤 Users
POST /users — Create a new user

GET /users — Get all users (to be implemented)

🛍️ Products (to be implemented)
POST /products — Add a new product

GET /products — Get all products

🛒 Cart (to be implemented)
POST /cart — Add item to cart

GET /cart/:userId — Get user's cart

📦 Orders (to be implemented)
POST /orders — Create an order

GET /orders/:userId — Get user's orders

ℹ️ Additional endpoints like PUT, DELETE, and others are planned. See routes/ for available routes.

🗂️ Project Structure
bash
Copy
Edit
ecommerce-api/
├── config/           # Database configuration
├── models/           # Mongoose schemas (e.g., User.js, Cart.js)
├── middleware/       # Validation and hashing middleware
├── routes/           # Route definitions (e.g., users.js)
├── controllers/      # Business logic (e.g., userController.js)
├── utils/            # Helper functions (optional)
├── server.js         # Main server file
└── .env              # Environment variables
🤝 Contributing
Fork the repository

Create a feature branch:

bash
Copy
Edit
git checkout -b feature-name
Commit your changes:

bash
Copy
Edit
git commit -m "Add feature"
Push to GitHub:

bash
Copy
Edit
git push origin feature-name
Open a Pull Request