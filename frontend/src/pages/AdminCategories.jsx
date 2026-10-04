import { useState } from "react";

const sampleCategories = [
  { id: 1, name: "Burgers", description: "Juicy and delicious burgers", foods: 14 },
  { id: 2, name: "Pizza", description: "Freshly baked pizzas", foods: 10 },
  { id: 3, name: "Noodles", description: "Hot and tasty noodles", foods: 8 },
  { id: 4, name: "Drinks", description: "Cool and refreshing drinks", foods: 9 },
  { id: 5, name: "Desserts", description: "Sweet treats for everyone", foods: 7 },
];

function AdminCategories() {
  const [search, setSearch] = useState("");

  const filteredCategories = sampleCategories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="admin-categories-page">

      <section className="admin-categories-header">
        <div className="container">
          <span className="small-title">CATEGORY MANAGEMENT</span>
          <h1>Manage Categories 📂</h1>
          <p>
            Organize your food items into clear and easy-to-browse categories.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-category-toolbar">

            <div className="admin-category-search">
              🔍
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="add-category-btn">
              + Add Category
            </button>

          </div>

          <div className="admin-category-grid">

            {filteredCategories.map((category) => (
              <div className="admin-category-card" key={category.id}>

                <div className="admin-category-icon">
                  {category.name === "Burgers" && "🍔"}
                  {category.name === "Pizza" && "🍕"}
                  {category.name === "Noodles" && "🍜"}
                  {category.name === "Drinks" && "🥤"}
                  {category.name === "Desserts" && "🍰"}
                </div>

                <div className="admin-category-content">
                  <span>Category #{category.id}</span>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>

                <div className="admin-category-footer">
                  <strong>{category.foods} Foods</strong>

                  <div className="admin-category-actions">
                    <button className="edit-category-btn">
                      ✏️
                    </button>

                    <button className="delete-category-btn">
                      🗑️
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>

          {filteredCategories.length === 0 && (
            <div className="admin-category-empty">
              <span>📂</span>
              <h3>No categories found</h3>
              <p>Try searching with another category name.</p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default AdminCategories;