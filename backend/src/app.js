import express from "express";
import userRoutes from "../src/routes/user.route.js";
import cookieParser from "cookie-parser";
import productRouters from "./routes/product.route.js";
import cors from 'cors';
import sellerRouters from './routes/seller.route.js';


const app = express();
app.use(express.json());
app.use(cookieParser());
// allow credentials (cookies) from frontend dev server
app.use(
	cors({
		origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
		credentials: true,
	})
);


app.use("/api/user", userRoutes);
app.use("/api/product", productRouters);
app.use("/api/seller",sellerRouters);

export default app;