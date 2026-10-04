
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Checkout() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      items: cartItems
        .map((item) => `${item.name} × ${item.quantity}`)
        .join(", "),
      total: total,
      status: "Pending",
    };

    const updatedOrders = [newOrder, ...existingOrders];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    localStorage.removeItem("cart");

    alert("Order placed successfully! 🎉");

    window.location.href = "/orders";
  };

  return (
    <main className="checkout-page">

      <section className="checkout-header">
        <div className="container">
          <span className="small-title">CHECKOUT</span>
          <h1>Complete Your Order 🧾</h1>
          <p>Enter your details and place your order.</p>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-layout">

          {/* Customer Details */}
          <div className="checkout-form">

            <div className="checkout-card">
              <h2>👤 Customer Details</h2>

              <div className="form-row">

                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                </div>

              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  className="form-control checkout-textarea"
                  placeholder="Enter your delivery address"
                  rows="4"
                ></textarea>
              </div>

            </div>

            {/* Payment */}
            <div className="checkout-card">
              <h2>💳 Payment Method</h2>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />

                <div>
                  <strong>Cash on Delivery</strong>
                  <span>Pay when your order arrives.</span>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                />

                <div>
                  <strong>Card Payment</strong>
                  <span>Pay securely using your card.</span>
                </div>
              </label>

            </div>

          </div>

          {/* Order Summary */}
          <div className="checkout-summary">

            <div className="checkout-card">
              <h2>🛒 Order Summary</h2>

              {cartItems.length === 0 ? (
                <div className="empty-box">
                  <span>🛒</span>

                  <h3>Your cart is empty</h3>

                  <p>
                    Add some food before checkout.
                  </p>

                  <Link
                    to="/foods"
                    className="btn btn-primary"
                  >
                    Browse Menu →
                  </Link>
                </div>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <div
                      className="checkout-product"
                      key={item.id}
                    >
                      <div>
                        <strong>
                          {item.name} × {item.quantity}
                        </strong>

                        <span>
                          Rs.{" "}
                          {item.price.toLocaleString()} each
                        </span>
                      </div>

                      <strong>
                        Rs.{" "}
                        {(
                          item.price * item.quantity
                        ).toLocaleString()}
                      </strong>
                    </div>
                  ))}

                  <div className="summary-divider"></div>

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

                  <button
                    className="place-order-btn"
                    onClick={handlePlaceOrder}
                  >
                    Place Order →
                  </button>

                  <Link
                    to="/cart"
                    className="back-cart"
                  >
                    ← Back to Cart
                  </Link>
                </>
              )}

            </div>

            <div className="checkout-safe">
              🔒 <strong>Safe & Secure</strong>

              <p>
                Your order information is securely handled.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Checkout;

