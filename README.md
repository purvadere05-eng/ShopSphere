# 🛍️ ShopSphere – AI-Powered E-Commerce Website

ShopSphere is a modern, responsive e-commerce frontend application developed using **React.js, Redux Toolkit, JavaScript, HTML, and CSS**.

The project allows users to browse products, search and filter products, view product details, manage their shopping cart, and complete a demo checkout process.

It also includes an **AI Shopping Assistant powered by the Groq API**, integrated through a separate backend to provide AI-based shopping assistance.

## 🚀 Features

### 🏠 Home Page
- Attractive and user-friendly interface
- Navigation to different pages
- Explore Products button
- Responsive design

### 🛍️ Product Management
- Display available products
- Search products by name
- Filter products by category
- View individual product details
- Add products to cart

### 🛒 Shopping Cart
- Add products to cart
- Increase or decrease product quantity
- Remove individual products
- Clear the entire cart
- Automatically calculate total price
- Store cart data using LocalStorage

### 💳 Checkout System
- Customer shipping information form
- Payment options: Cash on Delivery, UPI, and Card
- Order summary
- Demo order placement
- Order confirmation

**Note:** The checkout is a frontend demonstration. Real payment gateway integration is not implemented.

### 🤖 AI Shopping Assistant
- AI-powered shopping assistance
- Integration with Groq API
- Separate backend for handling AI requests
- Helps users with shopping-related questions
- Keeps the Groq API key outside the React frontend

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application logic |
| HTML5 | Web page structure |
| CSS3 | Styling |
| Redux Toolkit | Cart state management |
| React Router DOM | Page navigation |
| LocalStorage | Cart data persistence |
| Groq API | AI Shopping Assistant |
| Vite | React development and build tool |
| Vercel | Deployment |
| Git & GitHub | Version control |

## 📂 Project Structure

```text
ShopSphere/
│
├── public/
│
├── src/
│   ├── components/
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── AIAssistant.jsx
│   │
│   ├── redux/
│   │   ├── store.js
│   │   └── cartSlice.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

*Note: Folder and file names may differ slightly from the actual implementation.*

## ⚙️ Installation and Setup

**Step 1: Clone the repository**

```bash
git clone https://github.com/purvadere05-eng/ShopSphere.git
```

**Step 2: Open the project**

```bash
cd ShopSphere
```

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Start the development server**

```bash
npm run dev
```

**Step 5: Open the application**

```text
http://localhost:5173/
```

## 🔄 How the Application Works

1. Users visit the ShopSphere home page.
2. Users explore available products.
3. Users search or filter products.
4. Users select a product and view its details.
5. Users add products to their shopping cart.
6. Redux Toolkit manages the cart state.
7. LocalStorage preserves cart items after page refresh.
8. Users proceed to checkout and enter shipping details.
9. Users place a demo order and receive confirmation.
10. Users can interact with the AI Shopping Assistant for shopping-related help.

## 🧠 Concepts Implemented

- React Functional Components
- JSX
- Props
- useState Hook
- React Router DOM
- Redux Toolkit
- Redux Store and Slice
- Event Handling
- Array map() and filter()
- Conditional Rendering
- Form Handling
- LocalStorage
- API Integration
- Async/Await
- Component-Based Architecture

## 🔐 AI Integration

The AI Shopping Assistant uses the Groq API.

**Architecture:**

```text
User
  |
  v
React Frontend
  |
  v
AI Backend Endpoint
  |
  v
Groq API
  |
  v
AI Response
  |
  v
React Chat Interface
```

The backend handles AI API requests so the secret API key does not need to be exposed in frontend code.

## 🗄️ Database

This project does not use MySQL.

It is primarily a frontend application, with Redux Toolkit managing cart state and LocalStorage storing cart data.

The AI Assistant uses a separate backend for API communication.

## 🌐 Deployment

The project is designed to be deployed using Vercel.

**GitHub Repository:**

https://github.com/purvadere05-eng/ShopSphere

## 🎯 Project Objective

The main objective of ShopSphere is to develop a practical e-commerce application using modern React technologies.

This project demonstrates frontend development, state management, routing, API integration, and shopping cart functionality.

## 🔮 Future Enhancements

- User authentication
- Backend database integration
- Real payment gateway
- Order history
- Product reviews and ratings
- Admin dashboard
- Wishlist functionality
- Advanced AI product recommendations

## 👩‍💻 Developed By

**Purva Mohan Dere**

Bachelor of Computer Science (BCS) – 2026

Java Full Stack Developer | React.js Developer

**GitHub:** https://github.com/purvadere05-eng

---

⭐ If you like this project, consider giving the repository a star!
