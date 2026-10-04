import { useState } from "react";

const sampleOrders = [
  {
    id: 1008,
    customer: "John Silva",
    items: "Classic Burger × 2",
    total: 1700,
    status: "Delivered",
    date: "02 Oct 2026",
  },
  {
    id: 1007,
    customer: "Nimal Perera",
    items: "Cheese Pizza × 1",
    total: 1200,
    status: "Preparing",
    date: "02 Oct 2026",
  },
  {
    id: 1006,
    customer: "Kamal Fernando",
    items: "Chicken Noodles × 2",
    total: 1900,
    status: "Pending",
    date: "01 Oct 2026",
  },
  {
    id: 1005,
    customer: "Sarah Perera",
    items: "Pizza × 1, Fresh Juice × 2",
    total: 2100,
    status: "Delivered",
    date: "01 Oct 2026",
  },
];

function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = sampleOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="admin-orders-page">

      <section className="admin-orders-header">
        <div className="container">
          <span className="small-title">ORDER MANAGEMENT</span>

          <h1>Manage Orders 📦</h1>

          <p>
            Track customer orders and manage their delivery status.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-orders-toolbar">

            <div className="admin-order-search">
              🔍
              <input
                type="text"
                placeholder="Search order ID or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="order-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Orders</option>
              <option value="Pending">Pending</option>
              <option value="Preparing">Preparing</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>

          <div className="admin-orders-card">

            <div className="admin-orders-table-header">
              <div>Order</div>
              <div>Customer</div>
              <div>Items</div>
              <div>Total</div>
              <div>Status</div>
              <div>Date</div>
              <div>Action</div>
            </div>

            {filteredOrders.map((order) => (
              <div className="admin-order-row" key={order.id}>

                <div className="admin-order-id">
                  <strong>#{order.id}</strong>
                </div>

                <div className="admin-order-customer">
                  <div className="admin-order-avatar">
                    {order.customer.charAt(0)}
                  </div>
                  <span>{order.customer}</span>
                </div>

                <div className="admin-order-items">
                  {order.items}
                </div>

                <div className="admin-order-total">
                  Rs. {order.total.toLocaleString()}
                </div>

                <div>
                  <span
                    className={`admin-order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="admin-order-date">
                  {order.date}
                </div>

                <div>
                  <button className="admin-order-view-btn">
                    View →
                  </button>
                </div>

              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="admin-order-empty">
                <span>📦</span>
                <h3>No orders found</h3>
                <p>Try changing your search or status filter.</p>
              </div>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}

export default AdminOrders;