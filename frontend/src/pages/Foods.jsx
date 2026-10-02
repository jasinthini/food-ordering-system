
import { useEffect, useState } from "react";
import api from "../services/api";

const defaultFoodImage =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=85";

function Foods() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);

      const params = {};

      if (search.trim()) {
        params.search = search;
      }

      if (availableOnly) {
        params.is_available = true;
      }

      const response = await api.get("/foods/", { params });

      setFoods(response.data.foods);
    } catch (error) {
      console.error("Failed to load foods:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFoods();
  };

  const handleAddToCart = async (foodId) => {
    try {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        alert("Please login first");
        return;
      }

      await api.post("/cart/", {
        user_id: Number(userId),
        food_id: foodId,
        quantity: 1,
      });

      alert("Food added to cart!");
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to add to cart");
    }
  };

  return (
    <main className="foods-page">
      <section className="foods-header">
        <div className="container">
          <span className="small-title">OUR MENU</span>

          <h1>Discover Delicious Food 🍴</h1>

          <p>
            Fresh, tasty and carefully prepared meals for every craving.
          </p>

          <form className="food-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search your favourite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">Search</button>
          </form>

          <label className="available-filter">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => {
                setAvailableOnly(e.target.checked);
              }}
            />
            Show available foods only
          </label>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading-box">
              <h2>Loading delicious food...</h2>
            </div>
          ) : foods.length === 0 ? (
            <div className="empty-box">
              <span>🍽️</span>
              <h2>No foods found</h2>
              <p>Try searching for another food.</p>
            </div>
          ) : (
            <div className="food-grid">
              {foods.map((food) => (
                <div className="food-card" key={food.id}>
                  <div className="food-image-wrapper">
                    <img
                      src={food.image_url || defaultFoodImage}
                      alt={food.name}
                      className="food-image"
                    />

                    <span
                      className={
                        food.is_available
                          ? "food-status available"
                          : "food-status unavailable"
                      }
                    >
                      {food.is_available ? "Available" : "Unavailable"}
                    </span>
                  </div>

                  <div className="food-content">
                    <h3>{food.name}</h3>

                    <p className="food-description">
                      {food.description || "Delicious food prepared with care."}
                    </p>

                    <div className="food-bottom">
                      <strong>Rs. {food.price}</strong>

                      {food.is_available && (
                        <button
                          className="add-cart-btn"
                          onClick={() => handleAddToCart(food.id)}
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Foods;

