import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🍴 <span>Foodie</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/foods">Menu</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/cart">Cart 🛒</Link>
          <Link to="/login">Login</Link>

          <Link to="/register" className="nav-register">
            Sign Up
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;