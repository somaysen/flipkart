import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateSellerProduct } from "../store/actons/productActions";

function UpdateProduct({ productData }) {
  // Example: productData can be passed from parent or fetched via useEffect
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "INR",
    images: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Load existing product details when the component mounts
  useEffect(() => {
    if (productData) {
      setFormData({
        title: productData.title || "",
        description: productData.description || "",
        amount: productData.amount || "",
        currency: productData.currency || "INR",
        images: productData.images || null,
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(updateSellerProduct({ id, data: formData })).unwrap();
      if (result?._id) {
        navigate("/seller/products");
      }
    } catch (err) {
      alert(err?.message || "Failed to update product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
              required
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-gray-700 mb-1">Currency</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 mb-1">Product Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleChange}
              className="w-full text-gray-700"
              accept="image/*"
            />

            {/* Show current image preview if available */}
            {productData?.images && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Current Images:</p>
                <div className="flex gap-2 flex-wrap">
                  {Array.isArray(productData.images) ? (
                    productData.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="product"
                        className="w-16 h-16 rounded-lg object-cover border"
                      />
                    ))
                  ) : (
                    <img
                      src={productData.images}
                      alt="product"
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
