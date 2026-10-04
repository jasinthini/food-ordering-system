
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          setOrders([]);
          return;
        }

        const response = await api.get(`/orders/${userId}`);

        const backendOrders = response.data.orders || [];

        const ordersWithDetails = await Promise.all(
          backendOrders.map(async (order) => {
            try {
              const detailsResponse = await api.get(
                `/orders/details/${order.id}`
              );

              const details = detailsResponse.data;

              const itemsText = (details.items || [])
                .map(
                  (item) =>
                    `Food #${item.food_id} × ${item.quantity}`
                )
                .join(", ");

              return {
                id: order.id,
                date: "Recent",
                items: itemsText || "No items",
                total: order.total_amount,
                status: order.status,
              };
            } catch (error) {
              console.error(
                `Order details error for ${order.id}:`,
                error
              );

              return {
                id: order.id,
                date: "Recent",
                items: "View order details",
                total: order.total_amount,
                status: order.status,
              };
            }
          })
        );

        setOrders(ordersWithDetails);
      } catch (error) {
        console.error("Orders loading error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
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

            {loading ? (
              <div className="order-card">
                <h3>Loading orders...</h3>
                <p>Please wait while your orders are loaded.</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="order-card">
                <h3>No orders found</h3>
                <p>You have not placed any orders yet.</p>
              </div>
            ) : (
              orders.map((order) => (
                <div className="order-card" key={order.id}>

                  <div className="order-top">
                    <div>
                      <span className="order-label">ORDER</span>
                      <h2>#{order.id}</h2>
                    </div>

                    <span
                      className={`order-status ${
                        order.status?.toLowerCase() || ""
                      }`}
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
                        Rs.{" "}
                        {Number(order.total || 0).toLocaleString()}
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
              ))
            )}

          </div>
        </div>
      </section>
    </main>
  );
}

export default Orders;

