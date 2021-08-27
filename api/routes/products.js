const mongose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST request to /products"
  });
});
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  res.status(201).json({
    message: "Handling GET request to /products",
    product: product
  });
});
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      id: id
    });
  } else {
    res.status(200).json({
      message: "You passed an Id"
    });
  }
});
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "Updating /products"
  });
});
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message: "Deleting /products"
  });
});
module.exports = router;
