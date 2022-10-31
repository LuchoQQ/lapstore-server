const fs = require("fs");
const util = require("util");
const AWS = require("aws-sdk");

const unlinkFile = util.promisify(fs.unlink);

const Laptop = require("../model/Laptop");
const { uploadFile, deleteFile, downloadFile, listFiles } = require("../s3");


// get image if it exists in s3 and download
const getImageFromS3 = async (req, res) => {
    const key = req.params.key;
    try {
        const file = await downloadFile(key);
        const readStream = file.createReadStream();
        readStream.pipe(res);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};


// create product and upload image to s3
const createProduct = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Please upload a file" });

    const imageUploaded = await uploadFile(file);
    try {
        const laptop = await new Laptop({
            name: req.body.name,
            image: imageUploaded.Key,
            price: req.body.price,
            graphics: req.body.graphics,
            trademark: req.body.trademark,
            cpu_fabricant: req.body.cpu_fabricant,
            processor: req.body.processor,
            storage: req.body.storage,
            memory: req.body.memory,
            memory_description: req.body.memory_description,
            screen: req.body.screen,
            quantity: req.body.quantity,
        }).save();

        // if product is created response 200 else response 400 and unlink the file from s3
        await unlinkFile(`./uploads/${imageUploaded.Key}`);
        return res.status(200).json({ message: "Product created" });
    } catch (error) {
        deleteFile(imageUploaded.Key);
        await unlinkFile(`./uploads/${imageUploaded.Key}`);
        console.log(error);
        return res.status(505).json({ message: error.message });
    }
};


// get product by id from MongoDB
const getProductById = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        res.json(laptop);
    } catch (error) {
        console.log(error);
    }
};

// delete product for MongoDB and s3
const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const laptop = await Laptop.findById(id);
        await deleteFile(laptop.image);
        await Laptop.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Product deleted" });
    } catch (error) {
        console.log(error);
    }
};

// get all products from MongoDB
const getAllProducts = async (req, res) => {
    try {
        const laptops = await Laptop.find();
        res.json(laptops);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createProduct,
    getImageFromS3,
    getProductById,
    deleteProductById,
    getAllProducts,
};
