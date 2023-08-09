const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//TODO://Fetch or get the all the data from database
router.get("/", getProducts);

//TODO://Fetch a single data from database
//Using dynamic endpoint
router.get("/:id", getProduct);

//TODO://Save data to the database when the person attempt to hit the route
router.post("/", createProduct);

//TODO:Update a product

router.put("/:id", updateProduct);

//TODO:Delete a product listing

router.delete("/:id", deleteProduct);

//TODO: Export the module of product

module.exports = router;
