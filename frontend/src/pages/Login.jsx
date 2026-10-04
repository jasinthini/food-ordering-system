import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", null, {
        params: {
          email,
          password,
        },
      });

      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("role", response.data.role);

      alert("Login successful!");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Login failed. Please check your email and password."
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        <div className="auth-image">
          <img
            src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=85"
            alt="Delicious food"
          />

          <div className="auth-image-content">
            <span>🍴</span>
            <h2>Good food brings people together.</h2>
            <p>
              Discover delicious meals and enjoy a simple food ordering
              experience.
            </p>
          </div>
        </div>

        <div className="auth-form-section">
          <div className="auth-form-box">

            <div className="auth-logo">
              🍴 <span>Foodie</span>
            </div>

            <h1>Welcome Back!</h1>

            <p className="auth-subtitle">
              Login to continue ordering your favourite food.
            </p>

            <form onSubmit={handleLogin}>

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
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-submit">
                Login →
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <p className="auth-footer">
              Don't have an account?{" "}
              <Link to="/register">Create an account</Link>
            </p>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Login;