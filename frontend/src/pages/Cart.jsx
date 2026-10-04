
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;

          return {
            ...item,
            quantity: newQuantity,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="cart-page">

      <section className="cart-header">
        <div className="container">
          <span className="small-title">YOUR CART</span>

          <h1>Shopping Cart 🛒</h1>

          <p>
            Review your favourite food before placing your order.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {cartItems.length === 0 ? (
            <div className="empty-box">

              <span>🛒</span>

              <h2>Your cart is empty</h2>

              <p>
                Looks like you haven't added any delicious food yet.
              </p>

              <Link to="/foods" className="btn btn-primary">
                Browse Menu →
              </Link>

            </div>
          ) : (

            <div className="cart-layout">

              <div className="cart-items">

                {cartItems.map((item) => (
                  <div className="cart-item" key={item.id}>

                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-info">

                      <h3>{item.name}</h3>

                      <p>
                        Rs. {item.price.toLocaleString()}
                      </p>

                      <div className="quantity-control">

                        <button
                          onClick={() =>
                            updateQuantity(item.id, -1)
                          }
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, 1)
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <div className="cart-item-right">

                      <strong>
                        Rs.{" "}
                        {(item.price * item.quantity).toLocaleString()}
                      </strong>

                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ))}

                <Link
                  to="/foods"
                  className="continue-shopping"
                >
                  ← Continue Shopping
                </Link>

              </div>

              <div className="order-summary">

                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal</span>

                  <strong>
                    Rs. {subtotal.toLocaleString()}
                  </strong>
                </div>

                <div className="summary-row">
                  <span>Delivery Fee</span>

                  <strong>
                    Rs. {deliveryFee.toLocaleString()}
                  </strong>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">

                  <span>Total</span>

                  <strong>
                    Rs. {total.toLocaleString()}
                  </strong>

                </div>

                <Link
                  to="/checkout"
                  className="checkout-btn"
                >
                  Proceed to Checkout →
                </Link>

                <p className="secure-note">
                  🔒 Secure & reliable checkout
                </p>

              </div>

            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Cart;

