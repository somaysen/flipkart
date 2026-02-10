import express from "express";
import userRoutes from "../src/routes/user.route.js";
import cookieParser from "cookie-parser";
import productRouters from "./routes/product.route.js";
import cors from 'cors';
import sellerRouters from './routes/seller.route.js';
import addToCardRouters from "./routes/addToCard.route.js";


const app = express();
app.use(express.json());
app.use(cookieParser());
// allow credentials (cookies) from frontend dev server
const allowedOrigins = [
	process.env.FRONTEND_URL,
	"http://localhost:3000",
	"http://localhost:5173",
	"http://127.0.0.1:5173",
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			// allow requests with no origin (like mobile apps or curl)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) return callback(null, true);
			return callback(new Error("Not allowed by CORS"), false);
		},
		credentials: true,
	})
);


app.use("/api/user", userRoutes);
app.use("/api/product", productRouters);
app.use("/api/seller",sellerRouters);
app.use("/api/cart", addToCardRouters);

export default app;
