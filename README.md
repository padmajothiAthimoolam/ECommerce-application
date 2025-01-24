E-Commerce Application

Live Demo: [View the live application here](https://ecommerce-application-s9i2.onrender.com/)

This is a full-fledged e-commerce web application that enables users to browse products, add them to a cart, and complete the checkout process. This application also provides an admin interface to manage products, orders, and user data. Here is the Live

System Design
1. High-Level Architecture
The architecture of this e-commerce application follows a Monolithic approach, with the following layers:

Frontend: React.js for building the user interface. The frontend communicates with the backend through RESTful APIs.
Backend: Node.js and Express.js, which handles HTTP requests, authentication, and interacts with the database. It serves as the middle layer connecting the frontend and the database.
Database: MongoDB, a NoSQL database, stores all application data, including user accounts, products, and orders.
Payment Gateway: Integration with a payment provider such as Stripe or PayPal for processing payments securely.
Authentication: JWT (JSON Web Tokens) for stateless authentication to secure user sessions.

The diagram below represents the high-level architecture:

Frontend (React.js) <--> Backend (Node.js + Express.js) <--> MongoDB
                         ^                |
                         |                v
                    User Authentication    Payment Gateway (Stripe/PayPal)


1. Key Components
The e-commerce application can be broken down into the following key components:

Frontend (User Interface):

Built using React.js, which communicates with the backend using REST API calls.
Components include product listing, product details page, cart, and checkout page.
2. Backend (API Server):

Built using Node.js and Express.js, the backend exposes RESTful APIs to the frontend and interacts with the MongoDB database.
Handles user authentication, manages products, cart operations, and processes orders.
Database (MongoDB):

MongoDB is a NoSQL database used to store:
Users: User profiles (name, email, password, etc.)
Products: Product details (name, description, price, inventory count, etc.)
Orders: Order history (products ordered, order status, user info)
Payment Gateway:

Integration with Stripe to process payments and handle transactions securely.

Admin Panel:

Provides an interface for admins to manage products, view orders, and monitor sales data.

3. Database

Technology: MongoDB (NoSQL)
Responsibilities: Store user data, product data, order history, and cart data.
Schema:
Users: name, email, password (hashed), role, cart Items
Products: Name, description, price, image, category, isFeatured
Orders: user, productInfo( product,quantity, price), total amount
coupons: code,discountPercentage, expirationDate, isActive, userId

4. Authentication & Authorization

JWT (JSON Web Tokens) for user authentication.

5. Deployment

Hosting Provider: Render.com (for the production environment).
CI/CD: GitHub Actions to automatically deploy to Render upon new commits.
Environment Variables: Stored securely for API keys, JWT secrets, and database URIs.

6. External Services (Optional)

Payment Gateway: Stripe, PayPal, etc., for processing payments.

