
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);

      // Get all users
      const usersResponse = await api.get("/users/");
      const users = usersResponse.data.users || usersResponse.data || [];

      // Get orders for each user
      const orderRequests = users.map(async (user) => {
        try {
          const response = await api.get(`/orders/${user.id}`);

          const userOrders = response.data.orders || [];

          return userOrders.map((order) => ({
            id: order.id,
            customer: user.name,
            items: "View order details",
            total: order.total_amount,
            status: order.status,
            date: "N/A",
            userId: user.id,
          }));
        } catch (error) {
          console.error(`Orders loading error for user ${user.id}:`, error);
          return [];
        }
      });

      const orderResults = await Promise.all(orderRequests);

      const allOrders = orderResults.flat();

      setOrders(allOrders);
    } catch (error) {
      console.error("Admin orders loading error:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer?.toLowerCase().includes(search.toLowerCase()) ||
      order.id?.toString().includes(search);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });


  
const handleStatusChange = async (orderId, newStatus) => {
  try {
    await api.put(`/orders/${orderId}/status`, null, {
      params: {
        status: newStatus,
      },
    });

    alert("Order status updated successfully!");

    loadOrders();
  } catch (error) {
    console.error("Status update error:", error);
    alert(
      error.response?.data?.detail ||
        "Failed to update order status."
    );
  }
};



  const handleViewOrder = async (orderId) => {
    try {
      const response = await api.get(`/orders/details/${orderId}`);

      console.log("ORDER DETAILS:", response.data);

      const order = response.data;

      const itemsText = order.items
        .map(
          (item) =>
            `Food ID: ${item.food_id} | Quantity: ${item.quantity} | Price: Rs. ${item.price}`
        )
        .join("\n");

      alert(
        `Order #${order.order_id}\n\n` +
          `User ID: ${order.user_id}\n` +
          `Total: Rs. ${order.total_amount}\n` +
          `Status: ${order.status}\n\n` +
          `Items:\n${itemsText}`
      );
    } catch (error) {
      console.error("Order details error:", error);
      alert(
        error.response?.data?.detail ||
          "Failed to load order details."
      );
    }
  };

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
              <option value="Confirmed">Confirmed</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
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

            {loading ? (
              <div className="admin-order-empty">
                <span>📦</span>
                <h3>Loading orders...</h3>
                <p>Please wait while orders are loaded.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  className="admin-order-row"
                  key={order.id}
                >

                  <div className="admin-order-id">
                    <strong>#{order.id}</strong>
                  </div>

                  <div className="admin-order-customer">
                    <div className="admin-order-avatar">
                      {order.customer?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <span>{order.customer}</span>
                  </div>

                  <div className="admin-order-items">
                    {order.items}
                  </div>

                  <div className="admin-order-total">
                    Rs. {Number(order.total || 0).toLocaleString()}
                  </div>

                  ```jsx
<div>
  <select
    className="order-status-filter"
    value={order.status}
    onChange={(e) =>
      handleStatusChange(order.id, e.target.value)
    }
  >
    <option value="Pending">Pending</option>
    <option value="Preparing">Preparing</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div>
```


                  <div className="admin-order-date">
                    {order.date}
                  </div>

                  <div>
                    <button
                      className="admin-order-view-btn"
                      onClick={() => handleViewOrder(order.id)}
                    >
                      View →
                    </button>
                  </div>

                </div>
              ))
            )}

            {!loading && filteredOrders.length === 0 && (
              <div className="admin-order-empty">
                <span>📦</span>
                <h3>No orders found</h3>
                <p>
                  Try changing your search or status filter.
                </p>
              </div>
            )}

          </div>

        </div>
      </section>
    </main>
  );
}

export default AdminOrders;

