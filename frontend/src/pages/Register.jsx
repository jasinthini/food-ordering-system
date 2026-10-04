import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert(response.data.message);

      setName("");
      setEmail("");
      setPassword("");
      setRole("Customer");
    } catch (error) {
      alert(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container register-container">

        <div className="auth-image">
          <img
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85"
            alt="Fresh food"
          />

          <div className="auth-image-content">
            <span>🥗</span>
            <h2>Fresh choices. Happy moments.</h2>
            <p>
              Create your account and discover delicious food made for every
              craving.
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-box">

            <div className="auth-logo">
              🍴 <span>Foodie</span>
            </div>

            <h1>Create Account</h1>

            <p className="auth-subtitle">
              Join Foodie and start ordering your favourite meals.
            </p>

            <form onSubmit={handleRegister}>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Account Type</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <button type="submit" className="auth-submit">
                Create Account →
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="auth-footer">
              Already have an account?{" "}
              <Link to="/login">Login here</Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Register;