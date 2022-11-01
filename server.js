const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");
const productsRouting = require("./routing/products.routing");
const usersRouting = require("./routing/user.routing")
const app = express();

// Middleware
connectDB();
app.use(express.json());
app.use(cors());

// Routing
app.use("/products", productsRouting);
app.use("/users", usersRouting)

// Server
app.listen(4000);

console.log("Server on port 4000");
