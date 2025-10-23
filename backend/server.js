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


app.listen(3000,() =>{
    console.log("server is runing on 3000");
})