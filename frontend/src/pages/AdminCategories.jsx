
import { useEffect, useState } from "react";
import api from "../services/api";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadCategories = async () => {
    try {
      const response = await api.get("/categories/");
      console.log("CATEGORY API RESPONSE:", response.data);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Category loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name.");
      return;
    }

    const categoryData = {
      name: name.trim(),
      description: description.trim() || null,
    };

    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, categoryData);
        alert("Category updated successfully!");
      } else {
        await api.post("/categories/", categoryData);
        alert("Category added successfully!");
      }

      resetForm();
      loadCategories();
    } catch (error) {
      console.error("Category save error:", error);
      alert(error.response?.data?.detail || "Failed to save category.");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setName(category.name || "");
    setDescription(category.description || "");
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);
      alert("Category deleted successfully!");
      loadCategories();
    } catch (error) {
      console.error("Category delete error:", error);
      alert(error.response?.data?.detail || "Failed to delete category.");
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="admin-categories-page">
      <div className="admin-page-header">
        <div>
          <h1>Categories</h1>
          <p>Manage your food categories</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm ? "Close" : "+ Add Category"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            {editingCategory ? "Update Category" : "Add Category"}
          </button>
        </form>
      )}

      <div className="admin-toolbar">
        <input
          type="text"
          className="form-control"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : filteredCategories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="admin-categories-grid">
          {filteredCategories.map((category) => (
            <div className="admin-category-card" key={category.id}>
              <h3>{category.name}</h3>

              <p>{category.description || "No description"}</p>

              <div>
                <button
                  className="btn btn-light"
                  onClick={() => handleEdit(category)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminCategories;

