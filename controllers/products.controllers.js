const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const Laptop = require("../model/Laptop");
const { uploadFile, deleteFile, downloadFile } = require("../s3");

// function to get image by key from s3
    const getImageFromS3 = async (req, res) => {
        /* const key = req.params.key;
        const readStream = await downloadFile(key);
        readStream.pipe(res); */
        const key = req.params.key;
        const readStream = await downloadFile(key)
        //readStream.pipe(res);
    };
    
    





/* const getImageFromS3 = async (req, res) => {
    try {
        const key = req.params.key;
        const readStream = downloadFile(key);
        readStream.pipe(res);
    } catch (error) {
        console.log(error);
    }
};
 */
const createProduct = async (req, res) => {
    // upload image to s3 and get the url of the image and save it to the database
    const file = req.file;
    if (!file) return res.status(400).json({ message: "Please upload a file" });

    // create product
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

const getProductById = async (req, res) => {
    try {
        const laptop = await Laptop.findById(req.params.id);
        res.json(laptop);
    } catch (error) {
        console.log(error);
    }
};

const deleteProductById = async (req, res) => {
    try {
        await Laptop.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.log(error);
    }
};

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
