
import { useState } from "react";

const foodItems = [
  // Burgers
  {
    id: 1,
    name: "Classic Burger",
    category: "Burgers",
    price: 850,
    description: "Juicy beef patty with fresh vegetables and special sauce.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burgers",
    price: 950,
    description: "Classic burger topped with melted cheddar cheese.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Chicken Burger",
    category: "Burgers",
    price: 900,
    description: "Crispy chicken fillet with lettuce and creamy sauce.",
    image:
      "https://ordere-v2.lon1.cdn.digitaloceanspaces.com/store/spicefusiongrill.com/assets/gallery_0.jpg?v=1756903300",
  },
  {
    id: 4,
    name: "Double Beef Burger",
    category: "Burgers",
    price: 1250,
    description: "Double beef patties with cheese and signature sauce.",
    image:
      "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=700&q=85",
  },

  // Pizza
  {
    id: 5,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 1100,
    description: "Classic pizza with tomato, mozzarella and fresh basil.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Cheese Pizza",
    category: "Pizza",
    price: 1200,
    description: "Extra cheesy pizza baked until perfectly golden.",
    image:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    name: "Chicken Pizza",
    category: "Pizza",
    price: 1350,
    description: "Loaded with tender chicken, vegetables and cheese.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 8,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 1450,
    description: "Crispy pepperoni with rich tomato sauce and mozzarella.",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=85",
  },

  // Noodles
  {
    id: 9,
    name: "Chicken Noodles",
    category: "Noodles",
    price: 950,
    description: "Stir-fried noodles with chicken and fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 10,
    name: "Spicy Noodles",
    category: "Noodles",
    price: 900,
    description: "Hot and spicy noodles with vegetables and special seasoning.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 11,
    name: "Vegetable Noodles",
    category: "Noodles",
    price: 800,
    description: "Healthy noodles packed with colourful fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=700&q=85",
  },

  // Fried Chicken
  {
    id: 12,
    name: "Crispy Chicken",
    category: "Fried Chicken",
    price: 1100,
    description: "Golden crispy chicken with our special seasoning.",
    image:
      "https://www.chowhound.com/img/gallery/the-sweet-ingredient-you-should-try-for-flavorful-fried-chicken/intro-1728589702.jpg",
  },
  {
    id: 13,
    name: "Spicy Chicken",
    category: "Fried Chicken",
    price: 1150,
    description: "Crunchy fried chicken with a delicious spicy coating.",
    image:
      "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 14,
    name: "Chicken Wings",
    category: "Fried Chicken",
    price: 950,
    description: "Crispy chicken wings served with a tasty dipping sauce.",
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=85",
  },

  // Pasta
  {
    id: 15,
    name: "Chicken Pasta",
    category: "Pasta",
    price: 1100,
    description: "Creamy pasta with tender chicken and herbs.",
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 16,
    name: "Creamy Alfredo",
    category: "Pasta",
    price: 1250,
    description: "Rich and creamy Alfredo pasta with parmesan cheese.",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 17,
    name: "Spicy Pasta",
    category: "Pasta",
    price: 1050,
    description: "Delicious pasta tossed in a rich and spicy sauce.",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=700&q=85",
  },

  // Sandwiches
  {
    id: 18,
    name: "Club Sandwich",
    category: "Sandwiches",
    price: 950,
    description: "Triple-layer sandwich with chicken, egg and fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 19,
    name: "Chicken Sandwich",
    category: "Sandwiches",
    price: 850,
    description: "Tender chicken with lettuce, tomato and creamy dressing.",
    image:
      "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 20,
    name: "Cheese Sandwich",
    category: "Sandwiches",
    price: 750,
    description: "Toasted sandwich filled with melted cheese and vegetables.",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=85",
  },

  // Drinks
  {
    id: 21,
    name: "Fresh Orange Juice",
    category: "Drinks",
    price: 450,
    description: "Freshly squeezed orange juice served chilled.",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 22,
    name: "Mango Juice",
    category: "Drinks",
    price: 500,
    description: "Sweet and refreshing mango juice made from ripe mangoes.",
    image:
      "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 23,
    name: "Watermelon Juice",
    category: "Drinks",
    price: 450,
    description: "Cool and refreshing watermelon juice.",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 24,
    name: "Strawberry Milkshake",
    category: "Drinks",
    price: 650,
    description: "Creamy strawberry milkshake topped with whipped cream.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=85",
  },

  // Desserts
  {
    id: 25,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 650,
    description: "Rich and moist chocolate cake with creamy frosting.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 26,
    name: "Cheesecake",
    category: "Desserts",
    price: 700,
    description: "Smooth and creamy cheesecake with a buttery crust.",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 27,
    name: "Brownie",
    category: "Desserts",
    price: 500,
    description: "Soft chocolate brownie with a rich chocolate flavour.",
    image:
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 28,
    name: "Chocolate Lava Cake",
    category: "Desserts",
    price: 750,
    description: "Warm chocolate cake with a delicious molten centre.",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=85",
  },
];

const categories = [
  "All",
  "Burgers",
  "Pizza",
  "Noodles",
  "Fried Chicken",
  "Pasta",
  "Sandwiches",
  "Drinks",
  "Desserts",
];

function Foods() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFoods = foodItems.filter((food) => {
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;

    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Add food to local cart
  const handleAddToCart = (food) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find(
      (item) => item.id === food.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === food.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...food,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert(`${food.name} added to cart!`);
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

          <div className="food-search">
            <input
              type="text"
              placeholder="Search your favourite food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="button">
              🔍 Search
            </button>
          </div>

          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  selectedCategory === category
                    ? "category-filter active"
                    : "category-filter"
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="foods-result-header">
            <div>
              <h2>
                {selectedCategory === "All"
                  ? "All Foods"
                  : selectedCategory}
              </h2>

              <p>
                {filteredFoods.length} delicious items available
              </p>
            </div>
          </div>

          {filteredFoods.length === 0 ? (
            <div className="empty-box">
              <span>🍽️</span>

              <h2>No foods found</h2>

              <p>
                Try another food name or category.
              </p>
            </div>
          ) : (
            <div className="food-grid">

              {filteredFoods.map((food) => (
                <div
                  className="food-card"
                  key={food.id}
                >

                  <div className="food-image-wrapper">

                    <img
                      src={food.image}
                      alt={food.name}
                      className="food-image"
                    />

                    <span className="food-status available">
                      Available
                    </span>

                  </div>

                  <div className="food-content">

                    <span className="food-category">
                      {food.category}
                    </span>

                    <h3>{food.name}</h3>

                    <p className="food-description">
                      {food.description}
                    </p>

                    <div className="food-bottom">

                      <strong>
                        Rs.{" "}
                        {food.price.toLocaleString()}
                      </strong>

                      <button
                        className="add-cart-btn"
                        onClick={() =>
                          handleAddToCart(food)
                        }
                      >
                        + Add
                      </button>

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

