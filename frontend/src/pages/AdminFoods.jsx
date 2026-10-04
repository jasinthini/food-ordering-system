
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminFoods() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const loadFoods = async () => {
    try {
      const response = await api.get("/foods/", {
        params: {
          search: search || undefined,
        },
      });

      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Food loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFoods();
  }, [search]);

  const handleAddFood = async (e) => {
    e.preventDefault();

    if (!name || !price || !categoryId) {
      alert("Please fill Name, Price and Category ID.");
      return;
    }

    try {
      await api.post("/foods/", {
        name: name,
        description: description || null,
        price: Number(price),
        image_url: imageUrl || null,
        is_available: isAvailable,
        category_id: Number(categoryId),
      });

      alert("Food added successfully! 🎉");

      setName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategoryId("");
      setIsAvailable(true);

      setShowForm(false);

      loadFoods();
    } catch (error) {
      console.error("Add food error:", error);

      alert(
        error.response?.data?.detail ||
          "Failed to add food."
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/foods/${id}`);

      alert("Food deleted successfully!");

      loadFoods();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Failed to delete food."
      );
    }
  };

  return (
    <main className="admin-foods-page">

      <section className="admin-foods-header">
        <div className="container">
          <span className="small-title">FOOD MANAGEMENT</span>

          <h1>Manage Foods 🍔</h1>

          <p>
            Add, update and manage the food items available in your restaurant.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-foods-toolbar">

            <div className="admin-food-search">
              🔍

              <input
                type="text"
                placeholder="Search food items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              className="add-food-btn"
              onClick={() => setShowForm(!showForm)}
            >
              + Add New Food
            </button>

          </div>

          {showForm && (
            <div className="admin-foods-card" style={{ padding: "25px", marginBottom: "25px" }}>

              <h2 style={{ marginBottom: "20px" }}>
                Add New Food
              </h2>

              <form onSubmit={handleAddFood}>

                <div className="form-group">
                  <label>Food Name</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter food name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    className="form-control"
                    placeholder="Enter food description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Price</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Category ID</label>

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Example: 1"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={(e) =>
                        setIsAvailable(e.target.checked)
                      }
                    />{" "}
                    Available
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Food
                </button>

                <button
                  type="button"
                  className="btn btn-light"
                  style={{ marginLeft: "10px" }}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

              </form>

            </div>
          )}

          <div className="admin-foods-card">

            <div className="admin-table-header">
              <div>Food</div>
              <div>Category</div>
              <div>Price</div>
              <div>Status</div>
              <div>Actions</div>
            </div>

            {loading ? (
              <div className="admin-food-empty">
                <h3>Loading foods...</h3>
              </div>
            ) : (
              foods.map((food) => (
                <div className="admin-food-row" key={food.id}>

                  <div className="admin-food-name">

                    <div className="admin-food-icon">
                      🍽️
                    </div>

                    <div>
                      <strong>{food.name}</strong>
                      <span>
                        Food ID: #{food.id}
                      </span>
                    </div>

                  </div>

                  <div className="admin-food-category">
                    Category #{food.category_id}
                  </div>

                  <div className="admin-food-price">
                    Rs. {Number(food.price).toLocaleString()}
                  </div>

                  <div>
                    <span
                      className={
                        food.is_available
                          ? "food-admin-status available"
                          : "food-admin-status unavailable"
                      }
                    >
                      {food.is_available
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  <div className="admin-food-actions">

                    <button className="edit-food-btn">
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-food-btn"
                      onClick={() => handleDelete(food.id)}
                    >
                      🗑️ Delete
                    </button>

                  </div>

                </div>
              ))
            )}

            {!loading && foods.length === 0 && (
              <div className="admin-food-empty">

                <span>🍽️</span>

                <h3>No food items found</h3>

                <p>
                  There are no foods available in the database.
                </p>

              </div>
            )}

          </div>

        </div>
      </section>

    </main>
  );
}

export default AdminFoods;

