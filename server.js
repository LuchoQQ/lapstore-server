const express = require("express");
const connectDB = require("./db");
const productsRouting = require("./routing/products.routing");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Middleware
connectDB();
app.use(express.json());

// Routing
app.use("/products", productsRouting);

// Server
app.listen(4000);

console.log("Server on port 4000");
