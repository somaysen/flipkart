import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import productReducer from "./reducers/productSlice";
import sellerReducer from "./reducers/sellerSlice"
import sellerProductsReducer from "../store/reducers/sellerProductsSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        seller: sellerReducer,
        sellerProducts: sellerProductsReducer, // ✅ added new slice

    }
});

export default store;