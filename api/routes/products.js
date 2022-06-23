const mongose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
        message: "Error occurs"
      });
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
    .then(doc => {
      console.log(doc);
      res.status(201).json({
        message: "Handling GET request to /products",
        product: product
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("123456", doc);
      res.status(200).json(doc);
      // if (doc) {
      //   res.status(404).json({ message: "No valid Entry found" });
      // } else {
      //   res.status(200).json(doc);
      // }
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
  const updateProduct = {
    _id: id,
    color: req.body.color,
    stock: req.body.stock,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    bsingle: req.body.bsingle,
    image_url: req.body.image
  };
  // for (const ops of req.body) {
  //   console.log("ops ", ops.propName);
  //   updateProduct[ops.propName] = ops.value;
  // }
  Product.update({ _id: id }, { $set: updateProduct })
    .exec()
    .then(resp => {
      console.log(resp);
      res.status(200).json(resp);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
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