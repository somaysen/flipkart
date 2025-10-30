import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSeller } from "../store/reducers/sellerSlice";
import { fetchSellerProducts } from "../store/actons/productActions";
import SellerLogout from "./SellerLogout";

function SellerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((s) => s.sellerProducts);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <SellerLogout />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <Link
          to="/seller/add-product"
          className="bg-blue-600 text-white p-6 rounded-lg text-center shadow hover:bg-blue-700"
        >
          ➕ Add Product
        </Link>

        <Link
          to="/seller/products"
          className="bg-green-600 text-white p-6 rounded-lg text-center shadow hover:bg-green-700"
        >
          📦 View My Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">My Products</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{String(error)}</p>}
        {!loading && products?.length === 0 && (
          <p>No products yet. Create your first one!</p>
        )}
        <ul className="divide-y">
          {products?.map((p) => (
            <li key={p._id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {p.images?.[0] && (
                  <img src={p.images[0]} alt={p.title} className="w-12 h-12 rounded object-cover border" />
                )}
                <div>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-600">₹{p.price?.amount} {p.price?.currency}</div>
                </div>
              </div>
              <button
                onClick={() => navigate(`/seller/products/${p._id}/edit`)}
                className="px-3 py-1 text-sm bg-indigo-600 text-white rounded"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SellerDashboard;
