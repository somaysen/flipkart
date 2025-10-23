import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice"; // Make sure to import your actual reducer

const store = configureStore({
    reducer: {
        user: userReducer, // Use the imported reducer
    }
});

export default store;