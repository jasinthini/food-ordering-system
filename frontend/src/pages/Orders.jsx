
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const sampleOrders = [
  {
    id: 1001,
    date: "02 Oct 2026",
    items: "Classic Burger × 2, Cheese Pizza × 1",
    total: 3150,
    status: "Delivered",
  },
  {
    id: 1002,
    date: "30 Sep 2026",
    items: "Chicken Noodles × 1, Fresh Juice × 2",
    total: 1850,
    status: "Preparing",
  },
  {
    id: 1003,
    date: "28 Sep 2026",
    items: "Margherita Pizza × 1",
    total: 1450,
    status: "Pending",
  },
];

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders([...savedOrders, ...sampleOrders]);
  }, []);

  return (
    <main className="orders-page">

      <section className="orders-header">
        <div className="container">
          <span className="small-title">MY ORDERS</span>
          <h1>Order History 🧾</h1>
          <p>Track and manage your recent food orders.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="orders-list">

            {orders.map((order) => (
              <div className="order-card" key={order.id}>

                <div className="order-top">
                  <div>
                    <span className="order-label">ORDER</span>
                    <h2>#{order.id}</h2>
                  </div>

                  <span
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-info">

                  <div>
                    <span>📅 Date</span>
                    <strong>{order.date}</strong>
                  </div>

                  <div>
                    <span>🍴 Items</span>
                    <strong>{order.items}</strong>
                  </div>

                  <div>
                    <span>💰 Total</span>
                    <strong>
                      Rs. {order.total.toLocaleString()}
                    </strong>
                  </div>

                </div>

                <div className="order-bottom">
                  <span>
                    Thank you for ordering with Foodie ❤️
                  </span>

                  <Link
                    to={`/orders/${order.id}`}
                    className="order-details-btn"
                  >
                    View Details →
                  </Link>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

    </main>
  );
}

export default Orders;

