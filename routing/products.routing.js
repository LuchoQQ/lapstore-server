const express = require("express");
const router = express.Router();
const Laptop = require("../model/Laptop");

router.get("/", async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
        console.log(laptops)
    } catch (error) {
    console.log(error);
    }
});




router.post("/", async (req, res) => {
    const {name, image, price, trademark, cpu_fabricant, processor, storage, memory, memory_description, screen, quantity } = req.body;

    const laptop = new Laptop({ name, image, price, trademark, cpu_fabricant, processor, storage, memory, memory_description, screen, quantity });
    
    try {
        await laptop.save();
        res.json(laptop);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});

router.get("/:id", async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        res.json(laptop);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Laptop.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
