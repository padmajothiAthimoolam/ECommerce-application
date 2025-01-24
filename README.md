# E-Commerce Application

**Live Demo**: [View the live application here](https://ecommerce-application-s9i2.onrender.com)

This is a full-fledged e-commerce web application that enables users to browse products, add them to a cart, and complete the checkout process. This application also provides an admin interface to manage products, orders, and user data.

---

## System Design

### **High-Level Architecture**

The architecture of this e-commerce application follows a **Monolithic** approach, with the following layers:

- **Frontend**: Built using **React.js** for building the user interface. The frontend communicates with the backend through RESTful APIs.
- **Backend**: Built using **Node.js** and **Express.js**, which handles HTTP requests, authentication, and interacts with the database. It serves as the middle layer connecting the frontend and the database.
- **Database**: **MongoDB** (NoSQL database) stores all application data, including user accounts, products, and orders.
- **Image Storage**: **Cloudinary** is used for storing and serving images (e.g., product images).
- **Payment Gateway**: Integration with a payment provider such as **Stripe** or **PayPal** for securely processing payments.
- **Authentication**: **JWT** (JSON Web Tokens) for stateless authentication to secure user sessions.

The diagram below represents the high-level architecture:

Frontend (React.js) <--> Backend (Node.js + Express.js) <--> MongoDB ^ | | v User Authentication Payment Gateway (Stripe/PayPal)

### **Key Components**

The e-commerce application can be broken down into the following key components:

1. **Frontend (User Interface)**:
   - Built using **React.js**, which communicates with the backend using REST API calls.
   - Components include product listing, product details page, cart, and checkout page.

2. **Backend (API Server)**:
   - Built using **Node.js** and **Express.js**, the backend exposes RESTful APIs to the frontend and interacts with the MongoDB database.
   - Handles user authentication, manages products, cart operations, and processes orders.

3. **Database (MongoDB)**:
   - **MongoDB** is a **NoSQL** database used to store:
     - **Users**: User profiles (name, email, password, etc.)
     - **Products**: Product details (name, description, price, inventory count, etc.)
     - **Orders**: Order history (products ordered, order status, user info)

4. **Payment Gateway**:
   - Integration with **Stripe** for securely processing payments and handling transactions.

5. **Admin Panel**:
   - Provides an interface for admins to manage products, view orders, and monitor sales data.

---

### **Database Schema**

**Technology**: MongoDB (NoSQL)

**Responsibilities**: Store user data, product data, order history, and cart data.

#### **Schema**:

- **Users**: 
  - Fields: `name`, `email`, `password` (hashed), `role`, `cartItems`
  
- **Products**: 
  - Fields: `name`, `description`, `price`, `image`, `category`, `isFeatured`
  
- **Orders**:
  - Fields: `user`, `productInfo` (product, quantity, price), `totalAmount`, `coupons` (code, discountPercentage, expirationDate, isActive), `userId`

---

### **Image Storage with Cloudinary**

- **Cloudinary** is used for storing and serving images in this e-commerce application, especially product images. Instead of saving the images directly in the database, we store the image URLs returned by Cloudinary in the MongoDB database.

1. **Cloudinary Setup**:
   - Sign up for an account at [Cloudinary](https://cloudinary.com/).
   - After signing up, you will get your **Cloudinary Cloud Name**, **API Key**, and **API Secret**.
   - These credentials will be used in the backend to upload images to Cloudinary.

2. **Uploading Images**:
   - The backend is configured to accept image uploads, which are then uploaded to Cloudinary.
   - The **image URL** returned by Cloudinary is stored in the MongoDB database under the product's `imageUrl` field.

3. **Environment Variables**:
   - Store the Cloudinary credentials securely in the `.env` file:
     ```
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```

### **Authentication & Authorization**

- **JWT** (JSON Web Tokens) for user authentication.
- Passwords are hashed before being stored in the database for enhanced security.

---

### **Deployment**

- **Hosting Provider**: The application is hosted on **Render.com** for the production environment.
- **CI/CD**: **GitHub Actions** is used to automatically deploy the application to Render upon new commits.
- **Environment Variables**: Sensitive environment variables (such as API keys, JWT secrets, and database URIs) are stored securely.

---

### **External Services (Optional)**

- **Payment Gateway**: Integration with **Stripe** or **PayPal** for securely processing payments.

---

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Product Management**: Admins can add, update, or delete products.
- **Shopping Cart**: Users can add products to their cart and proceed to checkout.
- **Order Processing**: Users can view order details and track order status.
- **Admin Panel**: Admins can view and manage users, products, and orders.

---

## Installation

To run this application locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/padmajothiAthimoolam/ECommerce-application.git
```

2. Navigate to the backend directory

```cd ecommerce-application/backend```

3. Install dependencies

```bash
npm install
```

4. Set up environment variables
Create a .env file in the root directory with the following content:

MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key (if using Stripe)
ACCESS_TOKEN_SECRET=access_token_secret
REFRESH_TOKEN_SECRET=refresh_token_secret
CLOUDINARY_CLOUD_NAME=cloud_name
CLOUDINARY_API_KEY=apikey
CLOUDINARY_API_SECRET=apisecreat

STRIPE_SECRET_KEY-secret_key
CLIENT_URL=http://localhost:5173

5. Run the backend application
```bash
npm start
```

6. Navigate to the frontend directory 
```bash
cd ../frontend
```

7. Install frontend dependencies
```bash
npm install
```

8. Run the frontend
```bash
npm start
```
