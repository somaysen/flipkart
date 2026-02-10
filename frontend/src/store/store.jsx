import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import sellerReducer from "./reducers/sellerSlice"
import sellerProductsReducer from "../store/reducers/sellerProductsSlice"
import productDetailsReducer from "../store/reducers/productDetailsSlice"
import cartReducer from "./reducers/cartSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        seller: sellerReducer,
        sellerProducts: sellerProductsReducer, // ✅ added new slice
        productDetails: productDetailsReducer,
        cart: cartReducer,

    }
});

export default store;
