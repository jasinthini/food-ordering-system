
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const sampleOrder = {
  id: 1001,
  date: "02 Oct 2026",
  status: "Delivered",
  address: "123 Main Street, Jaffna",
  phone: "077 123 4567",
  items: [
    {
      name: "Classic Burger",
      quantity: 2,
      price: 850,
    },
    {
      name: "Cheese Pizza",
      quantity: 1,
      price: 1200,
    },
  ],
};

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const foundOrder = savedOrders.find(
      (item) => String(item.id) === String(id)
    );

    if (foundOrder) {
      setOrder({
        ...foundOrder,
        address: foundOrder.address || "Not provided",
        phone: foundOrder.phone || "Not provided",
        items: foundOrder.itemsList || [],
      });
    } else if (String(id) === "1001") {
      setOrder(sampleOrder);
    }
  }, [id]);

  if (!order) {
    return (
      <main className="order-details-page">
        <section className="section">
          <div className="container">
            <div className="empty-box">
              <span>🧾</span>
              <h2>Order not found</h2>
              <p>We couldn't find this order.</p>

              <Link
                to="/orders"
                className="btn btn-primary"
              >
                ← Back to Orders
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const subtotal = order.items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryFee = 250;
  const total = subtotal + deliveryFee;

  return (
    <main className="order-details-page">

      <section className="order-details-header">
        <div className="container">
          <span className="small-title">
            ORDER DETAILS
          </span>

          <h1>
            Order #{id} 🧾
          </h1>

          <p>
            View your complete order information.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container order-details-layout">

          {/* Main Details */}
          <div className="order-details-main">

            <div className="details-card">
              <div className="details-top">

                <div>
                  <span>ORDER NUMBER</span>
                  <h2>#{order.id}</h2>
                </div>

                <span
                  className={`order-status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>

              <div className="details-date">
                📅 Ordered on {order.date}
              </div>
            </div>

            <div className="details-card">
              <h2>🍴 Ordered Items</h2>

              <div className="detail-items">

                {order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div
                      className="detail-item"
                      key={index}
                    >

                      <div className="detail-item-icon">
                        🍽️
                      </div>

                      <div className="detail-item-info">
                        <h3>{item.name}</h3>

                        <span>
                          Rs.{" "}
                          {item.price.toLocaleString()} ×{" "}
                          {item.quantity}
                        </span>
                      </div>

                      <strong>
                        Rs.{" "}
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </strong>

                    </div>
                  ))
                ) : (
                  <p>
                    Order item details are not available.
                  </p>
                )}

              </div>
            </div>

            <div className="details-card">
              <h2>📍 Delivery Information</h2>

              <div className="delivery-info">

                <div>
                  <span>Delivery Address</span>
                  <strong>{order.address}</strong>
                </div>

                <div>
                  <span>Phone Number</span>
                  <strong>{order.phone}</strong>
                </div>

              </div>
            </div>

          </div>

          {/* Summary */}
          <div className="details-summary">

            <div className="details-card">
              <h2>💰 Payment Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>

                <strong>
                  Rs. {subtotal.toLocaleString()}
                </strong>
              </div>

              <div className="summary-row">
                <span>Delivery Fee</span>

                <strong>
                  Rs. {deliveryFee.toLocaleString()}
                </strong>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>

                <strong>
                  Rs. {total.toLocaleString()}
                </strong>
              </div>

              <div className="payment-complete">
                ✓ Order placed successfully
              </div>

            </div>

            <Link
              to="/orders"
              className="back-orders"
            >
              ← Back to My Orders
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default OrderDetails;

