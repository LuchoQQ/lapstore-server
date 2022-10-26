const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
    createProduct,
    getImageFromS3,
    getProductById,
    deleteProductById,
    getAllProducts,
} = require("../controllers/products.controllers");
const upload = multer({ dest: "uploads/" });

router.get("/", getAllProducts);

// get image from s3
router.get("/image/:key", getImageFromS3);

// create product
router.post("/", upload.single("image"), createProduct);

// get product document by id
router.get("/:id", getProductById);

// delete product document by id
router.delete("/:id", deleteProductById);

module.exports = router;
