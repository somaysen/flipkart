import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCardEffect from "../effects/HomeCardEffect";
import { fetchProducts } from "../store/actons/productActions";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.products || { products: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen px-2 overflow-hidden flex flex-col items-center justify-start gap-5">
      {/* Top Banner Slider */}
      <HomeCardEffect />

      {/* Products Section */}
      {/* Products Section */}
      <div className="w-full flex flex-col gap-6 p-5 bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-lg mt-6">

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Featured Products
        </h2>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center w-full py-8">
            <div className="loader border-4 border-gray-300 border-t-blue-600 rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="w-full text-center py-4 text-red-500 font-semibold">
            {error}
          </p>
        )}

        {/* No Products */}
        {!loading && !error && products.length === 0 && (
          <p className="w-full text-center py-4 text-gray-500 dark:text-gray-300">
            😕 No products found!
          </p>
        )}

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-white dark:bg-zinc-700 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              
              {/* Product Image */}
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  src={product.images?.[0] || "https://via.placeholder.com/200"}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow">
                  New
                </span>
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {product.title}
                </h3>

                <p className="text-green-600 font-bold">
                  ₹ {product.price?.amount}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {product.description}
                </p>

                {/* Cart Button */}
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

export default Home;
