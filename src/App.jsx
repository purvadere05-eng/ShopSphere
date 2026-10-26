
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from './Components/Products'
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import MyOrders from "./Components/MyOrders";
import AIAssistant from "./Components/AIAssistant";
import "./App.css";

function Home() {
  return (
    <>
      {/* Main Section */}
      <main>
        <section className="hero">
          <p className="tagline">YOUR SMART SHOPPING DESTINATION</p>

          <h2>
            Discover Your <span>Next Favorite</span>
          </h2>

          <p className="description">
            Explore amazing products, find your perfect match, and enjoy
            a smarter shopping experience with ShopSphere.
          </p>

          <Link to="/products" className="explore-btn">
            Explore Products →
          </Link>
        </section>

        {/* Features */}
        <section className="features">
          <div className="feature-card">
            <h3>🛍️ Quality Products</h3>
            <p>Discover products for your everyday needs.</p>
          </div>

          <div className="feature-card">
            <h3>🤖 AI Shopping Assistant</h3>
            <p>Get help finding products that suit your needs.</p>
          </div>

          <div className="feature-card">
            <h3>❤️ Your Wishlist</h3>
            <p>Keep your favorite products in one place.</p>
          </div>
        </section>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <header className="header">
        <h1 className="logo">
          <Link to="/" className="logo-link">
            ShopSphere
          </Link>
        </h1>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/ai-assistant">AI Assistant</Link>
          <Link to="/my-orders">My Orders</Link>
        </nav>

        <button className="login-btn">Login</button>
      </header>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 ShopSphere. Shop smarter, live better.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
