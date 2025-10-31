import React, { useState } from "react";

function AddToCard() {
  // Example data (replace with props or Redux data)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      price: 1200,
      quantity: 1,
      image:
        "https://via.placeholder.com/100",
    },
    {
      id: 2,
      title: "Smart Watch",
      price: 2500,
      quantity: 2,
      image:
        "https://via.placeholder.com/100",
    },
  ]);

  // Increase quantity
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate totals
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty 😕
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">₹{item.price}</p>

                  {/* Quantity controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl p-6 shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span>₹{totalPrice > 0 ? 100 : 0}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹{totalPrice + (totalPrice > 0 ? 100 : 0)}</span>
            </div>

            <button
              className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddToCard;
