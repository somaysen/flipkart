const express = require("express")
const userRoutes = require("../src/routes/user.route")
const cookieParser = require("cookie-parser")
const prodectRouters = require("./routes/prodect.route")
const cors = require('cors')


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
app.use("/api/product", prodectRouters);

module.exports = app;