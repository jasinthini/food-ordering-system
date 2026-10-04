
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const response = await api.get("/users/");
      console.log("USERS API RESPONSE:", response.data);

      setUsers(response.data.users || response.data || []);
    } catch (error) {
      console.error("User loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (user) => {
    const newRole = user.role === "Admin" ? "Customer" : "Admin";

    const confirmChange = window.confirm(
      `Change ${user.name}'s role to ${newRole}?`
    );

    if (!confirmChange) return;

    try {
      await api.put(`/users/${user.id}/role`, {
        role: newRole,
      });

      alert("User role updated successfully!");
      loadUsers();
    } catch (error) {
      console.error("Role update error:", error);
      alert(
        error.response?.data?.detail || "Failed to update user role."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/users/${id}`);

      alert("User deleted successfully!");
      loadUsers();
    } catch (error) {
      console.error("User delete error:", error);
      alert(
        error.response?.data?.detail || "Failed to delete user."
      );
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="admin-users-page">
      <section className="admin-users-header">
        <div className="container">
          <span className="small-title">USER MANAGEMENT</span>

          <h1>Manage Users 👥</h1>

          <p>
            View and manage customer and administrator accounts.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-users-toolbar">

            <div className="admin-user-search">
              🔍
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="user-count">
              <strong>{filteredUsers.length}</strong>
              <span>Users</span>
            </div>

          </div>

          <div className="admin-users-card">

            <div className="admin-users-table-header">
              <div>User</div>
              <div>Email</div>
              <div>Role</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {loading ? (
              <div className="admin-user-empty">
                <h3>Loading users...</h3>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div className="admin-user-row" key={user.id}>

                  <div className="admin-user-info">

                    <div className="admin-user-avatar">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <strong>{user.name}</strong>
                      <span>User ID: #{user.id}</span>
                    </div>

                  </div>

                  <div className="admin-user-email">
                    {user.email}
                  </div>

                  <div>
                    <span
                      className={
                        user.role === "Admin"
                          ? "user-role admin"
                          : "user-role customer"
                      }
                    >
                      {user.role}
                    </span>
                  </div>

                  <div>
                    <span className="user-status active">
                      Active
                    </span>
                  </div>

                  <div className="admin-user-actions">

                    <button
                      className="edit-user-btn"
                      onClick={() => handleRoleChange(user)}
                    >
                      ✏️ Change Role
                    </button>

                    <button
                      className="delete-user-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>
              ))
            )}

            {!loading && filteredUsers.length === 0 && (
              <div className="admin-user-empty">
                <span>👥</span>
                <h3>No users found</h3>
                <p>Try searching with another name or email.</p>
              </div>
            )}

          </div>

        </div>
      </section>
    </main>
  );
}

export default AdminUsers;

