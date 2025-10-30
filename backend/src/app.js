const express = require("express")
const userRoutes = require("../src/routes/user.route")
const cookieParser = require("cookie-parser")
const productRouters = require("./routes/product.route")
const cors = require('cors')
const sellerRouters = require('./routes/seller.route')


const app = express();
app.use(express.json());
app.use(cookieParser());
// allow credentials (cookies) from frontend dev server
app.use(
	cors({
		origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
		credentials: true,
	})
);


app.use("/api/user", userRoutes);
app.use("/api/product", productRouters);
app.use("/api/seller",sellerRouters)

module.exports = app;