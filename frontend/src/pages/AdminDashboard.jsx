
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_revenue: 0,
    available_foods: 0,
    total_users: 0,
  });

  const [orderStatus, setOrderStatus] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          summaryResponse,
          statusResponse,
          categoryResponse,
        ] = await Promise.all([
          api.get("/dashboard/summary"),
          api.get("/dashboard/order-status"),
          api.get("/dashboard/category-count"),
        ]);

        setSummary(summaryResponse.data);
        setOrderStatus(statusResponse.data);
        setCategoryCount(categoryResponse.data);
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="admin-page">

      <section className="admin-header">
        <div className="container">
          <span className="small-title">ADMIN PANEL</span>
          <h1>Dashboard 📊</h1>
          <p>
            Manage your food ordering system from one place.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {loading ? (
            <div className="empty-box">
              <h2>Loading dashboard...</h2>
            </div>
          ) : (
            <>
              {/* Statistics */}
              <div className="admin-stats">

                <div className="admin-stat-card">
                  <div className="admin-stat-icon">📦</div>

                  <div>
                    <span>Total Orders</span>
                    <strong>
                      {summary.total_orders ?? 0}
                    </strong>
                    <small>From database</small>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon">💰</div>

                  <div>
                    <span>Total Revenue</span>
                    <strong>
                      Rs.{" "}
                      {Number(
                        summary.total_revenue ?? 0
                      ).toLocaleString()}
                    </strong>
                    <small>From completed orders</small>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon">🍔</div>

                  <div>
                    <span>Available Foods</span>
                    <strong>
                      {summary.available_foods ?? 0}
                    </strong>
                    <small>Currently available</small>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon">👥</div>

                  <div>
                    <span>Total Users</span>
                    <strong>
                      {summary.total_users ?? 0}
                    </strong>
                    <small>Registered users</small>
                  </div>
                </div>

              </div>

              {/* Dashboard Grid */}
              <div className="admin-dashboard-grid">

                {/* Order Status */}
                <div className="admin-card">

                  <div className="admin-card-header">
                    <div>
                      <span className="small-title">
                        OVERVIEW
                      </span>
                      <h2>Order Status</h2>
                    </div>
                  </div>

                  <div className="status-list">

                    {Array.isArray(orderStatus) &&
                    orderStatus.length > 0 ? (
                      orderStatus.map((item, index) => (
                        <div
                          className="status-row"
                          key={index}
                        >
                          <span>
                            {item.status}
                          </span>

                          <strong>
                            {item.count}
                          </strong>
                        </div>
                      ))
                    ) : (
                      <p>No order status data available.</p>
                    )}

                  </div>

                </div>

                {/* Food Categories */}
                <div className="admin-card">

                  <div className="admin-card-header">
                    <div>
                      <span className="small-title">
                        POPULAR
                      </span>
                      <h2>Food Categories</h2>
                    </div>
                  </div>

                  <div className="category-list">

                    {Array.isArray(categoryCount) &&
                    categoryCount.length > 0 ? (
                      categoryCount.map((item, index) => (
                        <div
                          className="admin-category-row"
                          key={index}
                        >
                          <span>
                            🍴 {item.category}
                          </span>

                          <strong>
                            {item.count} Foods
                          </strong>
                        </div>
                      ))
                    ) : (
                      <p>No category data available.</p>
                    )}

                  </div>

                </div>

              </div>

              {/* Recent Orders */}
              <div className="admin-card recent-orders-card">

                <div className="admin-card-header">
                  <div>
                    <span className="small-title">
                      DATABASE
                    </span>

                    <h2>Dashboard Data</h2>
                  </div>
                </div>

                <div className="recent-orders">

                  <div className="recent-order-row">
                    <strong>📊</strong>
                    <span>
                      Total Orders
                    </span>
                    <span>
                      {summary.total_orders ?? 0}
                    </span>
                    <b className="status-badge delivered">
                      Live
                    </b>
                  </div>

                  <div className="recent-order-row">
                    <strong>💰</strong>
                    <span>
                      Total Revenue
                    </span>
                    <span>
                      Rs.{" "}
                      {Number(
                        summary.total_revenue ?? 0
                      ).toLocaleString()}
                    </span>
                    <b className="status-badge delivered">
                      Live
                    </b>
                  </div>

                  <div className="recent-order-row">
                    <strong>🍔</strong>
                    <span>
                      Available Foods
                    </span>
                    <span>
                      {summary.available_foods ?? 0}
                    </span>
                    <b className="status-badge preparing">
                      Active
                    </b>
                  </div>

                </div>

              </div>
            </>
          )}

        </div>
      </section>

    </main>
  );
}

export default AdminDashboard;

