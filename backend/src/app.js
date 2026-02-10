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
		origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
		credentials: true,
	})
);


app.use("/api/user", userRoutes);
app.use("/api/product", productRouters);
app.use("/api/seller",sellerRouters)

module.exports = app;