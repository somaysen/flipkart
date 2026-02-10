import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  deleteCartItem,
} from "../store/actions/cartActions";

function AddToCard() {
  const dispatch = useDispatch();
  const { items: cartItems, loading, error } = useSelector((s) => s.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (item) => {
    dispatch(updateCartItem({ id: item._id, quantity: item.quantity + 1 }));
  };

  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      dispatch(deleteCartItem(item._id));
      return;
    }
    dispatch(updateCartItem({ id: item._id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(deleteCartItem(item._id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">?? Your Cart</h1>
        {loading && <span className="text-sm text-gray-500">Updating�</span>}
      </div>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-700 px-4 py-3 border border-red-200">
          {error}
        </div>
      )}

      {cartItems.length === 0 && !loading ? (
        <div className="text-center text-gray-600 text-lg">
          Your cart is empty ??
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center bg-white p-4 rounded-xl shadow-sm"
              >
                <img
                  src={item?.product?.images?.[0] || "https://via.placeholder.com/100"}
                  alt={item?.product?.title || "Product image"}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">
                    {item?.product?.title || "Product"}
                  </h2>
                  <p className="text-gray-500">
                    {item?.price?.currency || "?"}
                    {item?.price?.amount ?? item?.product?.price?.amount ?? 0}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="px-3 py-1 bg-gray-200 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">
                    ?{item.total ?? (item.quantity * (item.price?.amount || 0))}
                  </p>
                  <button
                    onClick={() => handleRemove(item)}
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
              <span>?{totalPrice}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Shipping</span>
              <span>?{totalPrice > 0 ? 100 : 0}</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>?{totalPrice + (totalPrice > 0 ? 100 : 0)}</span>
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
