import express from "express";
import userRoutes from "../src/routes/user.route.js";
import cookieParser from "cookie-parser";
import productRouters from "./routes/product.route.js";
import cors from 'cors';
import sellerRouters from './routes/seller.route.js';
import addToCardRouters from "./routes/addToCard.route.js";


const app = express();
// ensure secure cookies / proxies behave correctly in production
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

// CORS Configuration for both development and production
// normalize URLs to avoid trailing slash mismatches in CORS checks
const normalizeUrl = (url) =>
	typeof url === "string" ? url.replace(/\/$/, "") : url;

// Accept a comma-separated ALLOWED_ORIGINS env for flexible deployment (Netlify, Vercel, etc.)
const envOrigins =
	(process.env.ALLOWED_ORIGINS || "")
		.split(",")
		.map((o) => normalizeUrl(o.trim()))
		.filter(Boolean);

const allowedOrigins = [
	normalizeUrl(process.env.FRONTEND_URL),
	normalizeUrl(process.env.BACKEND_URL),
	"https://mbshopingapp.netlify.app",
	"https://flipkart-zeta-one.vercel.app",
	"http://localhost:3000",
	"http://localhost:5173",
	"http://127.0.0.1:5173",
	"http://localhost:3001",
	"https://flipkart-n0vl.onrender.com",
	...envOrigins,
].filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			// allow requests with no origin (like mobile apps or curl)
			if (!origin) return callback(null, true);
			if (allowedOrigins.includes(origin)) return callback(null, true);
			// Allow in production if backend environment says so
			if (process.env.NODE_ENV === 'production') {
				return callback(null, true);
			}
			return callback(new Error(`CORS: Origin ${origin} not allowed`), false);
		},
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);


app.use("/api/user", userRoutes);
app.use("/api/product", productRouters);
app.use("/api/seller",sellerRouters);
app.use("/api/cart", addToCardRouters);

export default app;
