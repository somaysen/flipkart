const app = require("./src/app")
require('dotenv').config()
const connectDB = require('./src/db/db')
const cacheInstance = require("./src/services/cache.service")
const path = require("path");
const express = require("express")
const cors = require('cors')


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));

app.use(express.urlencoded({ extended: true }));

connectDB()

cacheInstance.on("connect", () => {
  console.log("Redis connected successfully");
});

cacheInstance.on("error", (error) => {
  console.log("Error connecting redis", error);
});


const PORT = process.env.PORT || 3000;

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (error) => {
    console.error('Error starting server:', error);
});