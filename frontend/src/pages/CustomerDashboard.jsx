import { Link } from "react-router-dom";

const recentOrders = [
  {
    id: 1008,
    items: "Classic Burger × 2",
    total: 1700,
    status: "Delivered",
    date: "02 Oct 2026",
  },
  {
    id: 1007,
    items: "Cheese Pizza × 1",
    total: 1200,
    status: "Preparing",
    date: "02 Oct 2026",
  },
  {
    id: 1006,
    items: "Chicken Noodles × 2",
    total: 1900,
    status: "Pending",
    date: "01 Oct 2026",
  },
];

function CustomerDashboard() {
  return (
    <main className="customer-dashboard-page">

      <section className="customer-dashboard-header">
        <div className="container">

          <div className="customer-welcome">
            <div>
              <span className="small-title">WELCOME BACK</span>

              <h1>
                Hello, Food Lover! 👋
              </h1>

              <p>
                What delicious meal are you craving today?
              </p>
            </div>

            <Link to="/foods" className="dashboard-order-btn">
              🍔 Order Food
            </Link>
          </div>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="customer-stats">

            <div className="customer-stat-card">
              <div className="customer-stat-icon">📦</div>
              <div>
                <span>Total Orders</span>
                <strong>12</strong>
              </div>
            </div>

            <div className="customer-stat-card">
              <div className="customer-stat-icon">🛒</div>
              <div>
                <span>Cart Items</span>
                <strong>3</strong>
              </div>
            </div>

            <div className="customer-stat-card">
              <div className="customer-stat-icon">❤️</div>
              <div>
                <span>Favourite Foods</span>
                <strong>6</strong>
              </div>
            </div>

            <div className="customer-stat-card">
              <div className="customer-stat-icon">💰</div>
              <div>
                <span>Total Spent</span>
                <strong>Rs. 18,450</strong>
              </div>
            </div>

          </div>

          <div className="customer-dashboard-grid">

            <div className="customer-dashboard-card">

              <div className="customer-card-header">
                <div>
                  <span className="small-title">CURRENT ORDER</span>
                  <h2>Order #1007</h2>
                </div>

                <span className="customer-order-status preparing">
                  Preparing
                </span>
              </div>

              <div className="order-progress">

                <div className="progress-step completed">
                  <div>✓</div>
                  <span>Order Placed</span>
                </div>

                <div className="progress-line active"></div>

                <div className="progress-step active">
                  <div>🍳</div>
                  <span>Preparing</span>
                </div>

                <div className="progress-line"></div>

                <div className="progress-step">
                  <div>🛵</div>
                  <span>On the Way</span>
                </div>

                <div className="progress-line"></div>

                <div className="progress-step">
                  <div>✓</div>
                  <span>Delivered</span>
                </div>

              </div>

              <div className="current-order-info">
                <div>
                  <span>Items</span>
                  <strong>Cheese Pizza × 1</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>Rs. 1,200</strong>
                </div>

                <Link to="/orders/1007">
                  View Details →
                </Link>
              </div>

            </div>

            <div className="customer-dashboard-card">

              <div className="customer-card-header">
                <div>
                  <span className="small-title">QUICK ACTIONS</span>
                  <h2>What would you like?</h2>
                </div>
              </div>

              <div className="quick-actions">

                <Link to="/foods" className="quick-action">
                  <span>🍔</span>
                  <div>
                    <strong>Browse Menu</strong>
                    <small>Explore delicious foods</small>
                  </div>
                </Link>

                <Link to="/cart" className="quick-action">
                  <span>🛒</span>
                  <div>
                    <strong>View Cart</strong>
                    <small>Check your selected items</small>
                  </div>
                </Link>

                <Link to="/orders" className="quick-action">
                  <span>🧾</span>
                  <div>
                    <strong>My Orders</strong>
                    <small>View your order history</small>
                  </div>
                </Link>

              </div>

            </div>

          </div>

          <div className="customer-dashboard-card recent-customer-orders">

            <div className="customer-card-header">
              <div>
                <span className="small-title">ORDER HISTORY</span>
                <h2>Recent Orders</h2>
              </div>

              <Link to="/orders" className="customer-view-all">
                View All →
              </Link>
            </div>

            <div className="customer-orders-list">

              {recentOrders.map((order) => (
                <div className="customer-order-row" key={order.id}>

                  <div>
                    <strong>#{order.id}</strong>
                    <span>{order.date}</span>
                  </div>

                  <p>{order.items}</p>

                  <strong>
                    Rs. {order.total.toLocaleString()}
                  </strong>

                  <span
                    className={`customer-order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default CustomerDashboard;