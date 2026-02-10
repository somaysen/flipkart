import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProductsById } from "../store/actions/sellerAction";
import SellerLogout from "./SellerLogout";

function SellerDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((s) => s.sellerProducts);
  const { seller } = useSelector((s) => s.seller || {});
  const [retryCount, setRetryCount] = React.useState(0);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      if (!seller?._id) return;
      
      try {
        await dispatch(fetchSellerProductsById(seller._id)).unwrap();
      } catch (err) {
        if (err?.message?.includes('unauthorized') || err?.message?.includes('expired')) {
          navigate('/seller/login');
        } else if (isMounted && retryCount < 3) {
          // Retry up to 3 times for other errors
          setTimeout(() => setRetryCount(prev => prev + 1), 1000);
        }
      }
    };

    // If no seller session, redirect to login
    if (!seller) {
      navigate('/seller/login');
      return;
    }

    fetchProducts();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [dispatch, seller, navigate, retryCount]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          {seller && (
            <div className="text-sm text-gray-600 mt-1">
              <span className="font-medium mr-2">{seller.name}</span>
              <span className="text-gray-400">·</span>
              <span className="ml-2">{seller.email}</span>
            </div>
          )}
        </div>

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
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
            <p className="text-red-600 flex items-center">
              <span className="mr-2">⚠️</span>
              {typeof error === 'string' ? error : error?.message || 'Failed to load products'}
            </p>
            {retryCount < 3 && (
              <p className="text-sm text-red-500 mt-1">Retrying... ({retryCount + 1}/3)</p>
            )}
          </div>
        )}
        {!loading && !error && products?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No products yet. Start by creating your first one!</p>
            <Link
              to="/seller/add-product"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <span className="mr-2">➕</span>
              Add Your First Product
            </Link>
          </div>
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
