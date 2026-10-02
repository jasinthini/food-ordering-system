
import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">🍽️ Fresh • Fast • Delicious</span>

            <h1>
              Delicious Food,
              <br />
              <span>Delivered With Love.</span>
            </h1>

            <p>
              Discover delicious meals, order your favourites, and enjoy
              fresh food delivered right to your doorstep.
            </p>

            <div className="hero-buttons">
              <Link to="/foods" className="btn btn-primary">
                Explore Menu →
              </Link>

              <Link to="/register" className="btn btn-light">
                Create Account
              </Link>
            </div>

            <div className="hero-stats">
              <div>
                <strong>50+</strong>
                <span>Food Items</span>
              </div>

              <div>
                <strong>10+</strong>
                <span>Categories</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Fresh</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85"
              alt="Delicious food"
            />

            <div className="floating-card">
              <span>⭐</span>
              <div>
                <strong>Fresh & Delicious</strong>
                <small>Made with care</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <span className="small-title">EXPLORE</span>
            <h2>What are you craving?</h2>
            <p>Choose from our delicious food categories.</p>
          </div>

          <div className="category-grid">
            <div className="category-card">
              <div className="category-icon">🍔</div>
              <h3>Burgers</h3>
              <p>Juicy & delicious</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🍕</div>
              <h3>Pizza</h3>
              <p>Freshly baked</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🍜</div>
              <h3>Noodles</h3>
              <p>Hot & tasty</p>
            </div>

            <div className="category-card">
              <div className="category-icon">🥤</div>
              <h3>Drinks</h3>
              <p>Cool & refreshing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div>
              <span>🍴</span>
              <h2>Hungry already?</h2>
              <p>Find your favourite food and order now.</p>
            </div>

            <Link to="/foods" className="btn btn-primary">
              Order Now →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

