import { useState } from "react";

const sampleUsers = [
  {
    id: 1,
    name: "John Silva",
    email: "john@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 2,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Nimal Perera",
    email: "nimal@example.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: 4,
    name: "Kamal Fernando",
    email: "kamal@example.com",
    role: "Customer",
    status: "Inactive",
  },
];

function AdminUsers() {
  const [search, setSearch] = useState("");

  const filteredUsers = sampleUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
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

            {filteredUsers.map((user) => (
              <div className="admin-user-row" key={user.id}>

                <div className="admin-user-info">

                  <div className="admin-user-avatar">
                    {user.name.charAt(0)}
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
                  <span
                    className={
                      user.status === "Active"
                        ? "user-status active"
                        : "user-status inactive"
                    }
                  >
                    {user.status}
                  </span>
                </div>

                <div className="admin-user-actions">

                  <button className="edit-user-btn">
                    ✏️ Edit
                  </button>

                  <button className="delete-user-btn">
                    🗑️ Delete
                  </button>

                </div>

              </div>
            ))}

            {filteredUsers.length === 0 && (
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