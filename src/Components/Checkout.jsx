
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";


function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal === 0 || subtotal >= 999 ? 0 : 50;
  const grandTotal = subtotal + deliveryCharge;

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  
const handleSubmit = (e) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const order = {
    id: Date.now(),
    date: new Date().toISOString(),
    customer: { ...customer },
    items: cartItems.map((item) => ({ ...item })),
    total: grandTotal,
    status: "Order Placed",
  };

  const previousOrders = JSON.parse(
    localStorage.getItem("myOrders") || "[]"
  );

  localStorage.setItem(
    "myOrders",
    JSON.stringify([...previousOrders, order])
  );

  setOrderPlaced(true);
  dispatch(clearCart());
};


  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <section className="order-success">
          <div className="success-icon">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you, {customer.name}! Your order has been confirmed.
          </p>
          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h2 className="checkout-heading">Checkout</h2>
      <p className="checkout-subtitle">
        Complete your details to place your order.
      </p>

      {cartItems.length === 0 ? (
        <section className="empty-checkout">
          <h3>Your cart is empty</h3>
          <p>Add products before proceeding to checkout.</p>
          <Link to="/products" className="continue-shopping">
            Explore Products
          </Link>
        </section>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h3>Delivery Information</h3>

            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={customer.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="10-digit mobile number"
              value={customer.phone}
              onChange={handleChange}
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              required
            />

            <label htmlFor="address">Full Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="House number, street, area"
              value={customer.address}
              onChange={handleChange}
              rows={3}
              required
            />

            <div className="address-row">
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city"
                  value={customer.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="pincode">PIN Code</label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  placeholder="6-digit PIN"
                  value={customer.pincode}
                  onChange={handleChange}
                  pattern="[0-9]{6}"
                  title="Enter a valid 6-digit PIN code"
                  required
                />
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order · ₹{grandTotal}
            </button>

            <p className="demo-note">
              Demo checkout only. No real payment is processed.
            </p>
          </form>

          <section className="order-summary">
            <h3>Order Summary</h3>

            {cartItems.map((item) => (
              <div className="summary-product" key={item.id}>
                <span className="summary-emoji">{item.emoji}</span>

                <div className="summary-product-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>

                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}

            <div className="summary-line">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="summary-total">
              <span>Grand Total</span>
              <strong>₹{grandTotal}</strong>
            </div>

            <p className="delivery-note">
              {deliveryCharge === 0
                ? "You qualify for free delivery!"
                : "Add products worth ₹" +
                  (999 - subtotal) +
                  " more for free delivery."}
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default Checkout;
