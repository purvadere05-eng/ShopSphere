import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 1999,
      category: "Electronics",
      emoji: "🎧",
      description:
        "Enjoy clear sound and wireless freedom with these headphones.",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 2499,
      category: "Electronics",
      emoji: "⌚",
      description: "Track your daily activity and stay connected.",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 1799,
      category: "Fashion",
      emoji: "👟",
      description: "Comfortable shoes for your daily runs and walks.",
    },
    {
      id: 4,
      name: "Backpack",
      price: 999,
      category: "Fashion",
      emoji: "🎒",
      description: "A practical backpack for everyday use.",
    },
    {
      id: 5,
      name: "Coffee Mug",
      price: 299,
      category: "Home",
      emoji: "☕",
      description: "Enjoy your favorite coffee in this stylish mug.",
    },
    {
      id: 6,
      name: "Table Lamp",
      price: 899,
      category: "Home",
      emoji: "💡",
      description: "Add comfortable lighting to your workspace.",
    },
  ];

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="product-details">
        <h2>Product not found!</h2>
        <Link to="/products">Back to Products</Link>
      </main>
    );
  }

  return (
    <main className="product-details">
      <div className="details-image">{product.emoji}</div>

      <div className="details-info">
        <p className="product-category">{product.category}</p>
        <h2>{product.name}</h2>
        <h3 className="product-price">₹{product.price}</h3>
        <p>{product.description}</p>

        <button
          className="add-cart-btn"
          onClick={() => {
            dispatch(addToCart(product));
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
        <br />
        <br />

        <Link to="/products">← Back to Products</Link>
      </div>
    </main>
  );
}

export default ProductDetails;
