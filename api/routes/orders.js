const express = require("express");
const router = express.Router();
const mongose = require("mongoose");
const Order = require("../models/orders");
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Order GET request "
  });
});

router.post("/", (req, res, next) => {
  const order = {
    _id: new mongose.Types.ObjectId(),
    color: req.body.color,
    stock: req.body.stock,
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    bsingle: req.body.bsingle,
    image_url: req.body.image
  };
  res.status(201).json({
    message: "Order POST request",
    order: order
  });
});
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then(res => {
      console.log(res);
      res.status(200).json(res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Order update Request on ${id}`
  });
});
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: `Order delete Request on ${id}`
  });
});

module.exports = router;
