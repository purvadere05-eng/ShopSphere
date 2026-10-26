
import { Link } from "react-router-dom";

function MyOrders() {
  const orders = JSON.parse(localStorage.getItem("myOrders") || "[]");

  return (
    <main className="my-orders-page">
      <h2>My Orders</h2>
      <p>View your previous orders and order details.</p>

      {orders.length === 0 ? (
        <section className="empty-orders">
          <h3>No orders yet!</h3>
          <p>Your placed orders will appear here.</p>
          <Link to="/products">Explore Products</Link>
        </section>
      ) : (
        [...orders].reverse().map((order) => (
          <section className="order-card" key={order.id}>
            <div className="order-header">
              <div>
                <h3>Order #{order.id}</h3>
                <p>
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <span className="order-status">{order.status}</span>
            </div>

            <div className="order-products">
              {order.items.map((item) => (
                <div className="order-product" key={item.id}>
                  <span>{item.emoji}</span>
                  <div>
                    <strong>{item.name}</strong>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>
                </div>
              ))}
            </div>

            <div className="order-address">
              <h4>Delivery Address</h4>
              <p>{order.customer.name}</p>
              <p>{order.customer.phone}</p>
              <p>{order.customer.address}</p>
              <p>
                {order.customer.city} - {order.customer.pincode}
              </p>
            </div>

            <div className="order-total">
              <span>Total Amount</span>
              <strong>₹{order.total}</strong>
            </div>
          </section>
        ))
      )}

      <Link to="/products" className="orders-shop-btn">
        Continue Shopping
      </Link>
    </main>
  );
}

export default MyOrders;
