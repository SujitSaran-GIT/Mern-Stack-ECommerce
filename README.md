# E-Commerce Website

An advanced and feature-rich e-commerce application built using the MERN (MongoDB, Express.js, React, Node.js) stack. This application provides a seamless shopping experience for users, with powerful admin tools for managing the store.

---

## Features

### **User Features**
- User authentication and authorization (JWT-based)
- Browse products by categories
- Search functionality with filters (price, rating, etc.)
- Shopping cart and wishlist management
- Secure checkout with payment gateway integration
- Order history and status tracking
- Responsive design for mobile and desktop

### **Admin Features**
- Dashboard for managing users, products, and orders
- Add, edit, and delete products
- Manage inventory and stock
- Process and update order status
- Analytics for sales and performance tracking

---

## Tech Stack

### **Frontend**
- **React.js**: A robust JavaScript library for building the user interface.
- **Redux** (or Context API): State management for efficient data handling.
- **Tailwind CSS**: For responsive and modern UI design.

### **Backend**
- **Node.js**: A powerful JavaScript runtime for server-side logic.
- **Express.js**: A minimal and flexible Node.js framework.

### **Database**
- **MongoDB**: A NoSQL database for storing user data, products, orders, etc.

### **Tools Used For Backend**
- **Mongoose**: For modeling and managing MongoDB data.
- **Stripe/PayPal API**: For secure payment processing.
- **JWT**: For secure user authentication.
- **bcryptjs**: Used for hashing passwords securely.
- **cookie-parser**: Parses cookies attached to the client request objects.
- **cors**: Enables Cross-Origin Resource Sharing (CORS), which allows your server to handle requests from different domains.
- **dotenv**: Loads environment variables from a .env file into process.env. Helps keep sensitive information (e.g., API keys, database credentials) secure by storing them in a separate file rather than hardcoding them in your source code.
- **express**: A lightweight and flexible Node.js web framework used to create APIs and web servers.
- **express-async-handler**: Handles asynchronous operations in Express routes, automatically catching errors and passing them to error-handling middleware.
- **express-formidable**: Middleware for parsing multipart/form-data in incoming requests, such as when handling file uploads.
- **formidable**: A library for parsing incoming form data, including file uploads.
- **jsonwebtoken**: Used to create and verify JSON Web Tokens (JWT) for authentication.
- **multer**: Middleware for handling multipart/form-data, used for uploading files.
- **nodemon**: A utility that monitors changes in your code and automatically restarts the server during development.
