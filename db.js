const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  const connec = mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
