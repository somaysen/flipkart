import React, { useEffect, useState } from "react";

function UserUpdate() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [cartProducts, setCartProducts] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);

  // 🧩 Fetch user info + cart + orders
  useEffect(() => {
    // Example: Replace with your real API endpoints
    const fetchData = async () => {
      try {
        const userRes = await fetch("/api/user/profile");
        const cartRes = await fetch("/api/user/cart");
        const orderRes = await fetch("/api/user/orders");

        const userData = await userRes.json();
        const cartData = await cartRes.json();
        const orderData = await orderRes.json();

        setUser(userData);
        setCartProducts(cartData);
        setOrderProducts(orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 🧩 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 🧩 Handle form submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      alert(data.message || "User updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Update Profile</h1>

      {/* User Info Form */}
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-md rounded-2xl p-6 mb-10 max-w-lg"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={user.mobile}
            onChange={handleChange}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your mobile number"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update Profile
        </button>
      </form>

      {/* Cart Products */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🛒 Cart Products</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {cartProducts.length > 0 ? (
            cartProducts.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow-md border"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-32 w-full object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>

      {/* Orders */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">📦 Order History</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {orderProducts.length > 0 ? (
            orderProducts.map((order) => (
              <div
                key={order._id}
                className="bg-white p-4 rounded-xl shadow-md border"
              >
                <img
                  src={order.image}
                  alt={order.title}
                  className="h-32 w-full object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold text-lg">{order.title}</h3>
                <p className="text-gray-600">₹{order.price}</p>
                <p className="text-green-600 font-medium">
                  Status: {order.status}
                </p>
              </div>
            ))
          ) : (
            <p>No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserUpdate;
