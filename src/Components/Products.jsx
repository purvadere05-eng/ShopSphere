import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const dispatch = useDispatch();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      category: "Electronics",
      emoji: "🎧",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      category: "Electronics",
      emoji: "⌚",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 1799,
      category: "Fashion",
      emoji: "👟",
    },
    { id: 4, name: "Backpack", price: 999, category: "Fashion", emoji: "🎒" },
    { id: 5, name: "Coffee Mug", price: 299, category: "Home", emoji: "☕" },
    { id: 6, name: "Table Lamp", price: 899, category: "Home", emoji: "💡" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="products-page">
      <h2>Explore Our Products</h2>
      <p className="products-subtitle">Find something you will love.</p>

      <input
        className="search-input"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="category-filters">
        {["All", "Electronics", "Fashion", "Home"].map((item) => (
          <button
            key={item}
            className={category === item ? "active-filter" : ""}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-emoji">{product.emoji}</div>
              <p className="product-category">{product.category}</p>
              <h3>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h3>
              <p className="product-price">₹{product.price}</p>

              <button
                className="add-cart-btn"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </article>
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </main>
  );
}

export default Products;
