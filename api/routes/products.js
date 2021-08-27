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
    color: req.body.color,
    stock: req.body.stock,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    bsingle: req.body.bsingle,
    image_url: req.body.image
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
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(404).json({ message: "No valid Entry found" });
      } else {
        res.status(200).json(doc);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
  // if (id === "special") {
  //   res.status(200).json({
  //     message: "You discovered the special ID",
  //     id: id
  //   });
  // } else {
  //   res.status(200).json({
  //     message: "You passed an Id"
  //   });
  // }
});
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateProduct = {};
  for (const x of req.body) {
    updateProduct[x.propName] = x.value;
  }
  Product.update({ _id: id }, { $set: updateProduct })
    .exec()
    .then(resp => {
      console.log(resp);
      res.status(201).json(resp);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: err });
    });
});
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  // Product.deleteOne(id)
  //   .then(doc => {
  //     res.status(200).json(doc);
  //   })
  //   .catch(err => {
  //     res.status(500).json({ error: err });
  //   });
  Product.remove({ _id: id })
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
