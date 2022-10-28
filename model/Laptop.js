const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  trademark: { type: String, required: true },
  graphics: { type: String, required: true },
  cpu_fabricant: { type: String, required: true },
  processor: { type: String, required: true },
  storage: {
    type: String,
    required: true,
  },
  memory: {
    type: String,
    required: true,
  },
  memory_description: {
    type: String,
    required: true,
  },
  screen: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;
