import dotenv from 'dotenv';
import app from "./src/app.js";
import connectDB from './src/db/db.js';
import cacheInstance from "./src/services/cache.service.js";
import path from "path";
import express from "express";
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    console.log(`Server is running on port http://localhost:${PORT}`);
}).on('error', (error) => {
    console.error('Error starting server:', error);
});

export default app;